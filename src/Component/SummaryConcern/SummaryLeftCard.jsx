import React, { useEffect, useState } from "react";
import ConcernImg1 from "../../assets/images/concern-img-01.png";
import { Link } from "react-router-dom";

const SummaryCards = ({ SummaryConcernData }) => {
  const [getData, setData] = useState({});
  useEffect(() => {
    if (!SummaryConcernData?.name) {
      return;
    }
    setData(SummaryConcernData)
  }, [SummaryConcernData])
  return (
    <>
      <div className="dashboard-cards rounded-2xl h-[200px] bg-white text-center py-4 px-3 shadow-sm cursor-pointer">
        <div className="dashboard-img ">
          <img src={getData?.image} className="w-full" />
        </div>
        <Link to="" className="text-[21px] font-normal color-black">
          {getData?.name || ""}
        </Link>
      </div>
    </>
  );
};

export default SummaryCards;
