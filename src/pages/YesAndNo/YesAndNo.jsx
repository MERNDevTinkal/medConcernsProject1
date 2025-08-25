import React from "react";
import DecisionCard from "../../Component/ProblemCard/DecisionCard";
import HowAreYou1 from "../../assets/images/bad.png";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import BackArrow from "../../assets/images/back-arrow.svg";
import YesNo from "../../Component/YesNo/YesNo";

import HowAreYouImg1 from "../../assets/images/good.png";
import HowAreYouImg2 from "../../assets/images/okay.png";
import HowAreYouImg3 from "../../assets/images/bad.png";
import HowAreYouImg4 from "../../assets/images/up-and-down.png";
import HowAreYouImg5 from "../../assets/images/getting-better.png";
import HowAreYouImg6 from "../../assets/images/getting-worse.png";
import HowAreYouImg7 from "../../assets/images/concern-img-08.png";
import HowAreYouImg8 from "../../assets/images/i-dont-know.png";

function YesAndNo() {
  const options = [
    { id: 1, text: "Good", image: HowAreYouImg1 },
    { id: 2, text: "Okay", image: HowAreYouImg2 },
    { id: 3, text: "Bad", image: HowAreYouImg3 },
    { id: 4, text: "Up and Down", image: HowAreYouImg4 },
    { id: 5, text: "Getting Better", image: HowAreYouImg5 },
    { id: 6, text: "Getting Worse", image: HowAreYouImg6 },
    { id: 7, text: "The Same", image: HowAreYouImg7 },
    { id: 8, text: "I Don't Know", image: HowAreYouImg8 },
  ];

  const { id } = useParams();
  const option = options.find((item) => item.id === Number(id));

  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
        <Link to="/dashboard">
          <img src={BackArrow} />
        </Link>
        <h2 className="text-[25px] font-normal text-black text-center">
          {option?.text || "Pain"}
        </h2>
        <button></button>
      </div>
      <div className="main-wrapper home-wrapper ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:px-10 sm:px-5 px-5 md:gap-20 gap-5 my-5 items-center">
          <div className="dashboard-cards rounded-2xl bg-white text-center shadow-sm p-3">
            <div className="dashboard-img rounded-2xl">
              {/* <img src={HowAreYou1} className="w-full" /> */}

              <img
                src={option.image || HowAreYou1}
                alt={option.text || "alt"}
                className="mx-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
          <div>
            <YesNo />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default YesAndNo;
