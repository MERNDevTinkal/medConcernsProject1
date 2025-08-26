import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Checked from "../../assets/images/checked.svg";
import Close from "../../assets/images/close.svg";
import { GlobalContext } from "../../context/DiseaseContext";

const DecisionCardFeeling = () => {
  const navigate = useNavigate();
 
  const { updateDisease, diseases } = useContext(GlobalContext);
  const handleBreathingYesNo = (value, path) => {
    if (value && path) {
      updateDisease("concenyesno", value)
      navigate(path)
    }
  }



  return (
    <>
      <div className="w-full overflow-hidden decision-cards">
        <Link to="/breathing-problem" onClick={() => { handleBreathingYesNo("YES", "/breathing-problem") }}>
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[32px] font-medium text-green-600">YES</p>
            </div>
            <div>
              <img src={Checked} alt="" />
            </div>
          </div>
        </Link>

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
