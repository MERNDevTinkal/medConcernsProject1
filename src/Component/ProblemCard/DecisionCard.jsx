import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";
import {
  WomenIcon,
  Question,
  Checked,
  Close,
} from "../../Component/DiseasesData/images";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import { dashimghow27 } from "../../Component/DiseasesData/images";
import Cookies from "js-cookie";

import {
  YesFemale,
  YesFemaleSpanish,
  NoFemale,
  NoFemaleSpanish,
  YesSpanishMale,
  YesMale,
  No_male,
  No_no_maleSpanish,
  iDontKnowFemale,
  IDontKnowMale,
  IdontknowSpanishFemale,
  NoSeMale,
} from "../../../src/Component/DiseasesData/audio";
const DecisionCard = ({ selectedLanguage, partName, selectedGender }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSpeakingRef = useRef(false);
  const path = location.pathname;
  const [active, setActive] = useState(null);
  const { updateDisease, diseases, addOrUpdateSummary } =
    useContext(GlobalContext);
  const newData = [
    {
      id: 1,
      image: Checked,
      name: "Yes",
      nameEs: "SÍ",
      newProblem: "New Problem",
      SpanishnewProblem: "Nuevo Problema",

      maleEnglish: YesMale,
      femaleEnglish: YesFemale,
      maleSpanish: YesSpanishMale,
      femaleSpanish: YesFemaleSpanish,
    },

    {
      id: 2,
      image: Close,
      name: "Not a New Problem",
      nameEs: "No Es Un Problema Nuevo",
      newProblem: "Not a New Problem",
      SpanishnewProblem: "No Es Un problema nuevo",
      maleEnglish: No_male,
      femaleEnglish: NoFemale,
      maleSpanish: No_no_maleSpanish,
      femaleSpanish: NoFemale,
    },
    {
      id: 3,
      image: dashimghow27,
      name: "I Don't Know",
      nameEs: "No sé",
      newProblem: "I Don't Know",
      SpanishnewProblem: "No sé",
      maleEnglish: IDontKnowMale,
      femaleEnglish: iDontKnowFemale,
      maleSpanish: NoSeMale,
      femaleSpanish: IdontknowSpanishFemale,
    },
  ];
  const getAudioByLanguageAndGender = (item, language, gender) => {
    const lang = language === "Spanish" ? "Spanish" : "English";
    const gen = gender === "Female" ? "Female" : "Male";
    return item?.[`${gen.toLowerCase()}${lang}`];
  };

  const handleDecision = async (value, mainpath, id) => {
    if (isSpeakingRef.current) return;

    setActive(id);
    isSpeakingRef.current = true;

    const selectedItem = newData.find((data) => data.id === id);
    if (!selectedItem) return;

    const audio = getAudioByLanguageAndGender(
      selectedItem,
      selectedLanguage,
      selectedGender
    );
    await getTextToSpeech(
      value,
      selectedLanguage === "Spanish" ? "es-ES" : "en-US",
      audio
    );

    if (path === "/new-problem") {
      const isConcern = Cookies.get("is_concern");
      const prefix =
        isConcern && isConcern?.includes("true_")
          ? isConcern + "/" + path
          : path;
      addOrUpdateSummary(prefix, arrayFilter);
    } else {
      updateDisease(path, value);
    }
    if (path !== "/yes-no") {
      navigate(mainpath);
    }

    isSpeakingRef.current = false;
  };

  return (
    <>
      <div className="w-full overflow-hidden decision-cards">
        <div className="decision-cards-innr">
          <div
            onClick={() => {
              handleDecision(
                selectedLanguage === "Spanish" ? "SÍ" : "Yes",
                path === "/new-problem" ? "/summary" : "/pain-feel",
                1
              );
            }}
          >
            <div
              className={`custom-wdth flex items-center justify-between p-4 px-10 border-3 border-white bg-white rounded-[10px] mb-5 cursor-pointer  transition-colors duration-300 ${active === 1 ? "active_now" : ""
                }`}
            >
              <div className="flex items-center">
                <p className="text-[40px]  font-medium text-green-600">
                  {selectedLanguage === "Spanish" ? "SÍ" : "YES"}
                </p>
              </div>
              <div>
                <img src={Checked} width="50px" className="concrn-icn" alt="" />
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              handleDecision(
                "No",
                path === "/new-problem" ? "/summary" : -1,
                2
              );
            }}
          >
            <div
              className={`custom-wdth flex items-center justify-between p-4 px-10 border-3 border-white bg-white rounded-[10px] mb-5 cursor-pointer   transition-colors duration-300 ${active === 2 ? "active_now" : ""
                }`}
            >
              <div className="flex items-center">
                <p className="text-[40px] font-medium text-red-600">
                  {selectedLanguage === "Spanish" ? "NO" : "NO"}
                </p>
              </div>
              <div>
                <img src={Close} width="50px" className="concrn-icn" />
              </div>
            </div>
          </div>
          {!partName &&
            !["/concern-pain", "/face-pain"].includes(location.pathname) && (
              <div
                onClick={() => {
                  handleDecision(
                    selectedLanguage === "Spanish" ? "no lo sé" : "Don't Know",
                    "/summary",
                    3
                  );
                }}
                className={`custom-wdth flex items-center justify-between p-4 px-10 border-3 border-white bg-white rounded-[10px]  cursor-pointer  transition-colors duration-300 ${active === 3 ? "active_now" : ""
                  }`}
              >
                <div className="flex items-center">
                  <img src={WomenIcon} width="70px" alt="" className="" />
                </div>
                <div>
                  <img src={Question} width="40px" className="concrn-icn" />
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default DecisionCard;
