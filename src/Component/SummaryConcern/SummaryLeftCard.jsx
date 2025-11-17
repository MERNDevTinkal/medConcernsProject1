import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import boardImg from "../../assets/images/sidebar-icon-08.svg"

const SummaryCards = ({board, selectedLanguage, SummaryConcernData }) => {
  const [getData, setData] = useState({});
  useEffect(() => {
    if (!SummaryConcernData?.name) {
      return;
    }
    setData(SummaryConcernData);
  }, [SummaryConcernData]);
  console.log("===>board",board)
  return (
    <>
      <div className="dashboard-cards rounded-2xl bg-white text-center py-4 px-3 shadow-sm cursor-pointer summary-left-cards">
        <div className="dashboard-img ">
          <img src={board === "board" ? boardImg: getData?.image} className="w-full" />
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
