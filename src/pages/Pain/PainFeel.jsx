import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import PainCardsList from "./PainCardsList";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
const PainFeel = () => {
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
      <Header
        selectedLanguage={selectedLanguage}
        name={
          selectedLanguage === "English"
            ? "How does your pain feel?"
            : "¿Cómo se siente tu dolor?"
        }
      />
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper">
          <div
            className={`dashboard-h grid grid-cols-${
              selectedIconCount || 2
            } sm:grid-cols-${selectedIconCount || 3} md:grid-cols-${
              selectedIconCount || 3
            } gap-3.5 px-4 py-1.5 emotion-cards`}
          >
            <PainCardsList selectedLanguage={selectedLanguage} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default PainFeel;
