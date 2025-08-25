import React from "react";
import { Link } from "react-router-dom";
import EmotionsImg1 from "../../assets/images/emotion-img-01.png";
import EmotionsImg2 from "../../assets/images/emotion-img-02.png";
import EmotionsImg3 from "../../assets/images/emotion-img-03.png";
import EmotionsImg4 from "../../assets/images/emotion-img-04.png";
import EmotionsImg5 from "../../assets/images/emotion-img-05.png";
import EmotionsImg6 from "../../assets/images/emotion-img-06.png";

const CardsList = () => {
  return (
    <>
      <Link to="/feeling">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-img">
            <img src={EmotionsImg1} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Anxious</p>
        </div>
      </Link>
      <Link to="/feeling">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-img">
            <img src={EmotionsImg2} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Depressed</p>
        </div>
      </Link>
      <Link to="/feeling">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-img">
            <img src={EmotionsImg3} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Scared</p>
        </div>
      </Link>
      <Link to="/feeling">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-img">
            <img src={EmotionsImg4} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Angry</p>
        </div>
      </Link>
      <Link to="/feeling">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-img">
            <img src={EmotionsImg5} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Frustrated</p>
        </div>
      </Link>
      <Link to="/feeling">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-img">
            <img src={EmotionsImg6} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Frustrated</p>
        </div>
      </Link>
    </>
  );
};

export default CardsList;
