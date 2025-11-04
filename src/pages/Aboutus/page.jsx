import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
export default function Aboutus() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [IntroductionOn, setIntroductionOn] = React.useState("");
  const [CalendarOn, setCalendarOn] = React.useState("");

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
              selectedLanguage === "Spanish" ? "Sobre nosotras" : "About us"
            }
          />

          <div className="main-wrapper bg-white">
            <img src="/about_mg.jpg" className="ml-auto rounded-4xl mb-4 " />

            {selectedLanguage === "Spanish" ? (
              <p className="text-[18px] font-medium color-black mb-0 text-center">
                Nuestra misión es empoderar a los pacientes para que recuperen
                su voz y autonomía al apoyar sus necesidades de comunicación.
                Nuestra aplicación facilita y hace más precisa la evaluación de
                preocupaciones médicas en personas con afasia al incorporar
                técnicas de comunicación basadas en evidencia. La Carta de
                Derechos del Paciente requiere que los pacientes comprendan y
                participen en su atención. Esto requiere una comunicación clara
                en ambos lados, un desafío evidente con los trastornos de
                comunicación. La aplicación Medical Concerns permite a los
                proveedores defender los derechos de los pacientes en estas
                situaciones difíciles. La aplicación fue desarrollada
                conjuntamente por una patóloga del habla y un médico que
                trabajan regularmente con lesiones cerebrales, accidentes
                cerebrovasculares y otros diagnósticos que a menudo resultan en
                dificultades de comunicación. A través de nuestra experiencia
                combinada, reconocimos la necesidad de apoyar a nuestros colegas
                proveedores de atención médica y a nuestros pacientes en la
                comunicación clara sobre preocupaciones médicas. Las
                investigaciones muestran que los proveedores de atención médica
                desean fuertemente comunicarse con estos pacientes, pero con
                frecuencia se sienten frustrados por las limitaciones de la
                comunicación verbal y los tableros de comunicación simples.
                Juntos, nos propusimos cerrar esta brecha, y así nació
                Communication Rescue Services.
              </p>
            ) : (
              <p className="text-[18px] font-medium color-black mb-0 text-center">
                Our mission is to empower patients to regain their voice and
                autonomy by supporting their communication needs. Our app makes
                assessing medical concerns in people with aphasia easier and
                more accurate by incorporating evidence-based aphasia
                communication techniques. The Patient's Bill of Rights requires
                that patients understand and are involved with their care. This
                requires clear communication on both sides, an obvious challenge
                with communication disorders. The Medical Concerns app enables
                providers to uphold patient rights in these difficult
                situations. The Medical Concerns App was jointly developed by a
                speech language pathologist and physician who work regularly
                with brain injury, stroke, and other diagnoses that often result
                in communication difficulties. Through our combined experience,
                we recognized a need to support our fellow healthcare providers
                and our patients in communicating clearly regarding medical
                concerns. Research shows healthcare providers have a strong
                desire to communicate with these patients, but are frequently
                frustrated by the limitations of verbal communication and simple
                communication boards. Together we set off on a path to bridge
                this gap, and Communication Rescue Services was created.
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}
