import React from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import PainDiagramBack from "../../Component/Paindiagram/PainDiagramBack";
import { Link } from "react-router-dom";

const BackPain = () => {
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="px-4 my-5 flex justify-center items-center">
          <div className="w-full p-5 bg-white shadow-sm rounded-md">
            <PainDiagramBack />
            <div className="flex justify-end">
              <Link className="thm-btn" to="/face-pain">
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BackPain;
