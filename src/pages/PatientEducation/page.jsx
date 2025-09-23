import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import getSetting from "../../Component/settingApi/settings";

export default function PatientEducation() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [getAllDiseases, setDiseases] = useState([]);
  const [PatientEducation, setPatientEducation] = useState(null);

  useEffect(() => {
    setDiseases(diseasesData[location.pathname]);
  }, [location?.pathname]);

  useEffect(() => {
    getSetting(
      () => {},
      () => {},
      () => {},
      setLoader,
      () => {},
      setPatientEducation
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
