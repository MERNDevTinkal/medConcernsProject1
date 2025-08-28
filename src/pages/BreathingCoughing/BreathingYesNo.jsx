import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import BackArrow from "../../assets/images/back-arrow.svg";
import ConcernImg2 from "../../assets/images/concern-img-02.png";
import DecisionCardFeeling from "./DecisionCardFeeling-l";
import { concerns } from "../../Component/DiseasesData/concernData";
import ConcernImg8 from "../../assets/images/concern-img-08.png";
import { useParams } from "react-router-dom";

function BreathingYesNo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [concernValues, setConcernValues] = useState({});
  const [slugName, setslugName] = useState("");
  useEffect(() => {
    if (concerns?.length > 0) {
      const concern = concerns.find((c) => c.id == id);
      setslugName(concern?.name);
      setConcernValues(concern)
    }
  }, [id])

  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
        <div style={{ cursor: "pointer" }} onClick={() => { navigate(-1); }}>
          <img src={BackArrow} />
        </div>
        <h2 className="text-[25px] font-normal text-black text-center">{concernValues.name || ""}</h2>
        <button></button>
      </div>
      <div className="main-wrapper home-wrapper ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:px-10 sm:px-5 px-5 md:gap-20 gap-5 my-5 items-center">
          <div className="dashboard-cards rounded-2xl bg-white text-center shadow-sm p-3">
            <div className="dashboard-img rounded-2xl">
              <img src={concernValues?.image || ConcernImg8} className="w-full" />
            </div>
          </div>
          <div>
            <DecisionCardFeeling />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default BreathingYesNo;
