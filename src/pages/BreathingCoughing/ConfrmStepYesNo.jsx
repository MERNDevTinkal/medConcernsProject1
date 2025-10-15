import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import BackArrow from "../../assets/images/back-arrow.svg";
import Checked from "../../assets/images/checked.svg";
import Close from "../../assets/images/close.svg";
import { GlobalContext } from "../../context/DiseaseContext";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import EmotionsImg2 from "../../assets/images/emotion-img-02.png";
function ConfrmStepYesNo() {
  const { name, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pathprimary = location.pathname;

  const { updateDisease } = useContext(GlobalContext);

  const [selectedConcers, setSelectedConcers] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [calendarOn, setCalendarOn] = useState("");
  const [loader, setLoader] = useState(true);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const selectedDiseasesArray = diseasesData[`/${name}`] ?? [];
    const selectedFields = selectedDiseasesArray.find((item) => item.id == id);
    setSelectedConcers(selectedFields ?? {});
  }, [name, id]);
  useEffect(() => {
    getSetting(
      () => {},
      () => {},
      setSelectedLanguage,
      setCalendarOn,
      () => {},
      setLoader
    );
  }, []);

  useEffect(() => {
    let text = "";
    if (selectedLanguage === "Spanish" && selectedConcers?.sPrompt) {
      text = selectedConcers.sPrompt;
    } else if (selectedConcers?.Prompt) {
      text = selectedConcers.Prompt;
    } else if (selectedLanguage === "Spanish") {
      text = selectedConcers?.nameEs ?? selectedConcers?.painFeelEs;
    } else {
      text = selectedConcers?.name ?? selectedConcers?.painFeel;
    }
    setDisplayText(text);
  }, [selectedLanguage, selectedConcers]);

  const handleConfrmStepYesNo = async (value, path) => {
    if (value) {
      await getTextToSpeech(
        value,
        selectedLanguage === "Spanish" ? "es-ES" : ""
      );
      updateDisease(pathprimary.replace("/", ""), value);
      if (calendarOn) {
        return navigate("/new-problem");
      }
      if (typeof path === "string") {
        navigate(path);
      } else if (typeof path === "number") {
        navigate(path);
      }
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 bg-white innr-header">
            <div onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
              <img src={BackArrow} alt="Back" />
            </div>
            <h2 className="text-[25px] font-normal text-black text-center">
              {displayText}
            </h2>
            <button></button>
          </div>
          <div className="main-wrapper home-wrapper ">
            <div
              className={`grid grid-cols-1 md:grid-cols-2

              md:px-10 px-5 md:gap-20 gap-5 my-5 items-center`}
            >
              <div className="dashboard-cards rounded-2xl bg-white text-center shadow-sm p-3">
                <div className="dashboard-img rounded-2xl">
                  <img
                    src={
                      selectedConcers.Prompt
                        ? EmotionsImg2
                        : selectedConcers?.image
                    }
                    alt={selectedConcers?.name || "img"}
                    className="w-full rounded-xl"
                  />
                </div>
              </div>
              <div>
                <div className="w-full overflow-hidden decision-cards">
                  <div
                    onClick={() =>
                      handleConfrmStepYesNo(
                        selectedLanguage === "Spanish" ? "Sí" : "YES",
                        selectedConcers?.Prompt
                          ? "/feeling-body"
                          : selectedConcers?.path
                      )
                    }
                  >
                    <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
                      <p className="text-[32px] font-medium text-green-600">
                        {selectedLanguage === "Spanish" ? "Sí" : "YES"}
                      </p>
                      <img src={Checked} alt="yes" />
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      handleConfrmStepYesNo(
                        "NO",
                        selectedConcers?.Prompt ? selectedConcers?.path : -1
                      )
                    }
                  >
                    <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
                      <p className="text-[32px] font-medium text-red-600">NO</p>
                      <img src={Close} alt="no" />
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
