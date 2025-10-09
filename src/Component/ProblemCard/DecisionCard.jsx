import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Checked from "../../assets/images/checked.svg";
import Close from "../../assets/images/close.svg";
import Question from "../../assets/images/question.svg";
import WomenIcon from "../../assets/images/women.png";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import NoImg from "../../../src/assets/images/concern-img-08.png";
import yesImage from "../../../src/assets/images/summary-img-06.png";
import dontknowImg from "../../../src/assets/images/something-else.png";

const DecisionCard = ({ selectedLanguage, partName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { updateDisease, diseases } = useContext(GlobalContext);
  const newData = [
    {
      id: 1,
      image: yesImage,
      name: "Yes",
      nameEs: "SÍ",
    },
    {
      id: 2,
      image: NoImg,
      name: "No",
      nameEs: "No",
    },
    {
      id: 3,
      image: dontknowImg,
      name: "Don't Know",
      nameEs: "no lo sé",
    },
  ];
  const handleDecision = async (value, mainpath, id) => {
    if (value && mainpath) {
      await getTextToSpeech(
        value,
        selectedLanguage === "Spanish" ? "es-ES" : ""
      );
      if (path === "/new-problem") {
        const arrayFilter = newData.filter((data) => data.id === id);
        console.log("arrayFilterarrayFilterarrayFilter", arrayFilter);
      }
      updateDisease(path.replace("/", ""), value);
      navigate(mainpath);
    }
  };
  return (
    <>
      <div className="w-full overflow-hidden decision-cards">
        <div
          onClick={() => {
            handleDecision(
              selectedLanguage === "Spanish" ? "SÍ" : "Yes",
              path === "/new-problem" ? "/summary" : "/pain-feel",
              1
            );
          }}
        >
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[32px] font-medium text-green-600">
                {selectedLanguage === "Spanish" ? "SÍ" : "YES"}
              </p>
            </div>
            <div>
              <img src={Checked} alt="" />
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            handleDecision(
              "No",
              path === "/new-problem" ? "/summary" : navigate(-1),
              2
            );
          }}
        >
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[32px] font-medium text-red-600">
                {selectedLanguage === "Spanish" ? "NO" : "NO"}
              </p>
            </div>
            <div>
              <img src={Close} />
            </div>
          </div>
        </div>
        {!partName &&
          !["/concern-pain", "/face-pain"].includes(location.pathname) && (
            <div
              onClick={() => {
                handleDecision(
                  selectedLanguage === "Spanish" ? "no lo sé" : "Don't Know",
                  "/summary",
                  3
                );
              }}
              className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300"
            >
              <div className="flex items-center">
                <img src={WomenIcon} alt="" className="w-15 h-15" />
              </div>
              <div>
                <img src={Question} />
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default DecisionCard;
