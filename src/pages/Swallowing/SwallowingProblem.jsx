import React, { useContext } from "react";
import dashimg01 from "../../assets/images/Shortness-of-Breath.png";
import dashimg02 from "../../assets/images/coughing.png";
import dashimg03 from "../../assets/images/chest-pain.png";
import dashimg04 from "../../assets/images/concern-img-08.png";
import dashimg05 from "../../assets/images/coughing.png";
import dashimg06 from "../../assets/images/reflux.png";
import dashimg07 from "../../assets/images/Nausea.png";
import dashimg08 from "../../assets/images/Pain-with-swallowing.png";
import dashimg09 from "../../assets/images/fear-of-swallowing.png";
import dashimg10 from "../../assets/images/dry_mouth.png";
import dashimg11 from "../../assets/images/too_much.png";
import dashimg12 from "../../assets/images/no_appetite.png";
import dashimg13 from "../../assets/images/trach.png";
import dashimg14 from "../../assets/images/something-else.png";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { GlobalContext } from "../../context/DiseaseContext";
const SwallowingProblem = () => {
  const navigate = useNavigate();
  const { updateDisease, diseases } = useContext(GlobalContext);
  const handleSwallowingProblem = (value, path) => {
    if (value && path) {
      updateDisease("SwallowingProblem", value)
      navigate(path)
    }
  }
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="dashboard-h grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3.5 px-4 py-1.5 emotion-cards">
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Choking', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg04} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Choking
              </p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Food Sticking', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg04} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Food Sticking</p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Heartburn', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg04} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Heartburn</p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Coughing', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg05} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Coughing</p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Reflux', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg06} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Reflux
              </p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Nausea', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg07} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Nausea
              </p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Pain with Swallowing', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg08} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Pain with Swallowing</p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Fear of Swallowing', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg09} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Fear of Swallowing</p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Losing Weight Without Trying', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg04} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Losing Weight Without Trying
              </p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Dry Mouth', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg10} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Dry Mouth</p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Too Much', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg11} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Too Much
              </p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('No Appetite', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg12} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                No Appetite
              </p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Trach', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg13} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Trach
              </p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Feeding Tube', '/heartburn') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg04} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Feeding Tube
              </p>
            </div>
          </Link>
          <Link to="/heartburn" onClick={() => { handleSwallowingProblem('Something Else', '/heartburn') }}>
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

export default SwallowingProblem;
