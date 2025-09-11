import React from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import Arrow from "../../assets/images/double-arrow.svg";

const GuideInfo = () => {
  return (
    <>
      <Header name="About Us" />
      <div className="main-wrapper home-wrapper">
        <div className="px-[30px] my-5">
          <h2 className="text-[32px] primary-text font-medium leading-[40px]">
            Tips for using the Pocket Guide for Healthcare Professionals:
          </h2>
          <h5 className="text-[16px] text-black my-5 font-normal">
            Use these strategies to help PWA communicate their medical concerns.
          </h5>
          <p className="text-[14px] text-black font-normal mb-3.5 flex items-start gap-3.5">
            <img src={Arrow} />
            Tag the end of your question with a yes/no gesture to promote
            comprehension for PWA, for example, “Do you have pain?” “yes?”(nod
            head for yes)“or no?”(shake head for no)
          </p>
          <p className="text-[14px] text-black font-normal mb-3.5 flex items-start gap-3.5">
            <img src={Arrow} />
            Use slow and simplified statements and questions
          </p>
          <p className="text-[14px] text-black font-normal mb-3.5 flex items-start gap-3.5">
            <img src={Arrow} />
            Incorporate facial expressions, gestures, and body language
          </p>
          <p className="text-[14px] text-black font-normal mb-3.5 flex items-start gap-3.5">
            <img src={Arrow} />
            Wait for a response
          </p>
          <p className="text-[14px] text-black font-normal mb-3.5 flex items-start gap-3.5">
            <img src={Arrow} />
            Point to each multiple choice option as you read it
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GuideInfo;
