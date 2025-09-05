import React from "react";
import BackArrow from "../../assets/images/back-arrow.svg";
import NextArrow from "../../assets/images/next-arrow.svg";
import DecisionCard from "../../Component/ProblemCard/DecisionCard";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
const NewProblem = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
        <button onClick={() => { navigate(-1) }}>
          <img src={BackArrow} />
        </button>
        <h1 className="text-[25px] font-normal text-black">
          How do you feel overall?
        </h1>
        <button>
          <img src={NextArrow} />
        </button>
      </div>
      <div className="main-wrapper home-wrapper ">
        <div className="px-10 my-10">
          <DecisionCard />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewProblem;
