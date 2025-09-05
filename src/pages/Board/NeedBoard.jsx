import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import { Link } from "react-router-dom";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import Footer from "../../Component/Layout/Footer/Footer";
import { useLocation } from "react-router-dom";
const NeedBoard = () => {
  const location = useLocation();
  const [getAllDiseases, setDiseases] = useState([]);
  useEffect(() => {
    setDiseases(diseasesData[location.pathname])
  }, [location?.pathname])
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper ">
        <div className="dashboard-h grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3.5 px-4 my-4">
          {getAllDiseases.map((item) => (
            <div >
              <div className="dashboard-cards rounded-2xl bg-white text-center h-full py-2 px-3">
                <div className="dashboard-img flex justify-center items-center">
                  <img src={item?.image} />
                </div>
                <p className="text-[12px] mt-4 color-black mb-0 ">{item?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NeedBoard;
