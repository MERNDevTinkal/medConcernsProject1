import React, { useContext, useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import { GlobalContext } from "../../context/DiseaseContext";
import { breathingWhenOptions } from "../../Component/DiseasesData/diseasesData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
const BreathingWhen = () => {
  const [selectedIconCount, setSelectedIconCount] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [selectedGender, setSelectedGender] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const pathprimary = location.pathname;
  const { addOrUpdateSummary } = useContext(GlobalContext);
  const handleBreathingWhen = async (value, path) => {
    if (value && path) {
      await getTextToSpeech(
        selectedLanguage === "Spanish" ? value.nameEs : value.name,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        selectedLanguage === "" && selectedGender === ""
          ? value?.maleEnglish
          : selectedLanguage === "Spanish" && selectedGender === "Male"
          ? value?.maleSpanish
          : selectedLanguage === "Spanish" && selectedGender === "Female"
          ? value?.femaleSpanish
          : selectedLanguage === "" && selectedGender === "Female"
          ? value?.femaleEnglish
          : selectedLanguage === "" && selectedGender === "Male"
          ? value?.maleEnglish
          : selectedLanguage === "English" && selectedGender === "Male"
          ? value?.maleEnglish
          : selectedLanguage === "English" && selectedGender === "Female"
          ? value?.femaleEnglish
          : value?.maleEnglish
      );
      addOrUpdateSummary(pathprimary, [value]);
      // navigate(path);
    }
  };
  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      setSelectedGender,
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
            name={selectedLanguage === "Spanish" ? "Cuando?" : "When?"}
          />

          <div className="main-wrapper home-wrapper ">
            <div
              className="dashboard-h grid gap-3 p-3"
              style={{
                gridTemplateColumns:
                  selectedIconCount === 6
                    ? "repeat(3, 1fr)" // 3 per row
                    : `repeat(${selectedIconCount || 2}, 1fr)`,
                gridTemplateRows:
                  selectedIconCount === 6 ? "repeat(2, 1fr)" : "auto",
              }}
            >
              {breathingWhenOptions?.length > 0 &&
                breathingWhenOptions?.map((item, index) => (
                  <div
                    className={
                      selectedIconCount === 1 ? "dash-single-items" : ""
                    }
                    style={{ cursor: "pointer" }}
                    key={item.id}
                    onClick={() => {
                      handleBreathingWhen(
                        item,
                        `/confrm-step-when/${item?.id}`
                      );
                    }}
                  >
                    <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
                      <div className="dashboard-img card-img-h rounded-2xl">
                        <img
                          style={{
                            height: selectedIconCount === 6 ? "50px" : "",
                          }}
                          src={item.image}
                          className="w-full"
                        />
                      </div>
                      <p className="text-[16px] mt-3 mb-2 color-black">
                        {selectedLanguage === "Spanish"
                          ? item.nameEs
                          : item.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default BreathingWhen;
