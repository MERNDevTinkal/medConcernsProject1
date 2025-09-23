import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import getSetting from "../../Component/settingApi/settings";

export default function Aboutus() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [getAllDiseases, setDiseases] = useState([]);

  useEffect(() => {
    setDiseases(diseasesData[location.pathname]);
  }, [location?.pathname]);

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
      <Header name={selectedLanguage === "Spanish" ? "" : "About us"} />
      <div className="main-wrapper bg-white">
        <img src="/about_mg.jpg" className="ml-auto rounded-4xl mb-4 " />
        <p className="text-[18px] font-medium color-black mb-0 text-center">
          Our mission is to empower patients to regain their voice and autonomy
          by supporting their communication needs. Our app makes assessing
          medical concerns in people with aphasia easier and more accurate by
          incorporating evidence-based aphasia communication techniques. The
          Patient's Bill of Rights requires that patients understand and are
          involved with their care. This requires clear communication on both
          sides, an obvious challenge with communication disorders. The Medical
          Concerns app enables providers to communication disorders. The Medical
          Concerns app enables providers to uphold patient rights in these
          difficult situations. The Medical Concerns App was jointly developed
          by a speech language pathologist and physician who work regularly with
          brain injury, stroke, and other diagnoses that often result in
          communication difficulties. Through our combined experience, we
          recognized a need to support our fellow healthcare providers and our
          patients in communicating clearly regarding medical concerns. Research
          shows healthcare providers have a strong desire to communicate with
          these patients, but are frequently frustrated by the limitations of
          verbal communication and simple communication boards. Together we set
          off on a path to bridge this gap, and Communication Rescue Services
          was created.
        </p>
      </div>
    </>
  );
}
