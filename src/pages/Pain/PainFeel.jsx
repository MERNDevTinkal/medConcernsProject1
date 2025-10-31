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
  const [selectedGender, setSelectedGender] = React.useState("");
  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      setSelectedGender,
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
                ? "¿Cómo se siente tu dolor?"
                : "How does your pain feel?"
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
                <PainCardsList
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

export default PainFeel;
