import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/DiseaseContext";
import { concerns } from "../DiseasesData/concernData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech"
const ConcernCard = () => {
  const navigate = useNavigate();
  const { updateDisease } = useContext(GlobalContext);

  const handleConcern = async (value, path) => {
    if (value && path) {
      await getTextToSpeech(value)
      updateDisease("concern", value);
      navigate(path);
    }
  };

  return (
    <>
      {concerns?.map(({ id, name, image, path }) => (
        <div style={{ cursor: "pointer" }} key={id} onClick={() => handleConcern(name, path)}>
          <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
            <div className="dashboard-img card-img-h rounded-2xl">
              <img src={image} alt={name} className="w-full" />
            </div>
            <p className="text-[16px] mt-3 mb-2 text-black">{name}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ConcernCard;
