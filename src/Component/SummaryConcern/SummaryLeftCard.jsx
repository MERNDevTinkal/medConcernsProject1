import React from "react";
import ConcernImg1 from "../../assets/images/concern-img-01.png";
import { Link } from "react-router-dom";

const SummaryCards = () => {
  return (
    <>
      <div className="dashboard-cards rounded-2xl bg-white text-center py-4 px-3 shadow-sm cursor-pointer">
        <div className="dashboard-img ">
          <img src={ConcernImg1} className="w-full" />
        </div>
        <Link to="" className="text-[21px] font-normal color-black">
          Pain
        </Link>
      </div>
    </>
  );
};

export default SummaryCards;
