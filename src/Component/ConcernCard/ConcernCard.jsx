import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/DiseaseContext";
import { concerns } from "../DiseasesData/diseasesData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";

const ConcernCard = ({
  skipKeys = [],
  selectedLanguage,
  selectedIconCount,
}) => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { updateDisease, resetDiseases } = useContext(GlobalContext);

  const handleConcern = async (value, mainpath) => {
    if (value && mainpath) {
      resetDiseases();
      await getTextToSpeech(
        selectedLanguage === "Spanish" ? value.nameEs : value.name,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        selectedLanguage === "Spanish"
          ? value?.femaleEnglish
          : value?.maleEnglish
      );
      updateDisease(path.replace("/", ""), value);
      navigate(mainpath, {
        state: value,
      });
    }
  };
  return (
    <>
      {concerns
        .filter((item) => !skipKeys.includes(item.name))
        .map((item) => (
          <div
            key={item.id}
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleConcern(item, item.path)}
          >
            <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300 w-full flex flex-col items-center p-2">
              <div className="dashboard-img card-img-h rounded-2xl flex-1 flex items-center justify-center w-full">
                <img
                  style={{ height: selectedIconCount === 6 ? "50px" : "" }}
                  src={item?.image}
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
