import React from "react";
import Header from "../../Component/Layout/Header/Header";
import { Link } from "react-router-dom";
import BoardImg1 from "../../assets/images/board-img-01.png";
import BoardImg2 from "../../assets/images/board-img-02.png";
import BoardImg3 from "../../assets/images/board-img-03.png";
import BoardImg4 from "../../assets/images/board-img-04.png";
import BoardImg5 from "../../assets/images/board-img-05.png";
import BoardImg6 from "../../assets/images/board-img-06.png";
import Footer from "../../Component/Layout/Footer/Footer";

const NeedBoard = () => {
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper ">
        <div className="dashboard-h grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3.5 px-4 my-4">
          <Link to="/board-upload">
            <div className="dashboard-cards rounded-2xl bg-white text-center h-full py-2 px-3">
              <div className="dashboard-img flex justify-center items-center">
                <img src={BoardImg1} />
              </div>
              <p className="text-[12px] mt-4 color-black mb-0 ">Bathroom</p>
            </div>
          </Link>
          <Link to="/board-upload">
            <div className="dashboard-cards rounded-2xl bg-white text-center h-full py-2 px-3">
              <div className="dashboard-img flex justify-center items-center">
                <img src={BoardImg2} />
              </div>
              <p className="text-[12px] mt-4 color-black mb-0 ">Bed</p>
            </div>
          </Link>
          <Link to="/board-upload">
            <div className="dashboard-cards rounded-2xl bg-white text-center h-full py-2 px-3">
              <div className="dashboard-img flex justify-center items-center">
                <img src={BoardImg3} />
              </div>
              <p className="text-[12px] mt-4 color-black mb-0 ">Food</p>
            </div>
          </Link>
          <Link to="/board-upload">
            <div className="dashboard-cards rounded-2xl bg-white text-center h-full py-2 px-3">
              <div className="dashboard-img flex justify-center items-center">
                <img src={BoardImg4} />
              </div>
              <p className="text-[12px] mt-4 color-black mb-0 ">Drink</p>
            </div>
          </Link>
          <Link to="/board-upload">
            <div className="dashboard-cards rounded-2xl bg-white text-center h-full py-2 px-3">
              <div className="dashboard-img flex justify-center items-center">
                <img src={BoardImg5} />
              </div>
              <p className="text-[12px] mt-4 color-black mb-0 ">Pain Meds</p>
            </div>
          </Link>
          <Link to="/board-upload">
            <div className="dashboard-cards rounded-2xl bg-white text-center h-full py-2 px-3">
              <div className="dashboard-img flex justify-center items-center">
                <img src={BoardImg6} />
              </div>
              <p className="text-[12px] mt-4 color-black mb-0 ">Medication</p>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NeedBoard;
