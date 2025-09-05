import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/DiseaseContext";
import { topicBoard } from "../DiseasesData/concernData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech"
const TopicBoard = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { updateDisease } = useContext(GlobalContext);

  const handleConcern = async (value, mainpath) => {
    if (value && mainpath) {
      await getTextToSpeech(value.name)
      // updateDisease(path.replace("/", ""), value);
       updateDisease("summaryList", [value]);
      navigate(mainpath);
    }
  };

  return (
    <>
      {topicBoard?.map((item) => (
        <div style={{ cursor: "pointer" }} key={item.id} onClick={() => handleConcern(item, item.path)}>
          <div className="dashboard-cards rounded-2xl bg-white h-[120px] flex items-center justify-center  text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
            <p className="text-[16px] mt-3 mb-2 text-black">{item?.name}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicBoard;
