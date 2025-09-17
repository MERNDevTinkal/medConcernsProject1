import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/DiseaseContext";
import { Link } from "react-router-dom";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import { useNavigate, useLocation } from "react-router-dom";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import Loader from "../../Component/webLoader/loader";
const PainCardsList = ({ selectedLanguage }) => {
  const { updateDisease, diseases, addOrUpdateSummary } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathprimary = location.pathname;
  const [loader, setLoader] = useState(true);
  const [painFeelParams, setPainFeelParams] = useState([]);
  const handleConcern = async (value, path) => {
    if (value && path) {
      await getTextToSpeech(value.name);
      addOrUpdateSummary(pathprimary, [value]);
      navigate(path);
    }
  };
  useEffect(() => {
    setPainFeelParams(diseasesData[pathprimary]);
    setLoader(false);
  }, [pathprimary]);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {painFeelParams.map((item) => (
            <div
              style={{ cursor: "pointer" }}
              key={item.id}
              onClick={() => handleConcern(item, item.secPath)}
            >
              <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
                <div className="dashboard-cards card-img-h card-img-h ">
                  <img src={item.image} className="w-full" />
                </div>
                <p className="text-[21px] mt-3 color-black">
                  {selectedLanguage === "Spanish" ? item.nameEs : item.name}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default PainCardsList;
