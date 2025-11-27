import React from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import emotionsImg from "../../assets/images/emotion-img-02.png";
import skipArrow from "../../assets/images/skip-arrow.svg";
import { useNavigate } from "react-router-dom";
function DepressionScreener() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper ">
        <div className="depression-cards">
          <h3 className="text-center">
            Do you want to answer questions about depression?
          </h3>
          <ul className="depression-list">
            <li className="depression-item" onClick={() => { navigate("/feelOptions/1") }} >
              <img src={emotionsImg} alt="" />
              <span>Start Depression Screener</span>
            </li>
            <li className="depression-item" onClick={() => { navigate("/feeling-body") }}>
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
