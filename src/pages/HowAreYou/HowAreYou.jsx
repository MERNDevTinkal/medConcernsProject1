import React, { useContext, useState } from "react";
import { ArrowLeft, Check } from "lucide-react"; // Removed Calendar icon as we'll use a custom SVG
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { Link } from "react-router-dom";
import { howareyou } from "../../assets/ImagesImports";
import { GlobalContext } from "../../context/DiseaseContext";
import { useNavigate } from "react-router-dom";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech"
export default function HowAreYou() {

  const navigate = useNavigate();
  const { updateDisease } = useContext(GlobalContext);

  const handleValue = async (path, item) => {
    if (path && name) {
      try {
        await getTextToSpeech(name);
        // updateDisease("howareyou", name);
        updateDisease("summaryList", [item]);
        navigate(path);
      } catch (error) {
        console.error("TTS Error:", error);
        navigate(path);
      }
    }
  };

  return (
    <>
      <Header name={'How Are You ?'} />
      <div className="main-wrapper home-wrapper ">
        <div className="dashboard-wrapper px-4 py-1.5">
          <div className="dashboard-h grid  gap-7 sm:grid-cols-3 md:grid-cols-3 grid-cols-2 py-3">
            {howareyou.map((item) => (
              <div style={{ cursor: "pointer" }} onClick={() => { handleValue(`/yes-and-no/${item?.id}`, item) }} key={item?.id}>
                <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
                  <div className="dashboard-img card-img-h rounded-2xl">
                    <img src={item?.image} className="w-full" alt={item?.name} />
                  </div>
                  <p className="text-[16px] mt-3 mb-2 text-black">{item?.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
