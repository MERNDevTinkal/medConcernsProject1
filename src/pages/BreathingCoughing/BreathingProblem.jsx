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

  const location = useLocation();
  const Mainpath = location.pathname;
  const [problem, setProblems] = useState([]);
  const navigate = useNavigate();
  const { updateDisease, diseases, addOrUpdateSummary } =
    useContext(GlobalContext);
  const handleBreathingProblem = async (value, path) => {
    if (value && path) {
      await getTextToSpeech(
        selectedLanguage === "Spanish" ? value.nameEs : value.name
      );
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
      () => {},
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader
    );
  }, []);

  const translations = {
    "/noappetite-problem": { English: "Appetite", Spanish: "Apetito" },
    "/bowels-problem": { English: "Bowels", Spanish: "Intestinos" },
    "/breathing-problem": { English: "Breathing", Spanish: "Respiración" },
    "/fatigue-problem": { English: "Fatigue", Spanish: "Fatiga" },
    "/illness-problem": { English: "Illness", Spanish: "Enfermedad" },
    "/hearing-problem": { English: "Hearing", Spanish: "Audición" },
    "/medication-problem": { English: "Medication", Spanish: "Medicación" },
    "/illnessMucus-problem": {
      English: "Mucus/Secretions",
      Spanish: "Moco/Secreciones",
    },
    "/nausea-problem": { English: "Nausea", Spanish: "Náusea" },
    "/feeding-problem": { English: "PEG", Spanish: "PEG" },
    "/swallowing-problem": { English: "Swallowing", Spanish: "Deglución" },
    "/something-problem": {
      English: "Something Happened",
      Spanish: "Algo Pasó",
    },
    "/trach-problem": { English: "Trach", Spanish: "Traqueo" },
    "/urination-problem": { English: "Urination", Spanish: "Orinación" },
    "/vision-problem": { English: "Vision", Spanish: "Visión" },
    "/wound-problem": { English: "Wound/Incision", Spanish: "Herida/Incisión" },
    default: {
      English: "Which Feeling are You experiencing",
      Spanish: "¿Qué sensación estás experimentando?",
    },
  };

  const name =
    translations[Mainpath]?.[selectedLanguage] ??
    translations.default[selectedLanguage];

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header selectedLanguage={selectedLanguage} name={name} />

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
