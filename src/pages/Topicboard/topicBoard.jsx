import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/DiseaseContext";
import { useParams } from "react-router-dom";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import { Checked, Close } from "../../Component/DiseasesData/images";
import {
  YesFemale,
  YesFemaleSpanish,
  NoFemale,
  NoFemaleSpanish,
  YesSpanishMale,
  YesMale,
  No_male,
  No_no_maleSpanish,
} from "../../../src/Component/DiseasesData/audio";
const DecisionCardFeeling = ({
  selectedGender,
  concernValues,
  selectedLanguage,
  concenFell,
}) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pathUrl, setPathUrl] = useState("");
  const { updateDisease, diseases } = useContext(GlobalContext);
  const handleBreathingYesNo = async (value, path, audio) => {
    if (value && path) {
      await getTextToSpeech(
        value,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        audio
      );
      updateDisease("concenyesno", value);
      if (path === "/pain-problem") {
        return navigate("/pain-concern");
      }
      if (value === "NO") {
        return navigate(-1);
      }
      navigate("/whiteboard", {
        state: concernValues,
      });
    }
  };
  useEffect(() => {
    if (!name) return;
    const [firstPart] = name.split("-");
    const newPath = `/${firstPart}-problem`;
    if (newPath === "/emotions-problem" && concenFell === "/feel") {
      return setPathUrl(concenFell);
    }

    setPathUrl(newPath);
  }, [name, concenFell]);
  return (
    <>
      <div className="w-full overflow-hidden decision-cards">
        <div
          onClick={() => {
            handleBreathingYesNo(
              selectedLanguage === "Spanish" ? "Sí" : "YES",
              pathUrl,
              selectedLanguage === "" && selectedGender === ""
                ? YesMale
                : selectedLanguage === "Spanish" && selectedGender === "Male"
                  ? YesSpanishMale
                  : selectedLanguage === "Spanish" && selectedGender === "Female"
                    ? YesFemaleSpanish
                    : selectedLanguage === "" && selectedGender === "Female"
                      ? YesFemale
                      : selectedLanguage === "" && selectedGender === "Male"
                        ? YesMale
                        : selectedLanguage === "English" && selectedGender === "Male"
                          ? YesMale
                          : selectedLanguage === "English" && selectedGender === "Female"
                            ? YesFemale
                            : YesMale
            );
          }}
        >
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[32px] font-medium text-green-600">
                {selectedLanguage === "Spanish" ? "Sí" : "YES"}
              </p>
            </div>
            <div>
              <img src={Checked} alt="" />
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            handleBreathingYesNo(
              "NO",
              -1,
              selectedLanguage === "" && selectedGender === ""
                ? No_male
                : selectedLanguage === "Spanish" && selectedGender === "Male"
                  ? No_no_maleSpanish
                  : selectedLanguage === "Spanish" && selectedGender === "Female"
                    ? NoFemaleSpanish
                    : selectedLanguage === "" && selectedGender === "Female"
                      ? NoFemale
                      : selectedLanguage === "" && selectedGender === "Male"
                        ? No_male
                        : selectedLanguage === "English" && selectedGender === "Male"
                          ? No_male
                          : selectedLanguage === "English" && selectedGender === "Female"
                            ? NoFemale
                            : No_male
            );
          }}
        >
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <p className="text-[32px] font-medium text-red-600">NO</p>
            <img src={Close} alt="no" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DecisionCardFeeling;
