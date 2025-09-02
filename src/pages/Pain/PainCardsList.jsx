import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/DiseaseContext";
import { Link } from "react-router-dom";
import { diseasesData } from "../../Component/DiseasesData/diseasesData"
import { useNavigate, useLocation } from "react-router-dom";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech"
const PainCardsList = () => {
  const { updateDisease, diseases } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathprimary = location.pathname;
  const [painFeelParams, setPainFeelParams] = useState([]);
  const handleConcern = async (value, path) => {
    if (value && path) {
      await getTextToSpeech(value)
      updateDisease(pathprimary.replace("/", ""), value);
      navigate(path);
    }
  };
  useEffect(() => {
    setPainFeelParams(diseasesData[pathprimary])
  }, [pathprimary]);
  return (
    <>
      {painFeelParams.map(({ id, name, secPath, image }) => (
        <div style={{ cursor: "pointer" }} key={id} onClick={() => handleConcern(name, secPath)}>
          <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
            <div className="dashboard-cards card-img-h card-img-h ">
              <img src={image} className="w-full" />
            </div>
            <p className="text-[21px] mt-3 color-black">{name}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default PainCardsList;
