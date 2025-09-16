import React, { useState, useEffect } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import PainDiagramBack from "../../Component/Paindiagram/PainDiagramBack";
import { Link } from "react-router-dom";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
const BackPain = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getSetting(
      () => {},
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
        name={
          selectedLanguage === "English"
            ? "where is your pain?"
            : "donde esta tu dolor?"
        }
      />
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper">
          <div className="px-4 my-5 flex justify-center items-center">
            <div className="w-full p-5 bg-white shadow-sm rounded-md">
              <PainDiagramBack selectedLanguage={selectedLanguage} />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default BackPain;
