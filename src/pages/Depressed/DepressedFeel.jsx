import React from "react";
import Footer from "../../Component/Layout/Footer/Footer";
import DecisionCard from "../../Component/ProblemCard/DecisionCard";
import {DepressedImg,BackArrow} from "../../Component/DiseasesData/images";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

const DepressedFeel = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
        <button>
          <img src={BackArrow} />
        </button>
        <h2 className="text-[25px] font-normal text-black text-center">
          Do you feel afraid?
        </h2>
        <button></button>
      </div>
      <div className="main-wrapper home-wrapper ">
        <div className="md:px-10 my-5 sm:px-5 px-5">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:gap-20 gap-5 items-center">
            <div className="w-full p-4 bg-white shadow-lg rounded-[20px]">
              <img src={DepressedImg} className="w-full h-auto" />
            </div>
            <div>
              <DecisionCard />
            </div>
          </div>
          <div className="mt-3">
            <Link className="text-[16px] font-medium text-black flex gap-1.5 justify-end">
              <span>Skip Screening Questions</span> <MoveRight />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DepressedFeel;
