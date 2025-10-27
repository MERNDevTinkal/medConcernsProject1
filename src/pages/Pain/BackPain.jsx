import React, { useState, useEffect } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import PainDiagramBack from "../../Component/Paindiagram/PainDiagramBack";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
const BackPain = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getSetting(
      () => {},
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
                ? "¿Dónde está su dolor?"
                : "where is your pain?"
            }
          />

          <div className="main-wrapper home-wrapper">
            <div className="px-4 my-5 flex justify-center items-center">
              <div className="w-full p-5 bg-white shadow-sm rounded-md">
                <PainDiagramBack
                  selectedGender={selectedGender}
                  selectedLanguage={selectedLanguage}
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

export default BackPain;
