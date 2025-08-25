import React from "react";
import Header from "../Component/Layout/Header/Header";
import Footer from "../Component/Layout/Footer/Footer";

const Disclaimer = () => {
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper ">
        <div className="px-6 text-center mt-7">
          <h2 className="text-[24px] font-normal text-black mb-6">
            Disclaimer
          </h2>
          <p className="text-[16px] font-normal leading-relaxed">
            This app does not diagnose, treat, or provide medical advice. It is
            intended solely as a communication aid to help users express medical
            concerns to healthcare providers. Any information within the app is
            for general informational purposes only and is not a substitute for
            professional medical advice. Always consult a qualified healthcare
            provider before making medical decisions.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Disclaimer;
