import React from "react";
import Header from "../../Component/Layout/Header/Header";
import SummaryLeftCard from "../../Component/SummaryConcern/SummaryLeftCard";
import Arrow from "../../assets/images/arrow.svg";
import Footer from "../../Component/Layout/Footer/Footer";
import SummaryRightCard from "../../Component/SummaryConcern/SummaryRightCard";

const SummaryList = () => {
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="flex flex-row items-center w-full px-4 my-5 summary-main">
          <div className="md:w-1/4 sm:w-1/2 w-full">
            <SummaryLeftCard />
          </div>
          <div className="arrow-right  mx-4 ">
            <img src={Arrow} alt="" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4.5 sm:gap-3 ">
            <SummaryRightCard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SummaryList;
