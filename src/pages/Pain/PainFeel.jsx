import React from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer"; 
import PainCardsList from "./PainCardsList";

const PainFeel = () => {
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="dashboard-h grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3.5 px-4 py-1.5 emotion-cards">
          <PainCardsList />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PainFeel;
