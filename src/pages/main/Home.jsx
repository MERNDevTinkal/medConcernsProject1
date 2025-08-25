import React from "react";
import logoicon from "../../assets/images/logo-icon.svg";
import mainimg from "../../assets/images/main-img.png";
import download from "../../assets/images/download.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="welcome-new bg-[#DCECFC]">
        <div className="min-h-screen main-h  flex items-center justify-center">
          <div className="w-full flex flex-col items-center text-center px-5">
            {/* Logo and Title */}
            <div className="mb-6">
              <img
                src={logoicon}
                alt="MedConcerns Logo"
                className="w-40 mx-auto mb-2"
              />
            </div>
            <div>
              <h1 className="text-[24px] color-[#000] font-medium mb-2">
                Welcome to MedConcerns{" "}
              </h1>
              <h5 className="text-[16px] font-normal">
                Download the app to get started
              </h5>
            </div>
            <div>
              <img src={mainimg} className="w-full mx-auto mb-4 mt-4" alt="" />
            </div>
            <Link
              to="/main"
              className="flex justify-center gap-2 bg-[#008CFF] text-white py-3 px-5 text-base mt-3 rounded-xl text-center text-[18px]"
            >
              Download Now <img src={download} alt="" />
            </Link>
            <div>
              <h4 className="text-[18px] font-medium mt-5">
                Are you a hospital admin? <br />
                <Link to="/main" className="primary-text underline">
                  click here to login
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
