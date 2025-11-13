import React, { useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/DiseaseContext";
import { topicBoard } from "../DiseasesData/diseasesData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
const TopicBoard = ({
  gifLoader,
  selectedLanguage,
  selectedIconCount,
  selectedGender,
}) => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { updateDisease, addOrUpdateSummary } = useContext(GlobalContext);
  const isSpeakingRef = useRef(false);

  const handleConcern = async (value, mainpath) => {
    try {
      if (!value || !mainpath) return;
      if (isSpeakingRef.current) return;
      isSpeakingRef.current = true;
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
        selectedLanguage === "Spanish" ? value.nameEs : value.name,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        voiceFile
      );
      addOrUpdateSummary(path, [value]);
      navigate(mainpath);
      isSpeakingRef.current = false;
    } catch (error) {
      console.error("Error in handleConcern:", error);
    }
  };

  return (
    <>
      {topicBoard?.map((item) => (
        <div
          key={item.id}
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
          onClick={() => handleConcern(item, item.path)}
        >
          <div className="dashboard-cards relative rounded-2xl bg-white h-[140px] flex flex-col items-center justify-center text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300 p-3">
            {/* Spanish text stays centered */}
            <p className="text-[16px] mt-3 mb-2 text-black">
              {selectedLanguage === "Spanish" ? item?.nameEs : item?.name}
            </p>

            {/* English text positioned near bottom */}
            {selectedLanguage === "Spanish" && (
              <p
                className="absolute bottom-2 text-[13
              
              px] text-black-500 break-words"
              >
                {item?.name}
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicBoard;
