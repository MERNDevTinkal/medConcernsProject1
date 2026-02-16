import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import Footer from "../../Component/Layout/Footer/Footer";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import Header from "../../Component/Layout/Header/Header";
import Cookies from "js-cookie";

const Feel = () => {
  const isSpeakingRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [emotionsicons, setEmotionsicons] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [selectedGender, setSelectedGender] = React.useState("");
  const [calendarOn, setCalendarOn] = React.useState("");
  const [introductionOn, setIntroductionOn] = React.useState("");
  let mainpath = location.pathname;
  const { addOrUpdateSummary } = useContext(GlobalContext);
  useEffect(() => {
    if (mainpath === "/emotions" || mainpath === "/mood-scale") {
      mainpath = "/feel";
    }
    setEmotionsicons(diseasesData[mainpath]);
  }, [mainpath]);
  const handleRoutes = async (item, path) => {
    if (isSpeakingRef.current) return;
    isSpeakingRef.current = true;
    if (!item && !path) {
      return;
    }
    await getTextToSpeech(
      selectedLanguage === "Spanish" ? item?.nameEs : item?.name,
      selectedLanguage === "Spanish" ? "es-ES" : "",
      selectedLanguage === "" && selectedGender === ""
        ? item?.maleEnglish
        : selectedLanguage === "Spanish" && selectedGender === "Male"
          ? item?.maleSpanish
          : selectedLanguage === "Spanish" && selectedGender === "Female"
            ? item?.femaleSpanish
            : selectedLanguage === "" && selectedGender === "Female"
              ? item?.femaleEnglish
              : selectedLanguage === "" && selectedGender === "Male"
                ? item?.maleEnglish
                : selectedLanguage === "English" && selectedGender === "Male"
                  ? item?.maleEnglish
                  : selectedLanguage === "English" &&
                      selectedGender === "Female"
                    ? item?.femaleEnglish
                    : item?.maleEnglish,
    );
    const isConcern = Cookies.get("is_concern");
    const prefix =
      isConcern && isConcern?.includes("true_")
        ? isConcern + "/" + mainpath
        : mainpath;
    addOrUpdateSummary(prefix, [item]);
    navigate(mainpath === "/emotions" ? path : path, {
      state: { scalepath: location?.pathname },
    });
    isSpeakingRef.current = false;
  };
  useEffect(() => {
    getSetting(
      () => {},
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => {},
      () => {},
      () => {},
      () => {},
    );
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            calendarOn={calendarOn}
            introductionOn={introductionOn}
            name={
              selectedLanguage === "Spanish"
                ? "¿Cómo se siente en general?"
                : "How do you feel overall?"
            }
          />
          <div className="main-wrapper home-wrapper ">
            <div className="dashboard-wrapper px-4 py-1.5 pt-4 feel-list-main">
              {/* <ul className="flex flex-col gap-10 feel-list relative before:content-[''] before:absolute before:left-[50px] before:top-0 before:h-full before:w-[27px] before:bg-[linear-gradient(180deg,_#7ebe01_0%,_#fbcc00_25%,_#fbcc00_37.5%,_#f78d11_50%,_#f78d11_75%,_#f36218_87.5%,_#e92f1a_100%)]">
                {emotionsicons.map((item) => (
                  <li
                    key={item?.id}
                    onClick={() => {
                      handleRoutes(item, item.secPath);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex gap-12 items-center">
                      <img src={item?.image} className="w-30" alt="" />
                      <span className="text-[40px] font-medium color-black">
                        {selectedLanguage === "Spanish"
                          ? item?.nameEs
                          : item?.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul> */}
              <div className="feel-overall-card ">
                {/* <h3 className="text-center">How do you feel overall?</h3> */}
                <ul className="feel-overall-list">
                  {emotionsicons.map((item) => (
                    <li
                      className="feel-overall-list-item"
                      key={item?.id}
                      onClick={() => {
                        handleRoutes(item, item.secPath);
                      }}
                    >
                      <img src={item?.image} alt="" />
                      <span>
                        {selectedLanguage === "Spanish"
                          ? item?.nameEs
                          : item?.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Feel;
