import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { GlobalContext } from "../../context/DiseaseContext";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
const BreathingProblem = () => {
  const [selectedIconCount, setSelectedIconCount] = React.useState(3);
  const [selectedGender, setSelectedGender] = React.useState("Female");
  const [selectedLanguage, setSelectedLanguage] = React.useState("Spanish");
  const [calendarOn, setCalendarOn] = React.useState(true);
  const [introductionOn, setIntroductionOn] = React.useState(true);
  const [loader, setLoader] = useState(true);

  const location = useLocation();
  const Mainpath = location.pathname;
  const [problem, setProblems] = useState([]);
  const navigate = useNavigate();
  const { updateDisease, diseases, addOrUpdateSummary } =
    useContext(GlobalContext);
  const handleBreathingProblem = async (value, path) => {
    if (value && path) {
      await getTextToSpeech(value.name);
      addOrUpdateSummary(Mainpath, [value]);
      navigate(path);
    }
  };
  useEffect(() => {
    setProblems(diseasesData[Mainpath]);
  }, [Mainpath]);

  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader
    );
  }, []);
  return (
    <>
      <Header
        name={
          Mainpath === "/noappetite-problem"
            ? "Appetite"
            : Mainpath === "/bowels-problem"
            ? "Bowels"
            : Mainpath === "/breathing-problem"
            ? "Breathing"
            : Mainpath === "/fatigue-problem"
            ? "Fatigue"
            : Mainpath === "/illness-problem"
            ? "Illness"
            : Mainpath === "/hearing-problem"
            ? "Hearing"
            : Mainpath === "/medication-problem"
            ? "Medication"
            : Mainpath === "/illnessMucus-problem"
            ? "Mucus/Secretions"
            : Mainpath === "/nausea-problem"
            ? "Nausea"
            : Mainpath === "/feeding-problem"
            ? "PEG"
            : Mainpath === "/swallowing-problem"
            ? "Swallowing"
            : Mainpath === "/something-problem"
            ? "Something Happened"
            : Mainpath === "/trach-problem"
            ? "Trach"
            : Mainpath === "/urination-problem"
            ? "Urination"
            : Mainpath === "/vision-problem"
            ? "Vision"
            : Mainpath === "/wound-problem"
            ? "Wound/Incision"
            : "Which Feeling are You experiencing"
        }
      />
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper">
          <div
            className={`dashboard-h grid grid-cols-${
              selectedIconCount || 2
            } sm:grid-cols-${selectedIconCount || 3} md:grid-cols-${
              selectedIconCount || 3
            } gap-3.5 px-4 py-1.5 emotion-cards`}
          >
            {problem?.map((data, index) => {
              return (
                <div
                  style={{ cursor: "pointer" }}
                  key={data?.id + "-" + index}
                  onClick={() => {
                    handleBreathingProblem(
                      data,
                      data?.secPath?.includes("/confrm-step-yesno")
                        ? `${Mainpath}${data?.secPath}/${data?.id}`
                        : `${data?.secPath}`
                    );
                  }}
                >
                  <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
                    <div className="dashboard-img card-img-h rounded-2xl">
                      <img src={data?.image} className="w-full" />
                    </div>
                    <p className="text-[16px] mt-3 mb-2 color-black">
                      {data?.name || ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default BreathingProblem;
