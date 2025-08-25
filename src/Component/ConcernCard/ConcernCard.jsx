import React from "react";
import ConcernImg1 from "../../assets/images/concern-img-01.png";
import ConcernImg2 from "../../assets/images/concern-img-02.png";
import ConcernImg3 from "../../assets/images/concern-img-03.png";
import ConcernImg4 from "../../assets/images/concern-img-04.png";
import ConcernImg5 from "../../assets/images/concern-img-05.png";
import ConcernImg6 from "../../assets/images/concern-img-06.png";
import ConcernImg7 from "../../assets/images/concern-img-07.png";
import ConcernImg8 from "../../assets/images/concern-img-08.png";
import ConcernImg9 from "../../assets/images/pain-medication.png";
import ConcernImg10 from "../../assets/images/vision.png";
import ConcernImg11 from "../../assets/images/hearing.png";
import ConcernImg12 from "../../assets/images/Illness.png";
import ConcernImg13 from "../../assets/images/something-happened.png";
import ConcernImg14 from "../../assets/images/wound.png";
import ConcernImg15 from "../../assets/images/mucus-color.png"; 
import ConcernImg17 from "../../assets/images/trach_img.png";
import ConcernImg18 from "../../assets/images/something-else.png"; 
import { Link } from "react-router-dom";

const ConcernCard = () => {
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
            Breathing/Coughing
          </p>
        </div>
      </Link>
      <Link to="/swallowing-yes-no">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg3} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Swallowing</p>
          
        </div>
      </Link>
      <Link to="/nausea-step-yesno">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg4} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Nausea</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg5} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Bowels</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg6} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Urination</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg7} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Fatigue</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg8} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Eating / Drinking</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg9} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black"> Medication</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg8} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Emotions / Feelings</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg8} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Movement</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg8} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Communication / Thinking</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg10} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Vision</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg11} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Hearing</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg12} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Illness</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg13} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Something Happened</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg14} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Wound / Incision</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg15} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Mucus / Secretions</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg8} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Feeding Tube</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg17} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Trach</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg18} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">Something Else</p>
        </div>
      </Link>
      <Link to="/concern-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
          <div className="dashboard-img card-img-h rounded-2xl">
            <img src={ConcernImg8} className="w-full" />
          </div>
          <p className="text-[16px] mt-3 mb-2 color-black">No Concerns</p>
        </div>
      </Link>
    </>
  );
};

export default ConcernCard;
