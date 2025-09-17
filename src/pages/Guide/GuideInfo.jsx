import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import Arrow from "../../assets/images/double-arrow.svg";
import { guideInfo } from "../../Component/DiseasesData/diseasesData";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
const GuideInfo = () => {
  const [loader, setLoader] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
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
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            name={
              selectedLanguage === "Spanish" ? "Sobre nosotras" : "About Us"
            }
          />

          <div className="main-wrapper home-wrapper">
            <div className="px-[30px] my-5">
              {guideInfo.map((item) =>
                item.type === "h2" ? (
                  <h2 className="text-[32px] primary-text font-medium leading-[40px]">
                    {item.name}
                  </h2>
                ) : item.type === "h5" ? (
                  <h5 className="text-[16px] text-black my-5 font-normal">
                    {selectedLanguage === "Spanish" ? item.nameEs : item.name}
                  </h5>
                ) : (
                  <p className="text-[14px] text-black font-normal mb-3.5 flex items-start gap-3.5">
                    <img src={Arrow} />
                    {selectedLanguage === "Spanish" ? item.nameEs : item.name}
                  </p>
                )
              )}
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default GuideInfo;
