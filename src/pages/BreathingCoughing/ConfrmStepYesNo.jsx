import React, { useEffect, useContext, useState } from "react";
import DecisionCard from "../../Component/ProblemCard/DecisionCard";
import Header from "../../Component/Layout/Header/Header";
import ConcernImg1 from "../../assets/images/pain-img.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import BackArrow from "../../assets/images/back-arrow.svg";
import Checked from "../../assets/images/checked.svg";
import Close from "../../assets/images/close.svg";
import dashimg01 from "../../assets/images/Shortness-of-Breath.png";
import { GlobalContext } from "../../context/DiseaseContext";
import { useParams } from "react-router-dom";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech"
function ConfrmStepYesNo() {
  const { name, id } = useParams();
  const navigate = useNavigate();
  const [selectedConcers, setSelectedConcers] = useState({})
  const { updateDisease, diseases } = useContext(GlobalContext);
  const handleConfrmStepYesNo = async (value, path) => {
    if (value && path) {
      await getTextToSpeech(value)
      updateDisease("ConfirmStepYesNo", value)
      navigate(path)
    }
  }
  useEffect(() => {
    const selectediseasesArray = diseasesData[`/${name}`];
    const selectedFilds = selectediseasesArray.find((item) => (item.id == id));
    setSelectedConcers(selectedFilds)
  }, [name, id])
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
        <div
          onClick={() => {
            navigate(-1);
          }}
          style={{ cursor: "pointer" }}
        >
          <img src={BackArrow} />
        </div>
        <h2 className="text-[25px] font-normal text-black text-center">{selectedConcers.name || 'Pain'}</h2>
        <button></button>
      </div>
      <div className="main-wrapper home-wrapper ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:px-10 sm:px-5 px-5 md:gap-20 gap-5 my-5 items-center">
          <div className="dashboard-cards rounded-2xl bg-white text-center shadow-sm p-3">
            <div className="dashboard-img rounded-2xl">
              <img src={selectedConcers.image} className="w-full" />
            </div>
          </div>
          <div>
            <div className="w-full overflow-hidden decision-cards">
              <div onClick={() => { handleConfrmStepYesNo("YES", selectedConcers.path) }}>
                <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
                  <div className="flex items-center">
                    <p className="text-[32px] font-medium text-green-600">
                      YES
                    </p>
                  </div>
                  <div>
                    <img src={Checked} alt="" />
                  </div>
                </div>
              </div>

              <div onClick={() => { handleConfrmStepYesNo("NO", "/") }}>
                <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
                  <div className="flex items-center">
                    <p className="text-[32px] font-medium text-red-600">NO</p>
                  </div>
                  <div>
                    <img src={Close} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ConfrmStepYesNo;
