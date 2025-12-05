import React, { useContext } from "react";
import dashimg02 from "/assets/images/with-food.png";
import dashimg04 from "/assets/images/concern-img-08.png";
import dashimg05 from "/assets/images/with-saliva.png";
import dashimg06 from "/assets/images/swallowing.png";
import dashimg09 from "/assets/images/dry_mouth.png";
import dashimg14 from "/assets/images/something-else.png";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { GlobalContext } from "../../context/DiseaseContext";
const Heartburn = () => {
  const navigate = useNavigate();
  const { updateDisease, diseases } = useContext(GlobalContext);
  const handleHeartburn = (value, path) => {
    if (value && path) {
      updateDisease("Heartburn", value)
      navigate(path)
    }
  }
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="dashboard-h grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3.5 px-4 py-1.5 emotion-cards">
          <Link to="/heartburn-step-yesno" onClick={() => { handleHeartburn('With Medication', '/heartburn-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg04} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                With Medication
              </p>
            </div>
          </Link>
          <Link to="/heartburn-step-yesno" onClick={() => { handleHeartburn('With Food', '/heartburn-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg02} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">With Food</p>
            </div>
          </Link>
          <Link to="/heartburn-step-yesno" onClick={() => { handleHeartburn('With Drinks', '/heartburn-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg04} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">With Drinks</p>
            </div>
          </Link>
          <Link to="/heartburn-step-yesno" onClick={() => { handleHeartburn('With Food & Drinks', '/heartburn-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg04} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">With Food & Drinks</p>
            </div>
          </Link>
          <Link to="/heartburn-step-yesno" onClick={() => { handleHeartburn('With Saliva', '/heartburn-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg05} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                With Saliva
              </p>
            </div>
          </Link>
          <Link to="/heartburn-step-yesno" onClick={() => { handleHeartburn('Just Swallowing', '/heartburn-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg06} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Just Swallowing
              </p>
            </div>
          </Link>
          <Link to="/heartburn-step-yesno" onClick={() => { handleHeartburn('Just Dry / Uncomfortable', '/heartburn-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg09} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Just Dry / Uncomfortable</p>
            </div>
          </Link>

          <Link to="/heartburn-step-yesno" onClick={() => { handleHeartburn('Something Else', '/heartburn-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg14} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Something Else
              </p>
            </div>
          </Link>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Heartburn;
