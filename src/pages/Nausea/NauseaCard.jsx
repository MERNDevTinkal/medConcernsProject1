import React from "react";
import ConcernImg1 from "../../assets/images/concern-img-01.png";
import ConcernImg2 from "../../assets/images/concern-img-02.png";
import ConcernImg3 from "../../assets/images/concern-img-03.png";
import ConcernImg4 from "../../assets/images/concern-img-04.png";
import ConcernImg5 from "../../assets/images/concern-img-05.png";
import ConcernImg6 from "../../assets/images/concern-img-06.png";
import ConcernImg7 from "../../assets/images/concern-img-07.png";
import ConcernImg8 from "../../assets/images/concern-img-08.png";
import { Link } from "react-router-dom";

const NauseaCard = () => {
  return (
    <>
      <Link to="/pain-front">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg1} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 text-black">Pain</p>
        </div>
      </Link>
      <Link to="/breathing-yes-no">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg2} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">
            Vomiting
          </p>
        </div>
      </Link>
      <Link to="/swallowing-yes-no">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg3} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Constipation</p>
          
        </div>
      </Link>
      <Link to="/nausea-step-yesno">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg4} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Diarrhea</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg5} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Cramping</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg6} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Just Nausea</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg7} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Something Else</p>
        </div>
      </Link> 
    </>
  );
};

export default NauseaCard;
