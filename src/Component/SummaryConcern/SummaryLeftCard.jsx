import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SummaryCards = ({ selectedLanguage, SummaryConcernData }) => {
  const [getData, setData] = useState({});
  useEffect(() => {
    if (!SummaryConcernData?.name) {
      return;
    }
    setData(SummaryConcernData);
  }, [SummaryConcernData]);
  return (
    <>
      <div className="dashboard-cards rounded-2xl bg-white text-center py-4 px-3 shadow-sm cursor-pointer summary-left-cards">
        <div className="dashboard-img ">
          <img src={getData?.image} className="w-full" />
        </div>
        <Link to="" className="text-[21px] font-normal color-black">
          {selectedLanguage === "Spanish"
            ? getData?.nameEs
            : getData?.name || ""}
        </Link>
      </div>
    </>
  );
};

export default SummaryCards;
