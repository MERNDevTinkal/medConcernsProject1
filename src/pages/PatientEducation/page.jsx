import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import getSetting from "../../Component/settingApi/settings";

export default function PatientEducation() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getSetting(
      () => {},
      () => {},
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader,
      () => {},
      () => {}
    );
  }, [loader]);
  return (
    <>
      <Header name={selectedLanguage === "Spanish" ? "" : "PatientEducation"} />
      <div className="main-wrapper bg-white">
        <img src="/patient_education_1.png" />
        <img src="/patient_education_2.png" />
        <img src="/patient_education_3.png" />
        <img src="/patient_education_4.png" />
      </div>
    </>
  );
}
