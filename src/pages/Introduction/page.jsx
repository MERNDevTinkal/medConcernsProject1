import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import getSetting from "../../Component/settingApi/settings";

export default function Introduction() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [getAllDiseases, setDiseases] = useState([]);
  const [Introduction, setIntroduction] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

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
      <Header
        selectedLanguage={selectedLanguage}
        name={selectedLanguage === "Spanish" ? "Introducción" : "Introduction"}
      />
      <div className="main-wrapper home-wrapper">
        <div className="Intro_box">
          <div className="min-h-screen  px-4">
            <img src="/newlogo_4.png" width={400} className="m-auto" />
            <div className="w-full m-auto mt-3 px-12">
              <label className="block text-2xl font-bold mb-2">
                My name is
              </label>
              <input
                type="text"
                className="w-full p-4 text-xl rounded-lg border border-gray-300 mb-6"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />

              <label className="block text-2xl font-bold mb-2">I am a</label>
              <input
                type="text"
                className="w-full p-4 text-xl rounded-lg border border-gray-300"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter your role"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
