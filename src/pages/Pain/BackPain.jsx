import { useState, useEffect } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import PainDiagramBack from "../../Component/Paindiagram/PainDiagramBack";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
const BackPain = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [calendarOn, setCalendarOn] = useState("");
  const [introductionOn, setIntroductionOn] = useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getSetting(
      () => {},
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => {},
      () => {},
      () => {},
      () => {},
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
                ? "¿Dónde está su dolor?"
                : `Where is your pain?`
            }
          />

          <div className="main-wrapper home-wrapper pain-wrapper">
            <div className="my-5 flex justify-center items-center pain-tablet-view">
              <div className="w-full max-w-4xl p-0 bg-white shadow-sm rounded-xl pain-digram-box relative">
                <PainDiagramBack
                  selectedGender={selectedGender}
                  selectedLanguage={selectedLanguage}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default BackPain;
