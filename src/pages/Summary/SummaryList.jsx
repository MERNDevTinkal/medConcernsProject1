import React, { useEffect, useContext, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import SummaryLeftCard from "../../Component/SummaryConcern/SummaryLeftCard";
import Arrow from "../../assets/images/arrow.svg";
import Footer from "../../Component/Layout/Footer/Footer";
import SummaryRightCard from "../../Component/SummaryConcern/SummaryRightCard";
import { GlobalContext } from "../../context/DiseaseContext";

const SummaryList = () => {
  const { diseases } = useContext(GlobalContext);
  console.log("=====>diseases", diseases
  )
  return (
    <>
      <Header />
      {(diseases?.concern?.name || diseases?.summaryList.length > 0) ? (
        <div className="main-wrapper home-wrapper">
          <div className="flex flex-row items-center w-full px-4 my-5 summary-main">
            <div className="md:w-1/4 sm:w-1/2 w-full">
              <SummaryLeftCard SummaryConcernData={diseases?.concern} />
            </div>
            <div className="arrow-right mx-4">
              <img src={Arrow} alt="arrow" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4.5 sm:gap-3">
              <SummaryRightCard SummaryDetail={diseases?.summaryList} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-2xl font-semibold">No Summary Available</h1>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SummaryList;
