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
  const [selectedIconCount, setSelectedIconCount] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [selectedGender, setSelectedGender] = React.useState("");
  const location = useLocation();
  const Mainpath = location.pathname;
  const headerName = location.state;
  const [problem, setProblems] = useState([]);
  const navigate = useNavigate();
  const { addOrUpdateSummary } = useContext(GlobalContext);
  const handleBreathingProblem = async (value, path) => {
    if (value && path) {
      await getTextToSpeech(
        selectedLanguage === "Spanish" ? value.nameEs : value.name,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        selectedLanguage === "" && selectedGender === ""
          ? value?.maleEnglish
          : selectedLanguage === "Spanish" && selectedGender === "Male"
          ? value?.maleSpanish
          : selectedLanguage === "Spanish" && selectedGender === "Female"
          ? value?.femaleSpanish
          : selectedLanguage === "" && selectedGender === "Female"
          ? value?.femaleEnglish
          : selectedLanguage === "" && selectedGender === "Male"
          ? value?.maleEnglish
          : selectedLanguage === "English" && selectedGender === "Male"
          ? value?.maleEnglish
          : selectedLanguage === "English" && selectedGender === "Female"
          ? value?.femaleEnglish
          : value?.maleEnglish
      );
      addOrUpdateSummary(Mainpath, [value]);
      navigate(path, {
        state: value,
      });
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
      () => {},
      () => {},
      setLoader
    );
  }, []);

  const translations = {
    "/noappetite-problem": {
      English: "Appetite",
      Spanish: "Apetito",
      default: "Appetite",
    },
    "/bowels-problem": {
      English: "Bowels",
      Spanish: "Intestinos",
      default: "Bowels",
    },
    "/breathing-problem": {
      English: "Breathing/Coughing",
      Spanish: "Respiración/tos",
      default: "Breathing/Coughing",
    },
    "/fatigue-problem": {
      English: "Fatigue",
      Spanish: "Fatiga",
      default: "Fatigue",
    },
    "/illness-problem": {
      English: "Illness",
      Spanish: "Enfermedad",
      default: "Illness",
    },
    "/hearing-problem": {
      English: "Hearing",
      Spanish: "Audición",
      default: "Hearing",
    },
    "/medication-problem": {
      English: "Medication",
      Spanish: "Medicación",
      default: "Medication",
    },
    "/illnessMucus-problem": {
      English: "Mucus/Secretions",
      Spanish: "Moco/Secreciones",
      default: "Mucus/Secretions",
    },
    "/nausea-problem": {
      English: "Nausea",
      Spanish: "Náusea",
      default: "Nausea",
    },
    "/feeding-problem": {
      English: "Feeding Tube",
      Spanish: "Tubo de alimentación",
      default: "Feeding Tube",
    },
    "/swallowing-problem": {
      English: "Swallowing",
      Spanish: "Deglución",
      default: "Appetite",
    },
    "/something-problem": {
      English: "Something Happened",
      Spanish: "Algo Pasó",
      default: "Appetite",
    },
    "/trach-problem": {
      English: "Trach",
      Spanish: "Traqueo",
      default: "Appetite",
    },
    "/urination-problem": {
      English: "Urination",
      Spanish: "Orinación",
      default: "Appetite",
    },
    "/vision-problem": {
      English: "Vision",
      Spanish: "Visión",
      default: "Appetite",
    },
    "/wound-problem": {
      English: "Wound/Incision",
      Spanish: "Herida/Incisión",
      default: "Appetite",
    },
    default: {
      English: "Which Feeling are You experiencing",
      Spanish: "¿Qué sensación estás experimentando?",
      default: "Which Feeling are You experiencing",
    },
  };

  const name = !selectedLanguage
    ? translations[Mainpath]?.default
    : translations[Mainpath]?.[selectedLanguage] ??
      translations?.default[selectedLanguage];
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            name={
              name
                ? name
                : selectedLanguage === "Spanish"
                ? headerName?.nameEs
                : headerName?.name
            }
          />

          <div className="main-wrapper home-wrapper">
            <div
              className="dashboard-h grid gap-3 p-3"
              style={{
                gridTemplateColumns:
                  selectedIconCount === 6
                    ? "repeat(3, 1fr)" // 3 per row
                    : `repeat(${selectedIconCount || 2}, 1fr)`,
                gridTemplateRows:
                  selectedIconCount === 6 ? "repeat(2, 1fr)" : "auto",
              }}
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
                        <img
                          style={{
                            height: selectedIconCount === 6 ? "50px" : "",
                          }}
                          src={data?.image}
                          className="w-full"
                        />
                      </div>
                      <p className="text-[16px] mt-3 mb-2 color-black">
                        {selectedLanguage === "Spanish"
                          ? data?.nameEs
                          : data?.name || ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default BreathingProblem;
