import React from "react";
import BackArrow from "../../assets/images/back-arrow.svg";
import NextArrow from "../../assets/images/next-arrow.svg";
import DecisionCard from "../../Component/ProblemCard/DecisionCard";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../Component/Layout/Header/Header";
const NewProblem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Header
        name={
          location.pathname === "/new-problem"
            ? "Is this a new problem"
            : "How do you feel overall?"
        }
      />

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
