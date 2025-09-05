import React, { useContext } from "react";
import Header from "../../Component/Layout/Header/Header";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import { GlobalContext } from "../../context/DiseaseContext";
import { breathingWhenOptions } from "../../Component/DiseasesData/whenData"
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech"
const BreathingWhen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathprimary = location.pathname;
  const { updateDisease, diseases } = useContext(GlobalContext);
  const handleBreathingWhen = async (value, path) => {
    if (value && path) {
      await getTextToSpeech(value.name)
      updateDisease("summaryList", [value])
      navigate(path)
    }
  }
  console.log("===>diseaseswhen", diseases)
  return (
    <>
      <Header name={'When?'} />
      <div className="main-wrapper home-wrapper ">
        <div className="dashboard-h grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3.5 px-4 py-1.5">
          {breathingWhenOptions?.length > 0 && breathingWhenOptions?.map((item, index) => (
            <div style={{ cursor: "pointer" }} key={item.id} onClick={() => { handleBreathingWhen(item, `/confrm-step-when/${item?.id}`) }}>
              <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
                <div className="dashboard-img card-img-h rounded-2xl">
                  <img src={item.image} className="w-full" />
                </div>
                <p className="text-[16px] mt-3 mb-2 color-black">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BreathingWhen;
