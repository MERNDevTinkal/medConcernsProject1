import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useRef } from "react";
import Checked from "../../assets/images/checked.svg";
import Close from "../../assets/images/close.svg";
import Question from "../../assets/images/question.svg";
import WomenIcon from "../../assets/images/women.png";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import NoImg from "../../../src/assets/images/concern-img-08.png";
import yesImage from "../../../src/assets/images/summary-img-06.png";
import dontknowImg from "../../../src/assets/images/something-else.png";
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
      femaleSpanish: NoFemaleSpanish,
    },
    {
      id: 3,
      image: dontknowImg,
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
  const handleDecision = async (value, mainpath, id) => {
    if (isSpeakingRef.current) return;
    isSpeakingRef.current = true;
    if (value && mainpath) {
      const arrayFilter = newData.filter((data) => data.id === id);
      await getTextToSpeech(
        value,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        selectedLanguage === "" && selectedGender === ""
          ? arrayFilter?.[0]?.maleEnglish
          : selectedLanguage === "Spanish" && selectedGender === "Male"
          ? arrayFilter?.[0]?.maleSpanish
          : selectedLanguage === "Spanish" && selectedGender === "Female"
          ? arrayFilter?.[0]?.femaleSpanish
          : selectedLanguage === "" && selectedGender === "Female"
          ? arrayFilter?.[0]?.femaleEnglish
          : selectedLanguage === "" && selectedGender === "Male"
          ? arrayFilter?.[0]?.maleEnglish
          : selectedLanguage === "English" && selectedGender === "Male"
          ? arrayFilter?.[0]?.maleEnglish
          : selectedLanguage === "English" && selectedGender === "Female"
          ? arrayFilter?.[0]?.femaleEnglish
          : arrayFilter?.[0]?.maleEnglish
      );
      if (path === "/new-problem") {
        const isConcern = Cookies.get("is_concern");
        const prefix =
          isConcern && isConcern?.includes("true_")
            ? isConcern + "/" + path
            : path;
        addOrUpdateSummary(prefix, arrayFilter);
      } else {
        updateDisease(path.replace("/", ""), value);
      }
      navigate(mainpath);
      isSpeakingRef.current = false;
    }
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
            <div className="flex items-center justify-between sm:p-2 p-4 border-3 border-white bg-white rounded-[10px] mb-3 sm:mb-1.5 cursor-pointer hover:border-blue-600 transition-colors duration-300">
              <div className="flex items-center">
                <p className="text-[32px]  font-medium text-green-600">
                  {selectedLanguage === "Spanish" ? "SÍ" : "YES"}
                </p>
              </div>
              <div>
                <img src={Checked} className="concrn-icn" alt="" />
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
            <div className="flex items-center justify-between p-4 sm:p-2 border-3 border-white bg-white rounded-[10px] mb-3 sm:mb-1.5 cursor-pointer hover:border-blue-600 transition-colors duration-300">
              <div className="flex items-center">
                <p className="text-[32px] font-medium text-red-600">
                  {selectedLanguage === "Spanish" ? "NO" : "NO"}
                </p>
              </div>
              <div>
                <img src={Close} className="concrn-icn" />
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
                className="flex items-center justify-between p-4 sm:p-2 border-3 border-white bg-white rounded-[10px] mb-3 sm:mb-1.5 cursor-pointer hover:border-blue-600 transition-colors duration-300"
              >
                <div className="flex items-center">
                  <img src={WomenIcon} alt="" className="w-14 h-14" />
                </div>
                <div>
                  <img src={Question} className="concrn-icn" />
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default DecisionCard;
