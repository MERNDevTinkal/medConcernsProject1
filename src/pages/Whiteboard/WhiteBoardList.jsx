import React, { useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import BackArrow from "../../assets/images/back-arrow.svg";
import NextArrow from "../../assets/images/next-arrow.svg";
import Footer from "../../Component/Layout/Footer/Footer";
import { Link } from "react-router-dom";

const WhiteBoardList = () => {
  const [savedDrawings, setSavedDrawings] = useState(
    localStorage.getItem("drwaings")
      ? JSON.parse(localStorage.getItem("drwaings"))
      : [] || []
  );

  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
        <Link to="/whiteboard">
          <img src={BackArrow} />
        </Link>
        <h1 className="text-[25px] font-normal text-black">Whiteboard</h1>
        <Link>
          <img src={NextArrow} />
        </Link>
      </div>
      <div className="main-wrapper home-wrapper">
        <div className="px-4">
          {savedDrawings.length > 0 && (
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h5 className="px-6 py-3 text-[20px] font-normal text-black">
                  #
                </h5>
                <h5 className="px-6 py-3 text-[20px] font-normal text-black">
                  Name
                </h5>
                <h5 className="px-6 py-3 text-[20px] font-normal text-black">
                  Date
                </h5>
              </div>
              {savedDrawings.map((d) => (
                <div className="flex justify-between items-center py-3.5 px-5 bg-white rounded-2xl shadow-lg mb-2">
                  <h5 className=" text-black text-[18px] font-normal ">1</h5>
                  <h5 className=" text-black text-[18px] font-normal ">
                    {d.name}
                  </h5>
                  <h5 className=" text-black text-[18px] font-normal ">
                    09/ 24/ 2021
                  </h5>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default WhiteBoardList;
