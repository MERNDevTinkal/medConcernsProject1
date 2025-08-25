import React from "react";
import SummaryImg1 from "../../assets/images/summary-img-01.png";
import SummaryImg2 from "../../assets/images/summary-img-02.png";
import SummaryImg3 from "../../assets/images/summary-img-03.png";
import SummaryImg4 from "../../assets/images/summary-img-04.png";
import SummaryImg5 from "../../assets/images/summary-img-05.png";
import SummaryImg6 from "../../assets/images/summary-img-06.png";

import { Link } from "react-router-dom";

const SummaryRightCard = () => {
  return (
    <>
      <Link>
        <div className="dashboard-cards rounded-2xl bg-white text-center px-5 py-4 h-full border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img flex justify-center items-center">
            <img src={SummaryImg1} />
          </div>
          <p className="text-[14px] mt-3 color-black">Chest Pain</p>
        </div>
      </Link>
      <Link>
        <div className="dashboard-cards rounded-2xl bg-white text-center px-5 py-4 h-full border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img flex justify-center items-center">
            <img src={SummaryImg2} />
          </div>
          <p className="text-[14px] mt-3 color-black">Chest</p>
        </div>
      </Link>
      <Link>
        <div className="dashboard-cards rounded-2xl bg-white text-center px-5 py-4 h-full border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img flex justify-center items-center">
            <img src={SummaryImg3} />
          </div>
          <p className="text-[14px] mt-3 color-black">Squeezing</p>
        </div>
      </Link>
      <Link>
        <div className="dashboard-cards rounded-2xl bg-white text-center px-5 py-4 h-full border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img flex justify-center items-center">
            <img src={SummaryImg4} />
          </div>
          <p className="text-[14px] mt-3 color-black">Worst Pain Imaginable</p>
        </div>
      </Link>
      <Link>
        <div className="dashboard-cards rounded-2xl bg-white text-center px-5 py-4 h-full border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img flex justify-center items-center">
            <img src={SummaryImg5} />
          </div>
          <p className="text-[14px] mt-3 color-black">All Day</p>
        </div>
      </Link>
      <Link>
        <div className="dashboard-cards rounded-2xl bg-white text-center px-5 py-4 h-full border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img flex justify-center items-center">
            <img src={SummaryImg6} />
          </div>
          <p className="text-[14px] mt-3 color-black">New Problem</p>
        </div>
      </Link>
    </>
  );
};

export default SummaryRightCard;
