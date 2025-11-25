import React from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import emotionsImg from "../../assets/images/emotion-img-02.png";
import skipArrow from "../../assets/images/skip-arrow.svg";

function DepressionScreener() {
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper ">
        <div className="depression-cards">
          <h3 className="text-center">
            Do you want to answer questions about depression?
          </h3>
          <ul className="depression-list">
            <li className="depression-item">
              <img src={emotionsImg} alt="" />
              <span>Start Depression Screener</span>
            </li>
            <li className="depression-item">
              <img src={skipArrow} alt="" />
              <span>Skip Screening Question</span>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DepressionScreener;
