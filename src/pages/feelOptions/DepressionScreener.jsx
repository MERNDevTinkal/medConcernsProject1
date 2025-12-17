import React, { useEffect, useState, useContext } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { Checked, Close } from "../../Component/DiseasesData/images";
import { useNavigate } from "react-router-dom";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import { GlobalContext } from "../../context/DiseaseContext";
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
function DepressionScreener() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  const [loader, setLoader] = useState(true);
  const { updateDisease } = useContext(GlobalContext);
  useEffect(() => {
    getSetting(
      () => {},
      setSelectedGender,
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader,
      () => {},
      () => {},
      () => {},
      () => {}
    );
  }, []);

  const handleConfrmStepWhen = async (value, path, audio) => {
    if (value && path) {
      await getTextToSpeech(
        value,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        audio
      );
      updateDisease(path, value);
      navigate(path);
    }
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="main-wrapper home-wrapper depression-screener-wrapper">
            <div className="feel-overall-card questions-cards">
              <h3 className="text-center">
                {selectedLanguage === "Spanish"
                  ? "¿Responde más preguntas sobre cómo te sientes?"
                  : "Answer more questions about how you feel?"}
              </h3>
              <div
                className="flex items-center justify-between p-4 px-10 border-3 border-white bg-white rounded-[20px] mb-5 cursor-pointer hover:border-blue-600 transition-colors duration-300"
                onClick={() => {
                  handleConfrmStepWhen(
                    selectedLanguage === "Spanish" ? "SÍ" : "YES",
                    "/feelOptions/1",
                    selectedLanguage === "" && selectedGender === ""
                      ? YesMale
                      : selectedLanguage === "Spanish" &&
                        selectedGender === "Male"
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
                      : YesMale
                  );
                }}
              >
                <div>
                  <p className="text-[40px]  font-medium text-green-600">
                    {selectedLanguage === "Spanish" ? "SÍ" : "YES"}
                  </p>
                </div>
                <div>
                  <img src={Checked} alt="" className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-3xl font-bold">
                    {selectedLanguage === "Spanish" ? "Continuar" : "Continue"}
                  </span>
                </div>
              </div>
              <div
                className="flex items-center justify-between p-4 px-16 border-3 border-white bg-white rounded-[20px] mb-5 cursor-pointer hover:border-blue-600 transition-colors duration-300"
                onClick={() => {
                  handleConfrmStepWhen(
                    "NO",
                    "/summary",
                    selectedLanguage === "" && selectedGender === ""
                      ? No_male
                      : selectedLanguage === "Spanish" &&
                        selectedGender === "Male"
                      ? No_no_maleSpanish
                      : selectedLanguage === "Spanish" &&
                        selectedGender === "Female"
                      ? NoFemaleSpanish
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
                      : No_male
                  );
                }}
              >
                <div>
                  <p className="text-[40px] font-medium text-red-600">
                    {selectedLanguage === "Spanish" ? "NO" : "NO"}
                  </p>
                </div>
                <div>
                  <img src={Close} alt="" className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-3xl font-bold">
                    {selectedLanguage === "Spanish" ? "Saltar" : "Skip"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default DepressionScreener;
