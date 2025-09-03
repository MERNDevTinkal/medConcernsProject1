import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import FeelingPOpUP from "../FeelingPopUp/feelingPopUp"
const CardsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [feelingsicons, setFeelingsicons] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const mainpath = location.pathname;
  const { updateDisease } = useContext(GlobalContext);

  const handleCardClick = async (item) => {
    setSelected(item);
    await getTextToSpeech(item.name);
    setShowPopup(true);
  };

  const handlePopupResponse = async (response) => {
    setShowPopup(false);
    if (selected) {

      updateDisease(mainpath, [selected.name]);
      if (response === "no") {
        navigate("/summary-list");
      }
    }
  };

  useEffect(() => {
    setFeelingsicons(diseasesData[mainpath]);
  }, [mainpath]);

  return (
    <>
      {showPopup && (
        <FeelingPOpUP handlePopupResponse={handlePopupResponse} />
      )}
      {feelingsicons.map((item) => (
        <div
          style={{ cursor: "pointer" }}
          key={item.id}
          onClick={() => handleCardClick(item)}
        >
          <div className="dashboard-cards rounded-2xl bg-white text-center pb-3 shadow hover:shadow-lg transition">
            <div className="dashboard-img">
              <img src={item.image} className="w-full rounded-t-2xl" alt={item.name} />
            </div>
            <p className="text-[21px] mt-3 text-black font-medium">{item.name}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardsList;
