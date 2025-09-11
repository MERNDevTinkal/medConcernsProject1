import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import CardsList from "../../Component/EmotionsCards/CardsList";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
const EmotionsList = () => {
  const [selectedIconCount, setSelectedIconCount] = React.useState(0);
  const [selectedGender, setSelectedGender] = React.useState("Female");
  const [selectedLanguage, setSelectedLanguage] = React.useState("Spanish");
  const [calendarOn, setCalendarOn] = React.useState(true);
  const [introductionOn, setIntroductionOn] = React.useState(true);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader
    );
  }, []);
  return (
    <>
      <Header name={"Emotions/Feelings"} />
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper">
          <div
            className={`dashboard-h grid grid-cols-${
              selectedIconCount || 2
            } sm:grid-cols-${selectedIconCount || 3} md:grid-cols-${
              selectedIconCount || 4
            } gap-3.5 px-4 py-1.5 emotion-cards`}
          >
            <CardsList />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default EmotionsList;
