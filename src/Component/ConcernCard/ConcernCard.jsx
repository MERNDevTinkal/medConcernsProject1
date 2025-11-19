import React, { useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/DiseaseContext";
import { concerns } from "../DiseasesData/diseasesData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";

const ConcernCard = ({
  gifLoader,
  skipKeys = [],
  selectedLanguage,
  selectedIconCount,
  selectedGender,
}) => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { updateDisease, resetDiseases } = useContext(GlobalContext);
  const isSpeakingRef = useRef(false);

  const handleConcern = async (value, mainpath) => {
    if (!value || !mainpath) return;
    if (isSpeakingRef.current) return;

    try {
      isSpeakingRef.current = true;

      resetDiseases();

      const voiceText =
        selectedLanguage === "Spanish" ? value.nameEs : value.name;

      const voiceFile =
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
          : value?.maleEnglish;

      await getTextToSpeech(
        voiceText,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        voiceFile
      );

      updateDisease(path.replace("/", ""), value);
      navigate(mainpath, { state: value });
    } catch (error) {
      console.error("Error in handleConcern:", error);
    } finally {
      isSpeakingRef.current = false;
    }
  };

  return (
    <>
      {concerns
        .filter((item) => !skipKeys.includes(item.name))
        .map((item) => (
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
            key={item.id}
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleConcern(item, item.path)}
            onTouchEnd={() => handleConcern(item, item.path)}
          >
            <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300 w-full flex flex-col items-center p-2">
              <div className="dashboard-img card-img-h rounded-2xl flex-1 flex items-center justify-center w-full">
                <img
                  style={{ height: selectedIconCount === 6 ? "" : "" }}
                  src={item?.image ?? gifLoader}
                  alt={item?.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[14px] mt-1 mb-1 text-black">
                {selectedLanguage === "Spanish" ? item?.nameEs : item?.name}
              </p>
            </div>
          </div>
        ))}
    </>
  );
};

export default ConcernCard;
