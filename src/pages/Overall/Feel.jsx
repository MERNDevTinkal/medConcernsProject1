import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import Footer from "../../Component/Layout/Footer/Footer";
import BackArrow from "../../assets/images/back-arrow.svg";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import Header from "../../Component/Layout/Header/Header";
const Feel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [emotionsicons, setEmotionsicons] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(false);
  const [selectedGender, setSelectedGender] = React.useState("");
  let mainpath = location.pathname;
  const { addOrUpdateSummary } = useContext(GlobalContext);
  useEffect(() => {
    if (mainpath === "/emotions") {
      mainpath = "/feel";
    }
    setEmotionsicons(diseasesData[mainpath]);
  }, [mainpath]);
  const handleRoutes = async (item, path) => {
    if (item && path) {
      await getTextToSpeech(
        selectedLanguage === "Spanish" ? item?.nameEs : item?.name,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        selectedLanguage === "" && selectedGender === ""
          ? item?.maleEnglish
          : selectedLanguage === "Spanish" && selectedGender === "Male"
          ? item?.maleSpanish
          : selectedLanguage === "Spanish" && selectedGender === "Female"
          ? item?.femaleSpanish
          : selectedLanguage === "" && selectedGender === "Female"
          ? item?.femaleEnglish
          : selectedLanguage === "" && selectedGender === "Male"
          ? item?.maleEnglish
          : selectedLanguage === "English" && selectedGender === "Male"
          ? item?.maleEnglish
          : selectedLanguage === "English" && selectedGender === "Female"
          ? item?.femaleEnglish
          : item?.maleEnglish
      );
      addOrUpdateSummary(mainpath, [item]);
      navigate(mainpath === "/emotions" ? "/feelOptions/1" : path);
    }
  };
  useEffect(() => {
    getSetting(
      () => {},
      setSelectedGender,
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader,
      () => {},
      () => {},
      () => {},
      () => {}
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
              selectedLanguage === "Spanish"
                ? "¿Cómo te sientes en general?"
                : "How do you feel overall?"
            }
          />
          <div className="main-wrapper home-wrapper ">
            <div className="dashboard-wrapper px-4 py-1.5 feel-list-main">
              <ul className="flex flex-col gap-10 feel-list relative before:content-[''] before:absolute before:left-[50px] before:top-0 before:h-full before:w-[27px] before:bg-[linear-gradient(180deg,_#7ebe01_0%,_#fbcc00_25%,_#fbcc00_37.5%,_#f78d11_50%,_#f78d11_75%,_#f36218_87.5%,_#e92f1a_100%)]">
                {emotionsicons.map((item) => (
                  <li
                    key={item?.id}
                    onClick={() => {
                      handleRoutes(item, "/feelOptions");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex gap-12 items-center">
                      <img src={item?.image} className="w-30" alt="" />
                      <span className="text-[40px] font-medium color-black">
                        {selectedLanguage === "Spanish"
                          ? item?.nameEs
                          : item?.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Feel;
