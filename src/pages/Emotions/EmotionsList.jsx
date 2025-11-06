import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import CardsList from "../../Component/EmotionsCards/CardsList";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";

const EmotionsList = () => {
  const [selectedIconCount, setSelectedIconCount] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [calendarOn, setCalendarOn] = React.useState("");
  const [introductionOn, setIntroductionOn] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [selectedGender, setSelectedGender] = React.useState("");

  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => {},
      () => {},
      () => {},
      () => {}
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
                ? "¿Cómo te sientes?"
                : "How do you feel ?"
            }
          />

          <div className="main-wrapper home-wrapper ">
            <div className="dashboard-wrapper px-4 py-1.5">
              <div
                className="dashboard-h grid gap-3 p-3"
                style={{
                  gridTemplateColumns:
                    selectedIconCount === 6
                      ? "repeat(3, 1fr)" // 3 per row
                      : `repeat(${selectedIconCount || 2}, 1fr)`,
                  gridTemplateRows:
                    selectedIconCount === 6 ? "repeat(2, 1fr)" : "auto",
                }}
              >
                <CardsList
                  selectedGender={selectedGender}
                  selectedLanguage={selectedLanguage}
                  selectedIconCount={selectedIconCount}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default EmotionsList;
