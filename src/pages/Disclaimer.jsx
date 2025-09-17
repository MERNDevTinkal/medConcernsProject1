import React, { useEffect, useState } from "react";
import Header from "../Component/Layout/Header/Header";
import Footer from "../Component/Layout/Footer/Footer";
import getSetting from "../Component/settingApi/settings";
import Loader from "../Component/webLoader/loader";
const Disclaimer = () => {
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
  const disclaimers = {
    English: `This app does not diagnose, treat, or provide medical advice. It is
  intended solely as a communication aid to help users express medical
  concerns to healthcare providers. Any information within the app is
  for general informational purposes only and is not a substitute for
  professional medical advice. Always consult a qualified healthcare
  provider before making medical decisions.`,

    Spanish: `Esta aplicación no diagnostica, trata ni proporciona asesoramiento médico.
  Su único propósito es servir como herramienta de comunicación para que los
  usuarios puedan expresar sus inquietudes médicas a los profesionales de la
  salud. La información contenida en la aplicación es solo para fines
  informativos generales y no sustituye el consejo médico profesional.
  Consulte siempre con un profesional de la salud calificado antes de tomar
  decisiones médicas.`,
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
              selectedLanguage === "Spanish"
                ? "Descargo de responsabilidad"
                : "Disclaimer"
            }
          />

          <div className="main-wrapper home-wrapper ">
            <div className="px-6 text-center mt-7">
              <h2 className="text-[24px] font-normal text-black mb-6">
                {selectedLanguage === "Spanish"
                  ? "Descargo de responsabilidad"
                  : "Disclaimer"}
              </h2>
              <p className="text-[16px] font-normal leading-relaxed">
                {disclaimers[selectedLanguage] || disclaimers.English}
              </p>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Disclaimer;
