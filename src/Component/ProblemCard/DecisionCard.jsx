import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Checked from "../../assets/images/checked.svg";
import Close from "../../assets/images/close.svg";
import Question from "../../assets/images/question.svg";
import WomenIcon from "../../assets/images/women.png";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech"
const DecisionCard = ({ partName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { updateDisease, diseases } = useContext(GlobalContext);
  const handleDecision = async (value, mainpath) => {
    if (value && mainpath) {
      await getTextToSpeech(value)
      updateDisease(path.replace("/", ""), value)
      navigate(mainpath)
    }
  }
  return (
    <>
      <div className="w-full overflow-hidden decision-cards">
        <div onClick={() => { handleDecision("Yes", path === "/new-problem" ? "/summary-list" : "/pain-feel") }}>
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[32px] font-medium text-green-600">YES</p>
            </div>
            <div>
              <img src={Checked} alt="" />
            </div>
          </div>
        </div>

        <div onClick={() => { handleDecision("No", navigate(-1),) }}>
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[32px] font-medium text-red-600">NO</p>
            </div>
            <div>
              <img src={Close} />
            </div>
          </div>
        </div>
        {/* {!["/concern-pain", "/face-pain"].includes(location.pathname) && ( */}
        {(!partName) && (
          <div onClick={() => { handleDecision("Don't Know", "/summary-list",) }} className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <img src={WomenIcon} alt="" className="w-15 h-15" />
            </div>
            <div>
              <img src={Question} />
            </div>
          </div>
        )}
        {/* )} */}
      </div>
    </>
  );
};

export default DecisionCard;
