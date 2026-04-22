import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { boardImg, EmotionsImg2 } from "../../Component/DiseasesData/images";
import scaleRating from "/assets/images/Rating Scale.png";
import NeedBoardIMg from "/assets/images/sidebar-icon-08.svg";

const SummaryCards = ({ board, selectedLanguage, SummaryConcernData, headerNames }) => {
  const [getData, setData] = useState({});
  useEffect(() => {
    if (!SummaryConcernData) {
      return;
    }
    setData(SummaryConcernData);
  }, [SummaryConcernData]);
  const imageSrc =
    headerNames?.path === "/rating-scale" ? scaleRating :
      board === "/board"
        ? boardImg
        : board === "/board" ? NeedBoardIMg : board === "/emotions"
          ? EmotionsImg2
          : getData?.image || headerNames?.icon;
  return (
    <>
      <div className="dashboard-cards rounded-2xl bg-white text-center py-4 px-3 shadow-sm cursor-pointer summary-left-cards">
        <div className="dashboard-img ">

          {imageSrc && (
            <img
              src={imageSrc}
              className="w-full"
              alt=""
            />
          )}

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