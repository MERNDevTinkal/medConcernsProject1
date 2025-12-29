import React, {  useEffect, useState } from "react";
import DecisionCard from "../../Component/ProblemCard/DecisionCard";
import Footer from "../../Component/Layout/Footer/Footer";
import { useLocation } from "react-router-dom";
import Header from "../../Component/Layout/Header/Header";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
const NewProblem = () => {
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [IntroductionOn, setIntroductionOn] = React.useState("");
  const [CalendarOn, setCalendarOn] = React.useState("");
  useEffect(() => {
    getSetting(
      () => { },
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => { },
      () => { },
      () => { },
      () => { }
    );
  }, []);

  const translations = {
    English: {
      newProblem: "Is this a new problem?",
      overall: "How do you feel overall?",
    },
    "": {
      newProblem: "Is this a new problem?",
      overall: "How do you feel overall?",
    },
    Spanish: {
      newProblem: "¿Es este un problema nuevo?",
      overall: "¿Cómo se siente en general?",
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
            introductionOn={IntroductionOn}
            calendarOn={CalendarOn}
            name={
              location.pathname === "/yes-no-concerns" || location.pathname === "/yes-no"
                ? ""
                : location.pathname === "/new-problem"
                  ? !selectedLanguage
                    ? translations["English"]?.newProblem
                    : translations[selectedLanguage]?.newProblem ||
                    translations["English"]?.newProblem
                  : translations[selectedLanguage]?.overall ||
                  translations["English"]?.overall
            }
          />

          <div className="main-wrapper home-wrapper ">
            <div className="px-10 my-10 sm:px-5 ">
              <DecisionCard
                selectedGender={selectedGender}
                selectedLanguage={selectedLanguage}
              />
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default NewProblem;
