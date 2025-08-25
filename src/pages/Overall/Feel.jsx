import React from "react";
import { Link } from "react-router-dom";
import feel01 from "../../assets/images/feel-icon-01.svg";
import feel02 from "../../assets/images/feel-icon-02.svg";
import feel03 from "../../assets/images/feel-icon-03.svg";
import feel04 from "../../assets/images/feel-icon-04.svg";
import feel05 from "../../assets/images/feel-icon-05.svg";
import Footer from "../../Component/Layout/Footer/Footer";
import BackArrow from "../../assets/images/back-arrow.svg";

const Feel = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
        <button>
          <img src={BackArrow} />
        </button>
        <h2 className="text-[25px] font-normal text-black">
          How do you feel overall?
        </h2>
        <button></button>
      </div>
      <div className="main-wrapper home-wrapper ">
        <div className="dashboard-wrapper px-4 py-1.5 feel-list-main">
          <ul className="flex flex-col gap-10 feel-list relative before:content-[''] before:absolute before:left-[50px] before:top-0 before:h-full before:w-[27px] before:bg-[linear-gradient(180deg,_#7ebe01_0%,_#fbcc00_25%,_#fbcc00_37.5%,_#f78d11_50%,_#f78d11_75%,_#f36218_87.5%,_#e92f1a_100%)]">
            <li>
              <Link className="flex gap-12 items-center">
                <img src={feel01} className="w-30" alt="" />
                <span className="text-[40px] font-medium color-black">
                  Good/Ok
                </span>
              </Link>
            </li>
            <li>
              <Link className="flex gap-12 items-center">
                <img src={feel02} className="w-30" alt="" />
                <span className="text-[40px] font-medium color-black">
                  A little off
                </span>
              </Link>
            </li>
            <li>
              <Link className="flex gap-12 items-center">
                <img src={feel03} className="w-30" alt="" />
                <span className="text-[40px] font-medium color-black">
                  Not good
                </span>
              </Link>
            </li>
            <li>
              <Link className="flex gap-12 items-center">
                <img src={feel04} className="w-30" alt="" />
                <span className="text-[40px] font-medium color-black">
                  Low/Sad
                </span>
              </Link>
            </li>
            <li>
              <Link className="flex gap-12 items-center">
                <img src={feel05} className="w-30" alt="" />
                <span className="text-[40px] font-medium color-black">
                  Very down
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Feel;
