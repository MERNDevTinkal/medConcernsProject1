import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/DiseaseContext";
import { topicBoard } from "../DiseasesData/diseasesData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
const TopicBoard = ({
  selectedLanguage,
  selectedIconCount,
  selectedGender,
}) => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { updateDisease, addOrUpdateSummary } = useContext(GlobalContext);

  const handleConcern = async (value, mainpath) => {
    if (value && mainpath) {
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
      addOrUpdateSummary(path, [value]);
      navigate(mainpath);
    }
  };

  return (
    <>
      {topicBoard?.map((item) => (
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
          key={item.id}
          onClick={() => handleConcern(item, item.path)}
        >
          <div className="dashboard-cards rounded-2xl bg-white h-[120px] flex items-center justify-center  text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
            <p
              className="text-[16px] mt-3 mb-2 text-black"
              style={{ height: selectedIconCount === 6 ? "" : "" }}
            >
              {selectedLanguage === "Spanish" ? item?.nameEs : item?.name}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicBoard;
