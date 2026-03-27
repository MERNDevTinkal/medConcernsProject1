import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Checked, Close } from "../../Component/DiseasesData/images";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import {
  YesFemale,
  YesFemaleSpanish,
  NoFemale,
  NoFemaleSpanish,
  YesSpanishMale,
  YesMale,
  No_male,
  No_no_maleSpanish,
  femaleNoSpanish,
} from "../../../src/Component/DiseasesData/audio";

const YesNo = ({ id, fatigueValue, selectedGender, selectedLanguage }) => {
  const navigate = useNavigate();
  const { updateDisease } = useContext(GlobalContext);
  console.log("===>",)
  const handleYesNo = async (value, path, audio) => {
    if (value && path) {
      await getTextToSpeech(
        value,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        audio,
      );
      updateDisease("yesno", value);
      navigate(fatigueValue && fatigueValue !== null ? `/summary` : path);
    }
  };
  return (
    <div>
      <div className="w-full overflow-hidden decision-cards">
        <div
          onClick={() => {
            handleYesNo(
              selectedLanguage === "Spanish" ? "SÍ" : "YES",
              "/concern",
              selectedLanguage === "" && selectedGender === ""
                ? YesMale
                : selectedLanguage === "Spanish" && selectedGender === "Male"
                  ? YesSpanishMale
                  : selectedLanguage === "Spanish" &&
                    selectedGender === "Female"
                    ? YesFemaleSpanish
                    : selectedLanguage === "" && selectedGender === "Female"
                      ? YesFemale
                      : selectedLanguage === "" && selectedGender === "Male"
                        ? YesMale
                        : selectedLanguage === "English" &&
                          selectedGender === "Male"
                          ? YesMale
                          : selectedLanguage === "English" &&
                            selectedGender === "Female"
                            ? YesFemale
                            : YesMale,
            );
          }}
          className=""
        >
          <div className="custom-wdth flex items-center justify-between p-4 px-16 border-3 border-white bg-white rounded-[10px] mb-5 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[40px] font-medium text-green-600">
                {selectedLanguage === "Spanish" ? "SÍ" : "YES"}
              </p>
            </div>
            <div>
              <img src={Checked} width="50" alt="" />
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            handleYesNo(
              "NO",
              -1,
              selectedLanguage === "" && selectedGender === ""
                ? No_male
                : selectedLanguage === "Spanish" && selectedGender === "Male"
                  ? No_no_maleSpanish
                  : selectedLanguage === "Spanish" &&
                    selectedGender === "Female"
                    ? femaleNoSpanish
                    : selectedLanguage === "" && selectedGender === "Female"
                      ? NoFemale
                      : selectedLanguage === "" && selectedGender === "Male"
                        ? No_male
                        : selectedLanguage === "English" &&
                          selectedGender === "Male"
                          ? No_male
                          : selectedLanguage === "English" &&
                            selectedGender === "Female"
                            ? NoFemale
                            : No_male,
            );
          }}
        >
          <div className="custom-wdth flex items-center justify-between p-4 px-16 border-3 border-white bg-white rounded-[10px] mt-5 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[40px] font-medium text-red-600">NO</p>
            </div>
            <div>
              <img src={Close} width="40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YesNo;
