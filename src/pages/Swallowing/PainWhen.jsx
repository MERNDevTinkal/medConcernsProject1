import React from "react";
import Header from "../../Component/Layout/Header/Header";
import { Link } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import Cards from "../../Component/Homecards/Cards";

const PainWhen = () => {
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper ">
        {/* grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
        <div className="dashboard-h grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 px-4 py-1.5">
          <Cards />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PainWhen;
