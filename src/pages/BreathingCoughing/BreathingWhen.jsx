import React, { useContext, useEffect, useState, useRef } from "react";
import Header from "../../Component/Layout/Header/Header";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import { GlobalContext } from "../../context/DiseaseContext";
import { breathingWhenOptions } from "../../Component/DiseasesData/diseasesData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
import Cookies from "js-cookie";

const BreathingWhen = () => {
  const [selectedIconCount, setSelectedIconCount] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [selectedGender, setSelectedGender] = React.useState("");
  const [IntroductionOn, setIntroductionOn] = React.useState("");
  const [CalendarOn, setCalendarOn] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const pathprimary = location.pathname;
  const isSpeakingRef = useRef(false);

  const { addOrUpdateSummary } = useContext(GlobalContext);
  const handleBreathingWhen = async (value, path) => {
    if (value && path) {
      if (isSpeakingRef.current) return;
      isSpeakingRef.current = true;
      const audioDefault =
        selectedLanguage === "" && selectedGender === ""
          ? value?.maleEnglish
          : selectedLanguage === "Spanish" && selectedGender === "Male"
            ? value?.maleSpanish
            : selectedLanguage === "Spanish" && selectedGender === "Female"
              ? value?.femaleSpanish
              : selectedLanguage === "" && selectedGender === "Female"
                ? value?.femaleEnglish
                : selectedLanguage === "" && selectedGender === "Male"
                  ? value?.maleEnglish
                  : selectedLanguage === "English" && selectedGender === "Male"
                    ? value?.maleEnglish
                    : selectedLanguage === "English" &&
                        selectedGender === "Female"
                      ? value?.femaleEnglish
                      : value?.maleEnglish;
      await getTextToSpeech(
        selectedLanguage === "Spanish" ? value.nameEs : value.name,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        audioDefault,
      );
      const isConcern = Cookies.get("is_concern");
      const prefix =
        isConcern && isConcern?.includes("true_")
          ? isConcern + "/" + pathprimary
          : pathprimary;
      addOrUpdateSummary(prefix, [value]);
      navigate(path);
      isSpeakingRef.current = false;
    }
  };
  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
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
            introductionOn={IntroductionOn}
            calendarOn={CalendarOn}
            name={selectedLanguage === "Spanish" ? "¿Cuando?" : "When?"}
          />

          <div className="main-wrapper home-wrapper pt-20">
            <div
              className="dashboard-h grid gap-3 p-3 px-0"
              style={{
                gridTemplateColumns:
                  selectedIconCount === 6
                    ? "repeat(3, 1fr)"
                    : `repeat(${selectedIconCount || 2}, 1fr)`,
                gridTemplateRows:
                  selectedIconCount === 6 ? "repeat(2, 1fr)" : "auto",
              }}
            >
              {breathingWhenOptions?.length > 0 &&
                breathingWhenOptions?.map((item, index) => (
                  <div
                    className={
                      selectedIconCount === 1
                        ? "dash-single-items"
                        : selectedIconCount === 2
                          ? "dash-double-items"
                          : selectedIconCount === 3
                            ? "dash-triple-items"
                            : selectedIconCount === 4
                              ? "dash-quadriple-items"
                              : selectedIconCount === 6
                                ? "dash-hexuple-items"
                                : ""
                    }
                    style={{ cursor: "pointer" }}
                    key={item.id}
                    onClick={() => {
                      handleBreathingWhen(
                        item,
                        `/when/confrm-step-yesno/${item?.id}`,
                      );
                    }}
                  >
                    <div
                      className={`dashboard-cards rounded-2xl bg-white text-center pb-0.5 ${
                        (selectedLanguage === "Spanish"
                          ? item?.nameEs
                          : item?.name
                        )?.length > 18
                          ? "shirnk-card"
                          : ""
                      }`}
                    >
                      <div className="dashboard-img card-img-h rounded-2xl">
                        <img
                          style={{
                            height: selectedIconCount === 6 ? "" : "",
                          }}
                          src={item.image}
                          className="w-full"
                        />
                      </div>

                      <p className={`text-[16px] mt-3 mb-2 color-black `}>
                        {selectedLanguage === "Spanish"
                          ? item.nameEs
                          : item.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default BreathingWhen;
