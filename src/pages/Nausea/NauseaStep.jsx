import React from "react";
import DecisionCard from "../../Component/ProblemCard/DecisionCard";
import Header from "../../Component/Layout/Header/Header";
import ConcernImg4 from "../../assets/images/concern-img-04.png";
import { Link } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import BackArrow from "../../assets/images/back-arrow.svg";
import Checked from "../../assets/images/checked.svg";
import Close from "../../assets/images/close.svg";
import dashimg01 from "../../assets/images/All-Day.png";

function NauseaStep() {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 top-0 bg-white innr-header">
        <Link to="/">
          <img src={BackArrow} />
        </Link>
        <h2 className="text-[25px] font-normal text-black text-center">Pain</h2>
        <button></button>
      </div>
      <div className="main-wrapper home-wrapper ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:px-10 sm:px-5 px-5 md:gap-20 gap-5 my-5 items-center">
          <div className="dashboard-cards rounded-2xl bg-white text-center shadow-sm p-3">
            <div className="dashboard-img rounded-2xl">
              <img src={ConcernImg4} className="w-full" />
            </div>
          </div>
          <div>
             <div className="w-full overflow-hidden decision-cards">
                    
                    <Link to="/nausea-problem">
                      <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
                        <div className="flex items-center">
                          <p className="text-[32px] font-medium text-green-600">YES</p>
                        </div>
                        <div>
                          <img src={Checked} alt="" />
                        </div>
                      </div>
                    </Link>
            
                    <Link to="/">
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default NauseaStep;
