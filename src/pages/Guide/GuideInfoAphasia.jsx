import React from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import Arrow from "../../assets/images/double-arrow.svg";

const GuideInfoAphasia = () => {
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="px-[30px] my-5">
          <h2 className="text-[32px] primary-text font-medium leading-[40px]">
            Healthcare Providers and Aphasia
          </h2>
          <h5 className="text-[16px] text-black my-5 font-normal">
            Aphasia is a communication impairment that affects language:
            speaking, reading, writing, and understanding.
          </h5>
          <h5 className="text-[16px] text-black my-5 font-normal">
            How do PWA communicate medical concerns and symptoms experienced if
            they have difficulty speaking, reading, writing, and understanding?
          </h5>
          <h5 className="text-[16px] text-black my-5 font-normal">
            Communication problems between Healthcare Providers (HCP) and People
            with Aphasia (PWA) impedes both diagnosis and therapy, with
            considerable implications for healthcare quality (Rijssen, Veldkamp,
            et al., 2021).
          </h5>
          <p className="text-[14px] text-black font-normal mb-3.5 flex items-start gap-3.5">
            <img src={Arrow} />
            PWA participate more effectively in conversations with a trained
            communication partner (Karan et al, 2001).
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GuideInfoAphasia;
