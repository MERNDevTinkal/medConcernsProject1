import React, { useContext } from "react";
import Header from "../../Component/Layout/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import { GlobalContext } from "../../context/DiseaseContext";
import { breathingWhenOptions } from "../../Component/DiseasesData/whenData"
const BreathingWhen = () => {
  const navigate = useNavigate();
  const { updateDisease, diseases } = useContext(GlobalContext);
  const handleBreathingWhen = (value, path) => {
    if (value && path) {
      updateDisease("BreathingWhen", value)
      navigate(path)
    }
  }

  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper ">
        <div className="dashboard-h grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3.5 px-4 py-1.5">
          {breathingWhenOptions?.length > 0 && breathingWhenOptions?.map((item) => (
            <Link to={`/confrm-step-when/${item?.id}`} onClick={() => { handleBreathingWhen("Morning", `/confrm-step-when/${item?.id}`) }}>
              <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
                <div className="dashboard-img card-img-h rounded-2xl">
                  <img src={item.image} className="w-full" />
                </div>
                <p className="text-[16px] mt-3 mb-2 color-black">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BreathingWhen;
