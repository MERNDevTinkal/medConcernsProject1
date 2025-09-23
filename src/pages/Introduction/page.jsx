import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import getSetting from "../../Component/settingApi/settings";

export default function Introduction() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [IntroductionOn, setIntroductionOn] = React.useState("");
  const [CalendarOn, setCalendarOn] = React.useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

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
      <Header
        selectedLanguage={selectedLanguage}
        IntroductionOn={IntroductionOn}
        CalendarOn={CalendarOn}
        name={selectedLanguage === "Spanish" ? "Introducción" : "Introduction"}
      />

      <div className="main-wrapper home-wrapper">
        <div className="Intro_box">
          <div className="min-h-screen px-4">
            <img src="/newlogo_4.png" width={400} className="m-auto" />
            <div className="w-full m-auto mt-3 px-12">
              {/* Label for name */}
              <label className="block text-2xl font-bold mb-2">
                {selectedLanguage === "Spanish" ? "Mi nombre es" : "My name is"}
              </label>
              <input
                type="text"
                className="w-full p-4 text-xl rounded-lg border border-gray-300 mb-6"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={
                  selectedLanguage === "Spanish"
                    ? "Escribe tu nombre"
                    : "Enter your name"
                }
              />

              {/* Label for role */}
              <label className="block text-2xl font-bold mb-2">
                {selectedLanguage === "Spanish" ? "Soy un(a)" : "I am a"}
              </label>
              <input
                type="text"
                className="w-full p-4 text-xl rounded-lg border border-gray-300"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={
                  selectedLanguage === "Spanish"
                    ? "Escribe tu rol"
                    : "Enter your role"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
