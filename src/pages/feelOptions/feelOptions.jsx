import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import { GlobalContext } from "../../context/DiseaseContext";
import Cookies from "js-cookie";
import {dashimghow25,Checked,Close,BackArrow} from "../../Component/DiseasesData/images";
import {
  YesFemale,
  YesFemaleSpanish,
  NoFemale,
  NoFemaleSpanish,
  YesSpanishMale,
  YesMale,
  No_male,
  No_no_maleSpanish,
  MaybeFemale,
  MaybeMale,
  TalVezFemaleSpanish,
  TalVezMaleSpanish,
} from "../../../src/Component/DiseasesData/audio";
import { MoveRight } from "lucide-react";
function EmotionScreen() {
  const isSpeakingRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mainPath = location.pathname;
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [getQuestions, setQuestions] = useState({});
  const { addOrUpdateSummary } = useContext(GlobalContext);
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
  }, []); // runs once

  useEffect(() => {
    if (mainPath.includes("/feelOptions")) {
      const questionsList = diseasesData["/feelOptions"] ?? [];
      if (id) {
        const questionAndAns = questionsList.find((item) => item.id == id);
        setQuestions(questionAndAns ?? {});
      }
      setLoader(false);
    }
  }, [id, mainPath]);

  const handleRoutes = async (item, value, audio) => {
    if (item) {
      if (isSpeakingRef.current) return;
      isSpeakingRef.current = true;
      await getTextToSpeech(
        value,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        audio
      );
      item.decision = value;
      setLoader(true);
      const isConcern = Cookies.get("is_concern");
      const prefix =
        isConcern && isConcern?.includes("true_")
          ? isConcern + "/" + mainPath
          : mainPath;
      addOrUpdateSummary(prefix, [item]);
      navigate(
        parseInt(id) === 5
          ? "/feeling-body"
          : `/feelOptions/${parseInt(id) + 1}`
      );
      isSpeakingRef.current = false;
    }
  };

  const handleSkip = () => {
    navigate("/feeling-body");
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
            <div
              onClick={() => {
                navigate(-1);
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={BackArrow} />
            </div>
            <h2 className="text-[25px] font-normal text-black text-center">
              {selectedLanguage === "Spanish"
                ? getQuestions?.nameEs || ""
                : getQuestions?.name || ""}
            </h2>
            <button></button>
          </div>
          <div className="main-wrapper home-wrapper ">
            <div className="">
              <div className="dashboard-cards rounded-2xl bg-white text-center shadow-sm p-3 depressed-cards">
                <div className="dashboard-img rounded-2xl">
                  <img
                    src={getQuestions?.image || ""}
                    alt={getQuestions?.name || "alt"}
                    className="mx-auto rounded-xl "
                  />
                </div>
              </div>
              <div>
                <div className="grid grid-cols-3 gap-8">
                  <div
                    onClick={() => {
                      handleRoutes(
                        getQuestions,
                        selectedLanguage === "Spanish" ? "Sí" : "YES",
                        selectedLanguage === "" && selectedGender === ""
                          ? YesMale
                          : selectedLanguage === "Spanish" &&
                            selectedGender === "Male"
                          ? YesSpanishMale
                          : selectedLanguage === "Spanish" &&
                            selectedGender === "Female"
                          ? YesFemaleSpanish
                          : selectedLanguage === "" &&
                            selectedGender === "Female"
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
                      handleRoutes(
                        getQuestions,
                        "NO",
                        selectedLanguage === "" && selectedGender === ""
                          ? No_male
                          : selectedLanguage === "Spanish" &&
                            selectedGender === "Male"
                          ? No_no_maleSpanish
                          : selectedLanguage === "Spanish" &&
                            selectedGender === "Female"
                          ? NoFemaleSpanish
                          : selectedLanguage === "" &&
                            selectedGender === "Female"
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
                    <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
                      <div className="flex items-center">
                        <p className="text-[32px] font-medium text-red-600">
                          NO
                        </p>
                      </div>
                      <div>
                        <img src={Close} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => {
                        handleRoutes(
                          getQuestions,
                          selectedLanguage === "Spanish" ? "tal vez" : "Maybe",

                          selectedLanguage === "" && selectedGender === ""
                            ? MaybeMale
                            : selectedLanguage === "Spanish" &&
                              selectedGender === "Male"
                            ? TalVezMaleSpanish
                            : selectedLanguage === "Spanish" &&
                              selectedGender === "Female"
                            ? TalVezFemaleSpanish
                            : selectedLanguage === "" &&
                              selectedGender === "Female"
                            ? MaybeFemale
                            : selectedLanguage === "" &&
                              selectedGender === "Male"
                            ? MaybeMale
                            : selectedLanguage === "English" &&
                              selectedGender === "Male"
                            ? MaybeMale
                            : selectedLanguage === "English" &&
                              selectedGender === "Female"
                            ? MaybeFemale
                            : MaybeMale
                        );
                      }}
                      className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300"
                    >
                      <div className="flex items-center">
                        <p className="maybe-text text-[32px] font-medium ">
                          MAYBE
                        </p>
                      </div>
                      <div>
                        <img width="40" height="40" src={dashimghow25} />
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        handleSkip();
                      }}
                      className="mt-6 text-end"
                    >
                      <p
                        style={{ cursor: "pointer" }}
                        className="text-[20px] font-medium text-gray-600 flex items-center gap-2 justify-end"
                      >
                        Skip Questions <MoveRight />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default EmotionScreen;
