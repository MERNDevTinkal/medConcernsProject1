import React from "react";
import ConcernCard from "../../Component/ConcernCard/ConcernCard";
import Header from "../../Component/Layout/Header/Header";
import Cards from "../../Component/Homecards/Cards";
import Footer from "../../Component/Layout/Footer/Footer";

const Concern = () => {
  return (
    <>
      <Header name={'Concerns'} />
      <div className="main-wrapper home-wrapper ">
        <div className="dashboard-wrapper px-4 py-1.5">
          <div className="dashboard-h grid  gap-7 sm:grid-cols-3 md:grid-cols-4 grid-cols-2 py-3">
            <ConcernCard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Concern;
