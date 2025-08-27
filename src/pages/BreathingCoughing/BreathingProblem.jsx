import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { GlobalContext } from "../../context/DiseaseContext";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";

const BreathingProblem = () => {
  const location = useLocation();
  const path = location.pathname;
  const [problem, setProblems] = useState([]);
  const navigate = useNavigate();
  const { updateDisease, diseases } = useContext(GlobalContext);
  const handleBreathingProblem = (value, path) => {
    if (value && path) {
      console.log("pathpathpathpath", path)
      updateDisease("problems", value)
      navigate(path)
    }
  }
  useEffect(() => {
    console.log("===>path", path)
    setProblems(diseasesData[path])
  }, [path])
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="dashboard-h grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3.5 px-4 py-1.5 emotion-cards">
          {problem?.length > 0 && problem.map((data) => (
            <Link to={`${path}/confrm-step-yesno/${data?.id}`} key={data?.id} onClick={() => { handleBreathingProblem(data?.name, `${path}/confrm-step-yesno/${data?.id}`) }}>
              <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
                <div className="dashboard-img card-img-h rounded-2xl">
                  <img src={data?.image} className="w-full" />
                </div>
                <p className="text-[16px] mt-3 mb-2 color-black">
                  {data?.name || ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BreathingProblem;
