import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import getSetting from "../../Component/settingApi/settings";

export default function Contactus() {
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
      <Header
        selectedLanguage={selectedLanguage}
        name={selectedLanguage === "Spanish" ? "Contáctanos" : "Contact Us"}
      />
      <div className="main-wrapper home-wrapper">
        <div className="contact-us text-center">
          <img src="/newlogo_4.png" width={400} className="m-auto" />

          {/* Patent Pending */}
          <div className="contect-info mt-4">
            <h4 className="text-[24px] font-medium color-black mb-0">
              {selectedLanguage === "Spanish"
                ? "Patente en trámite"
                : "Patent Pending"}
            </h4>
            <p className="text-[24px] mt-2 text-[#28a5e5] mb-2">
              Communication Rescue Services LLC
            </p>
          </div>

          <hr className="text-[#28a5e5]" />

          {/* Contact info */}
          <div className="contect-info mt-5">
            <h4 className="text-[20px] font-medium color-black mb-0">
              {selectedLanguage === "Spanish"
                ? "Preguntas, comentarios, ventas grupales u otros, contáctanos en"
                : "Questions, Comments, Group Sales, or other, Contact Us at"}
            </h4>
            <a
              href="mailto:info@communicationrescue.com"
              className="text-[20px] mt-2 text-[#28a5e5] mb-2"
            >
              info@communicationrescue.com
            </a>

            {/* Credits */}
            <div className="mt-4">
              <h3 className="text-[20px] mb-3 font-medium text-[#000]">
                {selectedLanguage === "Spanish" ? "Créditos:" : "Credits:"}
              </h3>
              <p className="text-[16px] mb-3 font-medium text-[#000] underline">
                Hilary Sample, MA, CCC-SLP{" "}
                {selectedLanguage === "Spanish" ? "y" : "and"} Steven Leeds
                Richman MD
              </p>
            </div>

            {/* App Development */}
            <div className="mt-4">
              <h3 className="text-[20px] mb-3 font-medium underline text-[#000]">
                {selectedLanguage === "Spanish"
                  ? "Desarrollo de la aplicación:"
                  : "App Development:"}
              </h3>
              <p className="text-[16px] mb-3 font-medium text-[#000]">
                JpLoft Solutions
              </p>
            </div>

            {/* Voice actors */}
            <div className="mt-4">
              <h3 className="text-[20px] mb-3 font-medium underline text-[#000]">
                {selectedLanguage === "Spanish"
                  ? "Actores de voz:"
                  : "Voice actors:"}
              </h3>
              <p className="text-[16px] mb-3 font-medium text-[#000]">
                Darby Cupit, Waveform Voice Acting
                <br />
                Nicole Carino <br />
                Luis Salido <br />
                Joaquin Vignoli
              </p>
            </div>

            {/* Graphic artists */}
            <div className="mt-4">
              <h3 className="text-[20px] mb-3 font-medium underline text-[#000]">
                {selectedLanguage === "Spanish"
                  ? "Artistas gráficos:"
                  : "Graphic artists:"}
              </h3>
              <p className="text-[16px] mb-3 font-medium text-[#000]">
                Bellal Artwork
                <br />
                Somendra Prakash, Sandalphonarts
              </p>
            </div>

            {/* Special thanks */}
            <div className="mt-4">
              <h3 className="text-[20px] mb-3 font-medium underline text-[#000]">
                {selectedLanguage === "Spanish"
                  ? "Agradecimientos especiales:"
                  : "Special thanks:"}
              </h3>
              <p className="text-[16px] mb-3 font-medium text-[#000]">
                Michael Hill <br />
                Patrice Leeds Richman <br />
                Sydney Hayes
              </p>
            </div>

            {/* Copyright */}
            <div className="mt-4">
              <h3 className="text-[20px] mb-3 font-medium text-[#000]">
                {selectedLanguage === "Spanish"
                  ? "Derechos de autor 2021-2023 Communication Rescue Services LLC"
                  : "Copyright 2021-2023 Communication Rescue Services LLC"}
              </h3>
              <p className="text-[16px] mb-3 font-medium text-[#000]">
                {selectedLanguage === "Spanish"
                  ? `"Preocupaciones médicas: Comunicación guiada" y todos los productos de "Comunicación guiada" están con patente en trámite`
                  : `"Medical Concerns: Guided Communication" and all "Guided Communication" products are Patent Pending`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
