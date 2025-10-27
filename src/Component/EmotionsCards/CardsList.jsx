import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
const CardsList = ({ selectedGender, selectedLanguage, selectedIconCount }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [feelingsicons, setFeelingsicons] = useState([]);
  const path = location.pathname;
  const mainpath = location.pathname;
  const { addOrUpdateSummary } = useContext(GlobalContext);

  const handleCardClick = async (item, path) => {
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
    const datevalue = new Date();
    addOrUpdateSummary(`${mainpath}-${datevalue}`, [item]);
    navigate(path);
  };

  useEffect(() => {
    setFeelingsicons(diseasesData[mainpath]);
  }, [mainpath]);

  return (
    <>
      {feelingsicons.map((item) => (
        <div
          className={selectedIconCount === 1 ? "dash-single-items" : ""}
          style={{ cursor: "pointer" }}
          key={item.id}
          onClick={() =>
            handleCardClick(
              item,
              item?.secPath?.includes("/confrm-step-yesno")
                ? `${path}${item?.secPath}/${item?.id}`
                : `${item?.secPath}`
            )
          }
        >
          <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
            <div className="dashboard-img card-img-h rounded-2xl">
              <img
                style={{
                  ...(selectedIconCount === 6 ? { height: "50px" } : ""),
                }}
                src={item.image}
                className="w-full "
                alt={item.name}
              />
            </div>
            <p className="text-[16px] mt-3 mb-2 color-black">
              {selectedLanguage === "Spanish" ? item.nameEs : item.name}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardsList;
