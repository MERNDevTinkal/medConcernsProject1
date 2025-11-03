import React, { useContext, useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react"; // Removed Calendar icon as we'll use a custom SVG
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { Link } from "react-router-dom";
import { howareyou } from "../../assets/ImagesImports";
import { GlobalContext } from "../../context/DiseaseContext";
import { useNavigate, useLocation } from "react-router-dom";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
export default function HowAreYou() {
  const [selectedIconCount, setSelectedIconCount] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [selectedGender, setSelectedGender] = React.useState("");

  const navigate = useNavigate();
  const { updateDisease, resetDiseases, addOrUpdateSummary } =
    useContext(GlobalContext);
  const location = useLocation();
  const mainpath = location.pathname;
  const handleValue = async (path, item) => {
    if (path && item.name) {
      try {
        resetDiseases();
        await getTextToSpeech(
          selectedLanguage === "Spanish" ? item.nameEs : item.name,
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
        updateDisease(mainpath.replace("/", ""), item);
        navigate(path);
      } catch (error) {
        console.error("TTS Error:", error);
        navigate(path);
      }
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
            name={
              selectedLanguage === "Spanish" ? "Cómo estás ?" : "How are you ?"
            }
          />

          <div className="main-wrapper home-wrapper ">
            <div className="dashboard-wrapper px-4 py-1.5">
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
                {howareyou.map((item) => (
                  <div
                    className={
                      selectedIconCount === 1
                        ? "dash-single-items"
                        : selectedIconCount === 2
                        ? "dash-double-items"
                        : selectedIconCount === 3
                        ? "dash-triple-items"
                        : selectedIconCount === 4
                        ? "dash-quadriple-items"
                        : selectedIconCount === 6
                        ? "dash-hexuple-items"
                        : ""
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleValue(`/yes-and-no/${item?.id}`, item);
                    }}
                    key={item?.id}
                  >
                    <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
                      <div className="dashboard-img card-img-h rounded-2xl">
                        <img
                          style={{
                            height: selectedIconCount === 6 ? "" : "",
                          }}
                          src={item?.image}
                          className="w-full"
                          alt={item?.name}
                        />
                      </div>
                      <p className="text-[16px] mt-3 mb-2 text-black">
                        {selectedLanguage === "Spanish"
                          ? item?.nameEs
                          : item?.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
