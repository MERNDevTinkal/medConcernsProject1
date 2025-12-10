import React from "react";
import Header from "../../Component/Layout/Header/Header";
import PainDiagramFront from "../../Component/Paindiagram/PainDiagramFront";
import Footer from "../../Component/Layout/Footer/Footer";
import { Link } from "react-router-dom";

const PainFront = () => {
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper ">
        <div className="px-4 my-5 flex justify-center items-center">
          <div className="w-full p-5 bg-white shadow-sm rounded-md">
             <Link  to="/concern-pain">
              <PainDiagramFront />
             </Link>         
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PainFront;
