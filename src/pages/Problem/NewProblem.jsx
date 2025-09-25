import React, { useEffect, useState } from "react";
import BackArrow from "../../assets/images/back-arrow.svg";
import NextArrow from "../../assets/images/next-arrow.svg";
import DecisionCard from "../../Component/ProblemCard/DecisionCard";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../Component/Layout/Header/Header";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";

const NewProblem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
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

  const translations = {
    English: {
      newProblem: "Is this a new problem",
      overall: "How do you feel overall?",
    },
    "": {
      newProblem: "Is this a new problem",
      overall: "How do you feel overall?",
    },
    Spanish: {
      newProblem: "¿Es este un problema nuevo?",
      overall: "¿Cómo te sientes en general?",
    },
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            name={
              location.pathname === "/new-problem"
                ? !selectedLanguage
                  ? translations["English"]?.newProblem
                  : translations[selectedLanguage]?.newProblem ||
                    translations["English"]?.newProblem
                : translations[selectedLanguage]?.overall ||
                  translations["English"]?.overall
            }
          />

          <div className="main-wrapper home-wrapper ">
            <div className="px-10 my-10">
              <DecisionCard selectedLanguage={selectedLanguage} />
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default NewProblem;
