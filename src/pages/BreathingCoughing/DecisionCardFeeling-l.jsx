import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Checked from "../../assets/images/checked.svg";
import Close from "../../assets/images/close.svg";
import { GlobalContext } from "../../context/DiseaseContext";
import { useParams } from "react-router-dom";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech"
const DecisionCardFeeling = ({ concenFell }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pathUrl, setPathUrl] = useState("")
  const { updateDisease, diseases } = useContext(GlobalContext);
  const handleBreathingYesNo = async (value, path) => {
    if (value && path) {
      await getTextToSpeech(value)
      updateDisease("concenyesno", value)
      navigate(path)
    }
  }
  useEffect(() => {
    if (!name) return;
    const [firstPart] = name.split("-");
    const newPath = `/${firstPart}-problem`;
    if (newPath === "/emotions-problem" && concenFell === "/feel") {
     return setPathUrl(concenFell);
    }

    setPathUrl(newPath);
  }, [name, concenFell]);
  return (
    <>
      <div className="w-full overflow-hidden decision-cards">
        <div onClick={() => { handleBreathingYesNo("YES", pathUrl) }}>
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[32px] font-medium text-green-600">YES</p>
            </div>
            <div>
              <img src={Checked} alt="" />
            </div>
          </div>
        </div>

        <Link to="/" onClick={() => { handleBreathingYesNo("NO", "/") }}>
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[32px] font-medium text-red-600">NO</p>
            </div>
            <div>
              <img src={Close} />
            </div>
          </div>
        </Link>

      </div>
    </>
  );
};

export default DecisionCardFeeling;
