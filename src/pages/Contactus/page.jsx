import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
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
        name={
          selectedLanguage === "Spanish" ? "Tablero de Necesidades" : "About Us"
        }
      />
      <div className="main-wrapper home-wrapper">
        <div className="contact-us text-center ">
          <img src="/newlogo_4.png" width={400} className="m-auto" />
          <div className="contect-info mt-4">
            <h4 className="text-[24px] font-medium color-black mb-0">
              Patent Pending
            </h4>
            <p className="text-[24px] mt-2 text-[#28a5e5] mb-2">
              Communication Rescue Services LLC
            </p>
          </div>
          <hr className="text-[#28a5e5]" />
          <div className="contect-info mt-5">
            <h4 className="text-[20px] font-medium color-black mb-0">
              Questions, Comments, Group Sales, or other, Contact Us at
            </h4>
            <a href="" className="text-[20px] mt-2 text-[#28a5e5] mb-2">
              info@communicationrescue.com
            </a>
            <div className="mt-4 ">
              <h3 className="text-[20px] mb-3 font-medium  text-[#000]">
                Credits:
              </h3>
              <p className="text-[16px] mb-3 font-medium  text-[#000] underline">
                Hilary Sample, MA, CCC-SLP and Steven Leeds Richman MD
              </p>
            </div>
            <div className="mt-4 ">
              <h3 className="text-[20px] mb-3 font-medium underline text-[#000]">
                App Development:
              </h3>
              <p className="text-[16px] mb-3 font-medium  text-[#000] ">
                JpLoft Solutions
              </p>
            </div>
            <div className="mt-4 ">
              <h3 className="text-[20px] mb-3 font-medium underline text-[#000]">
                Voice actors:
              </h3>
              <p className="text-[16px] mb-3 font-medium  text-[#000] ">
                Darby Cupit, Waveform Voice Acting
                <br />
                Nicole Carino <br />
                Luis Salido
                <br />
                Joaquin Vignoli
              </p>
            </div>
            <div className="mt-4 ">
              <h3 className="text-[20px] mb-3 font-medium underline text-[#000]">
                Graphic artist:
              </h3>
              <p className="text-[16px] mb-3 font-medium  text-[#000] ">
                Bellal Artwork
                <br />
                Somendra Prakash, Sandalphonarts
              </p>
            </div>
            <div className="mt-4 ">
              <h3 className="text-[20px] mb-3 font-medium underline text-[#000]">
                Special thanks:
              </h3>
              <p className="text-[16px] mb-3 font-medium  text-[#000] ">
                Michael Hill <br />
                Patrice Leeds Richman <br />
                Sydney Hayes
              </p>
            </div>
            <div className="mt-4 ">
              <h3 className="text-[20px] mb-3 font-medium  text-[#000]">
                Copyright 2021-2023 Communication Rescue Services LLC
              </h3>
              <p className="text-[16px] mb-3 font-medium  text-[#000] ">
                "Medical Concerns: Guided Communication" and all "Guided
                Communication" products are Patent Pending
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
