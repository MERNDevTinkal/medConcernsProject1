import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
export default function PatientEducation() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [IntroductionOn, setIntroductionOn] = React.useState("");
  const [CalendarOn, setCalendarOn] = React.useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getSetting(
      () => {},
      () => {},
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => {},
      () => {}
    );
  }, [loader]);
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
              selectedLanguage === "Spanish"
                ? "PacienteEducación"
                : "PatientEducation"
            }
          />
          <div className="main-wrapper home-wrapper">
            {selectedLanguage === "Spanish" ? (
              <>
                <img src="/patient_education_sp_1.png" className="w-full" />
                <img src="/patient_education_sp_2.png" className="w-full" />
                <img src="/patient_education_sp_3.png" className="w-full" />
                <img src="/patient_education_sp_4.png" className="w-full" />
              </>
            ) : (
              <>
                <img src="/patient_education_1.png" className="w-full" />
                <img src="/patient_education_2.png" className="w-full" />
                <img src="/patient_education_3.png" className="w-full" />
                <img src="/patient_education_4.png" className="w-full" />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
