import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import { Checked, Close, BackArrow } from "../../Component/DiseasesData/images";
import { GlobalContext } from "../../context/DiseaseContext";
import {
  diseasesData,
  breathingWhenOptions,
} from "../../Component/DiseasesData/diseasesData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import Cookies from "js-cookie";
import {
  YesFemale,
  femaleNoSpanish,
  YesFemaleSpanish,
  NoFemale,
  NoFemaleSpanish,
  YesSpanishMale,
  YesMale,
  No_male,
  No_no_maleSpanish,
} from "../../../src/Component/DiseasesData/audio";
function ConfrmStepYesNo() {
  const { name, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { value, scalepath } = location?.state || {};
  const pathprimary = location.pathname;
  const isSpeakingRef = useRef(false);
  const { updateDisease } = useContext(GlobalContext);
  const [selectedConcers, setSelectedConcers] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [calendarOn, setCalendarOn] = useState("");
  const [loader, setLoader] = useState(true);
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    const selectedDiseasesArray = pathprimary?.includes(
      "/when/confrm-step-yesno",
    )
      ? breathingWhenOptions
      : (diseasesData[`/${name}`] ?? []);
    const selectedFields = selectedDiseasesArray.find((item) => item.id == id);
    setSelectedConcers(selectedFields ?? {});
  }, [name, id]);
  useEffect(() => {
    getSetting(
      () => {},
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      () => {},
      setLoader,
      () => {},
      () => {},
      () => {},
      () => {},
    );
  }, []);

  useEffect(() => {
    let text = "";
    if (selectedLanguage === "Spanish") {
      text = selectedConcers?.nameEs ?? selectedConcers?.painFeelEs;
    } else {
      text = selectedConcers?.name ?? selectedConcers?.painFeel;
    }
    setDisplayText(text);
  }, [selectedLanguage, selectedConcers]);

  const handleConfrmStepYesNo = async (valueData, path, audio) => {
    if (valueData && (audio || value?.audio)) {
      if (isSpeakingRef.current) return;
      isSpeakingRef.current = true;
      await getTextToSpeech(
        valueData,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        audio,
      );
      if (Cookies.get("is_calendra") === "yes") {
        return navigate("/howoften");
      }
      if (
        valueData !== "NO" &&
        Cookies.get("is_pain_flow") === "Yes" &&
        pathprimary.includes("/feeling-list-pain/confrm-step-yesno")
      ) {
        return navigate("/when");
      }

      if (valueData === "NO") {
        return navigate(-1);
      }

      updateDisease(pathprimary, valueData);
      if (scalepath === "/mood-scale") {
        return navigate("/feeling-body");
      }
      if (
        pathprimary.includes("medicationHardtoSwallow-problem") ||
        pathprimary.includes("when/confrm-step-yesno")
      ) {
        return navigate("/howoften");
      }
      if (
        !pathprimary.includes("/feel/confrm-step-yesno") &&
        !pathprimary.includes("/feeling-body/confrm-step-yesno") &&
        path === "/howoften" &&
        calendarOn
      ) {
        return navigate("/new-problem");
      }
      if (typeof path === "string") {
        const noNewProblemPaths = [
          "/visionGlasses-problem/confrm-step-yesno/1",
          "/visionGlasses-problem/confrm-step-yesno/2",
        ];
        return navigate(
          path,
          noNewProblemPaths.includes(pathprimary)
            ? { state: { pathValue: "noNewProblem" } }
            : { state: { name: displayText ?? value?.name } },
        );
      } else if (typeof path === "number") {
        return navigate(path, { state: value });
      } else if (value?.audio) {
        return navigate("/summary");
      }
      isSpeakingRef.current = false;
    }
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between py-4 fixed left-0 right-0 bg-white innr-header">
            <div onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
              <img src={BackArrow} alt="Back" />
            </div>
            <h2 className="text-[30px] font-medium text-black text-center">
              {displayText ?? value?.name}
            </h2>
            <button className="opacity-0">Medconcern</button>
          </div>
          <div className="main-wrapper home-wrapper items-center justify-center flex flex-col">
            <div
              className={`grid grid-cols-2 md:gap-18 gap-5 my-5 items-center common-scale mt-12`}
            >
              <div className="dashboard-cards brthng-card rounded-2xl bg-white text-center shadow-sm p-3">
                <div className="dashboard-img rounded-2xl h-full w-full">
                  <div className="h-full w-full">
                    <img
                      src={selectedConcers?.image ?? value?.image}
                      alt={selectedConcers?.name || "img"}
                      className={`rounded-xl w-full h-full ${
                        pathprimary.includes(
                          "/feeling-list-pain/confrm-step-yesno",
                        ) ||
                        pathprimary.includes("/feeling/confrm-step-yesno") ||
                        pathprimary.includes("/feel/confrm-step-yesno")
                          ? "objct-cls"
                          : "object-cover"
                      } `}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="w-full overflow-hidden decision-cards">
                  <div
                    onClick={() =>
                      handleConfrmStepYesNo(
                        selectedLanguage === "Spanish" ? "SÍ" : "YES",
                        selectedConcers?.Prompt
                          ? selectedConcers?.path
                          : selectedConcers?.path,
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
                                : selectedLanguage === "" &&
                                    selectedGender === "Male"
                                  ? YesMale
                                  : selectedLanguage === "English" &&
                                      selectedGender === "Male"
                                    ? YesMale
                                    : selectedLanguage === "English" &&
                                        selectedGender === "Female"
                                      ? YesFemale
                                      : YesMale,
                      )
                    }
                  >
                    <div className="custom-wdth flex items-center justify-between p-4 px-10 border-3 border-white bg-white rounded-[10px] mb-5 cursor-pointer hover:border-blue-600 transition-colors duration-300">
                      <p className="text-[40px] font-medium text-green-600">
                        {selectedLanguage === "Spanish" ? "SÍ" : "YES"}
                      </p>
                      <img src={Checked} width="50px" alt="yes" />
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      handleConfrmStepYesNo(
                        "NO",
                        selectedConcers?.Prompt
                          ? selectedConcers?.path
                          : selectedConcers?.path,
                        selectedLanguage === "" && selectedGender === ""
                          ? No_male
                          : selectedLanguage === "Spanish" &&
                              selectedGender === "Male"
                            ? No_no_maleSpanish
                            : selectedLanguage === "Spanish" &&
                                selectedGender === "Female"
                              ? femaleNoSpanish
                              : selectedLanguage === "" &&
                                  selectedGender === "Female"
                                ? NoFemale
                                : selectedLanguage === "" &&
                                    selectedGender === "Male"
                                  ? No_male
                                  : selectedLanguage === "English" &&
                                      selectedGender === "Male"
                                    ? No_male
                                    : selectedLanguage === "English" &&
                                        selectedGender === "Female"
                                      ? NoFemale
                                      : No_male,
                      )
                    }
                  >
                    <div className="custom-wdth flex items-center justify-between p-4 px-10 border-3 border-white bg-white rounded-[10px] mt-5 cursor-pointer hover:border-blue-600 transition-colors duration-300">
                      <p className="text-[40px] font-medium text-red-600">NO</p>
                      <img src={Close} width="50px" alt="no" />
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

export default ConfrmStepYesNo;
