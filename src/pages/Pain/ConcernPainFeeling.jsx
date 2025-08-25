import React from "react"; 
import ConcernImg1 from "../../assets/images/pain-img.png";
import { Link } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import BackArrow from "../../assets/images/back-arrow.svg";
import Emo1 from "../../assets/images/emo-01.svg";
import DecisionCardFeeling from "./DecisionCardFeeling";

function ConcernPainFeeling() {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
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
              <img src={Emo1} className="w-full" />
            </div>
          </div>
          <div>
            <DecisionCardFeeling />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ConcernPainFeeling;
