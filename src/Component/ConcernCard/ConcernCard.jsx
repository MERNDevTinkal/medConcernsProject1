import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/DiseaseContext";
import { concerns } from "../DiseasesData/concernData";
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
        selectedLanguage === "Spanish" ? "es-ES" : ""
      );
      updateDisease(path.replace("/", ""), value);
      navigate(mainpath);
    }
  };
  return (
    <>
      {concerns
        .filter((item) => !skipKeys.includes(item.name))
        .map((item) => (
          <div
            key={item.id}
            style={{ cursor: "pointer" }}
            onClick={() => handleConcern(item, item.path)}
          >
            <div
              className={`dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300 flex flex-col items-center p-2`}
              style={{
                aspectRatio:
                  selectedIconCount === 6
                    ? "1 / 1" // square cards to fit 2 rows nicely
                    : selectedIconCount === 4
                    ? "4 / 5" // slightly smaller for 4 cards
                    : "4 / 3", // default for 1-3 cards
              }}
            >
              <div className="dashboard-img card-img-h rounded-2xl flex-1 flex items-center justify-center w-full">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[16px] mt-2 mb-2 text-black">
                {selectedLanguage === "Spanish" ? item?.nameEs : item?.name}
              </p>
            </div>
          </div>
        ))}
    </>
  );
};

export default ConcernCard;
