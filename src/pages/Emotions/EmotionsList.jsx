import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import CardsList from "../../Component/EmotionsCards/CardsList";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";

const EmotionsList = () => {
  const [selectedIconCount, setSelectedIconCount] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      () => {},
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader
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
            name={
              selectedLanguage === "Spanish"
                ? "Emociones/Sentimientos"
                : "Emotions/Feelings"
            }
          />

          <div className="main-wrapper home-wrapper">
            <div
              className={`dashboard-h grid grid-cols-${
                selectedIconCount || 2
              } sm:grid-cols-${selectedIconCount || 3} md:grid-cols-${
                selectedIconCount || 4
              } gap-3.5 px-4 py-1.5 emotion-cards`}
            >
              <CardsList selectedLanguage={selectedLanguage} />
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default EmotionsList;
