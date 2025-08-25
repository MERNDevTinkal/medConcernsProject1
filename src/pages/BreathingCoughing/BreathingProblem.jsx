import React, { useContext } from "react";
import dashimg01 from "../../assets/images/Shortness-of-Breath.png";
import dashimg02 from "../../assets/images/coughing.png";
import dashimg03 from "../../assets/images/chest-pain.png";
import dashimg04 from "../../assets/images/concern-img-08.png";
import dashimg05 from "../../assets/images/thick-mucus.png";
import dashimg06 from "../../assets/images/Congested-or-Runny-Nose.png";
import dashimg07 from "../../assets/images/heavy-pain.png";
import dashimg08 from "../../assets/images/CPAP-BiPAP.png";
import dashimg09 from "../../assets/images/Breathing-Treatment.png";
import dashimg10 from "../../assets/images/trach.png";
import dashimg11 from "../../assets/images/something-else.png";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { GlobalContext } from "../../context/DiseaseContext";

const BreathingProblem = () => {
  const navigate = useNavigate();
  const { updateDisease, diseases } = useContext(GlobalContext);
  const handleBreathingProblem = (value, path) => {
    if (value && path) {
      updateDisease("breathingproblem", value)
      navigate(path)
    }
  }
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="dashboard-h grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3.5 px-4 py-1.5 emotion-cards">
          <Link to="/confrm-step-yesno" onClick={() => { handleBreathingProblem('Shortness of Breath', '/confrm-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg01} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Shortness of Breath
              </p>
            </div>
          </Link>
          <Link to="/confrm-step-yesno" onClick={() => { handleBreathingProblem('Coughing', '/confrm-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg02} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Coughing</p>
            </div>
          </Link>
          <Link to="/confrm-step-yesno" onClick={() => { handleBreathingProblem('Chest Pain', '/confrm-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg03} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Chest Pain</p>
            </div>
          </Link>
          <Link to="/confrm-step-yesno" onClick={() => { handleBreathingProblem('Choking', '/confrm-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg04} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Choking</p>
            </div>
          </Link>
          <Link to="/confrm-step-yesno" onClick={() => { handleBreathingProblem('Mucus/Secretions', '/confrm-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg05} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Mucus/Secretions
              </p>
            </div>
          </Link>
          <Link to="/confrm-step-yesno" onClick={() => { handleBreathingProblem('Congested or Runny Nose', '/confrm-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg06} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Congested or Runny Nose
              </p>
            </div>
          </Link>
          <Link to="/confrm-step-yesno" onClick={() => { handleBreathingProblem('Heavy/Thick', '/confrm-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg07} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Heavy/Thick</p>
            </div>
          </Link>
          <Link to="/confrm-step-yesno" onClick={() => { handleBreathingProblem('CPAP/BiPAP', '/confrm-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg08} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">CPAP/BiPAP</p>
            </div>
          </Link>
          <Link to="/confrm-step-yesno" onClick={() => { handleBreathingProblem('Breathing Treatment', '/confrm-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg09} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">
                Breathing Treatment
              </p>
            </div>
          </Link>
          <Link to="/confrm-step-yesno" onClick={() => { handleBreathingProblem('Trach', '/confrm-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg10} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Trach</p>
            </div>
          </Link>
          <Link to="/confrm-step-yesno" onClick={() => { handleBreathingProblem('Something Else', '/confrm-step-yesno') }}>
            <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
              <div className="dashboard-img card-img-h rounded-2xl">
                <img src={dashimg11} className="w-full" />
              </div>
              <p className="text-[16px] mt-3 mb-2 color-black">Something Else</p>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BreathingProblem;
