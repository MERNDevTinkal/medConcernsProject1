import React, { useState, useRef, useEffect } from "react";
import {
  maleCompleteFace,
  femaleCompleteFace,
} from "../../Component/DiseasesData/images";
import Loader from "../../Component/webLoader/loader";
import Header from "../../Component/Layout/Header/Header";
import getSetting from "../../Component/settingApi/settings";
const EarDiagram = () => {
  const [point, setPoint] = useState(null);
  const imageRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [selectedGender, setSelectedGender] = React.useState("");
  const [calendarOn, setCalendarOn] = React.useState("");
  const [introductionOn, setIntroductionOn] = React.useState("");
  const handleClick = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPoint({ x, y });
  };

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
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            calendarOn={calendarOn}
            introductionOn={introductionOn}
            name={
              selectedLanguage === "Spanish"
                ? "¿Dónde está tu dolor?"
                : "Where is your pain?"
            }
          />

          <div className="main-wrapper home-wrapper pt-20 relative">
            <div className="my-5 flex justify-center items-center">
              <div className="w-full max-w-4xl  bg-white shadow-sm rounded-xl digram-cards relative">
                <div className="flex justify-center items-center digram-cards-img">
                  <img
                    ref={imageRef}
                    src={selectedGender === "Female" ? femaleCompleteFace : maleCompleteFace}
                    alt="Face Diagram"
                    onClick={handleClick}
                    className=""
                    draggable={false}
                  />
                </div>
                {point && (
                  <div
                    className="absolute w-10 h-10 rounded-full bg-red-500/40 border-2 border-red-600 pointer-events-none"
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EarDiagram;
