import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";

import DecisionCardFeeling from "./DecisionCardFeeling-l";
import TopicBoard from "../Topicboard/topicBoard";
import {
  concerns,
  topicBoard,
} from "../../Component/DiseasesData/diseasesData";
import { useParams } from "react-router-dom";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import Header from "../../Component/Layout/Header/Header";
import { gifLoader, BackArrow } from "../../Component/DiseasesData/images";
function BreathingYesNo() {
  const navigate = useNavigate();
  const location = useLocation();
  const getneedboard = location?.state?.value || {};
  const { id } = useParams();
  const [concernValues, setConcernValues] = useState({});
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (concerns?.length > 0) {
      const concern = location.pathname.includes("/topicboard/")
        ? id == "_id"
          ? getneedboard
          : topicBoard.find((c) => c.id == id)
        : concerns.find((c) => c.id == id);
      setConcernValues(concern);
    }
  }, [id]);

  useEffect(() => {
    getSetting(
      () => { },
      setSelectedGender,
      setSelectedLanguage,
      () => { },
      () => { },
      setLoader,
      () => { },
      () => { },
      () => { },
      () => { },
    );
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {/* <div className="flex items-center justify-between py-4 fixed left-0 right-0 to-0 bg-white innr-header">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <img src={BackArrow} />
            </div>
            <h2 className="Header-text text-[30px] font-medium text-black text-center py-2">
              {selectedLanguage === "Spanish"
                ? concernValues.nameEs
                : concernValues.name || ""}
            </h2>
            <button className="opacity-0">Medconcern</button>
          </div> */}
          <Header
            selectedLanguage={selectedLanguage}
            introductionOn={''}
            calendarOn={''}
            name={
              (selectedLanguage === "Spanish")
                ? concernValues.nameEs
                : concernValues.name || ""
            }
          />
          <div className="main-wrapper home-wrapper items-center justify-center flex flex-col min-h-[90vh]">
            <div className="grid grid-cols-2 gap-18 my-0 items-center common-scale mt-5">
              <div
                className={`dashboard-cards brthng-card rounded-2xl bg-white text-center shadow-sm p-3
  `}
              >
                <div
                  className={`  ${location.pathname.includes("/topicboard/")
                    ? "h-[300px] flex justify-center items-center relative"
                    : ""
                    } dashboard-img rounded-2xl w-full h-full`}
                >
                  {location.pathname.includes("/topicboard/") ? (
                    <>
                      <p className="text-xl">
                        {selectedLanguage === "Spanish"
                          ? concernValues?.nameEs
                          : concernValues?.name}
                      </p>
                      {selectedLanguage === "Spanish" && (
                        <p className="absolute bottom-0 left-0 right-0 break-words">
                          {concernValues?.name}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="h-full w-full">
                      <img
                        src={concernValues?.image ?? gifLoader}
                        className="mx-auto rounded-xl w-full "
                          draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                {location.pathname.includes("/topicboard/") ? (
                  <TopicBoard
                    selectedGender={selectedGender}
                    concernValues={concernValues}
                    selectedLanguage={selectedLanguage}
                    concenFell={concernValues?.secPath}
                  />
                ) : (
                  <DecisionCardFeeling
                    selectedGender={selectedGender}
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
