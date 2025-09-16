import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
const CardsList = ({ selectedLanguage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [feelingsicons, setFeelingsicons] = useState([]);
  const [selected, setSelected] = useState(null);
  const path = location.pathname;
  const mainpath = location.pathname;
  const { updateDisease, addOrUpdateSummary } = useContext(GlobalContext);

  const handleCardClick = async (item, path) => {
    setSelected(item);
    await getTextToSpeech(item.name);
    addOrUpdateSummary(mainpath, [item]);
    navigate(path);
  };

  useEffect(() => {
    setFeelingsicons(diseasesData[mainpath]);
  }, [mainpath]);

  return (
    <>
      {feelingsicons.map((item) => (
        <div
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
          <div className="dashboard-cards rounded-2xl bg-white text-center pb-3 shadow hover:shadow-lg transition">
            <div className="dashboard-img">
              <img
                src={item.image}
                className="w-full rounded-t-2xl"
                alt={item.name}
              />
            </div>
            <p className="text-[21px] mt-3 text-black font-medium">
              {selectedLanguage === "English" ? item.name : item.nameEs}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardsList;
