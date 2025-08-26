import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Checked from "../../assets/images/checked.svg";
import Close from "../../assets/images/close.svg";
import { GlobalContext } from "../../context/DiseaseContext";
const DecisionSwallowing = () => {
  const navigate = useNavigate();
  const { updateDisease } = useContext(GlobalContext);
  const handleDecisionSwallowing = (value, path) => {
    if (value && path) {
      updateDisease("DecisionSwallowing", value)
      navigate(path)
    }
  }
  return (
    <>
      <div className="w-full overflow-hidden decision-cards">

        <Link to="/swallowing-problem" onClick={() => { handleDecisionSwallowing('YES', "/swallowing-problem") }}>
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[32px] font-medium text-green-600">YES</p>
            </div>
            <div>
              <img src={Checked} alt="" />
            </div>
          </div>
        </Link>

        <Link to="/" nClick={() => { handleDecisionSwallowing('NO', "/") }}>
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

export default DecisionSwallowing;
