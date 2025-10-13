import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import BackArrow from "../../assets/images/back-arrow.svg";
import DecisionCardFeeling from "./DecisionCardFeeling-l";
import TopicBoard from "../Topicboard/topicBoard";
import { concerns } from "../../Component/DiseasesData/diseasesData";
import { topicBoard } from "../../Component/DiseasesData/diseasesData";
import { useParams } from "react-router-dom";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";

function BreathingYesNo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [concernValues, setConcernValues] = useState({});
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (concerns?.length > 0) {
      const concern = location.pathname.includes("/topicboard/")
        ? topicBoard.find((c) => c.id == id)
        : concerns.find((c) => c.id == id);
      setConcernValues(concern);
    }
  }, [id]);

  useEffect(() => {
    getSetting(
      () => {},
      () => {},
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader
    );
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <img src={BackArrow} />
            </div>
            <h2 className="text-[25px] font-normal text-black text-center">
              {selectedLanguage === "Spanish"
                ? concernValues.nameEs
                : concernValues.name || ""}
            </h2>
            <button></button>
          </div>
          <div className="main-wrapper home-wrapper ">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:px-10 sm:px-5 px-5 md:gap-20 gap-5 my-5 items-center">
              <div
                className={`dashboard-cards rounded-2xl bg-white text-center shadow-sm p-3 ${
                  location.pathname.includes("/topicboard/")
                    ? "h-[200px] flex justify-center items-center"
                    : ""
                } `}
              >
                {location.pathname.includes("/topicboard/") ? (
                  <p className="text-xl">
                    {selectedLanguage === "Spanish"
                      ? concernValues?.nameEs
                      : concernValues?.name}
                  </p>
                ) : (
                  <div className="dashboard-img rounded-2xl">
                    <img src={concernValues?.image} className="w-full" />
                  </div>
                )}
              </div>
              <div>
                {location.pathname.includes("/topicboard/") ? (
                  <TopicBoard
                    concernValues={concernValues}
                    selectedLanguage={selectedLanguage}
                    concenFell={concernValues?.secPath}
                  />
                ) : (
                  <DecisionCardFeeling
                    concernValues={concernValues}
                    selectedLanguage={selectedLanguage}
                    concenFell={concernValues?.secPath}
                  />
                )}
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default BreathingYesNo;
