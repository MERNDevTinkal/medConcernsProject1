import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import boardImg from "../../assets/images/sidebar-icon-08.svg";
import { EmotionsImg2 } from "../../Component/DiseasesData/images";
const SummaryCards = ({ board, selectedLanguage, SummaryConcernData,headerNames }) => {
  const [getData, setData] = useState({});
  useEffect(() => {
    if (!SummaryConcernData) {
      return;
    }
    setData(SummaryConcernData);
  }, [SummaryConcernData]);
  return (
    <>
      <div className="dashboard-cards rounded-2xl bg-white text-center py-4 px-3 shadow-sm cursor-pointer summary-left-cards">
        <div className="dashboard-img ">
          <img
            src={
              board === "board"
                ? boardImg
                : board === "/emotions"
                ? EmotionsImg2
                : getData?.image ?? headerNames?.icon ?? ""
            }
            className="w-full"
          />
        </div>
        <Link
          to=""
          className="text-xl md:text-lg sm:text-base font-normal color-black"
        >
          {selectedLanguage === "Spanish"
            ? getData?.nameEs ?? headerNames?.es
            : board === "/emotions"
            ? "Emotions / Feelings"
            : getData?.name ?? headerNames?.en ?? ""}
        </Link>
      </div>
    </>
  );
};

export default SummaryCards;