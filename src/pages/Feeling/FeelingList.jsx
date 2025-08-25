import React from "react";
import BackArrow from "../../assets/images/back-arrow.svg";
import Emo1 from "../../assets/images/emo-01.svg";
import Emo2 from "../../assets/images/emo-02.svg";
import Emo3 from "../../assets/images/emo-03.svg";
import Emo4 from "../../assets/images/emo-04.svg";
import Emo5 from "../../assets/images/emo-05.svg";
import Emo6 from "../../assets/images/emo-06.svg";
import { Link } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";

const FeelingList = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
        <button>
          <img src={BackArrow} />
        </button>
        <h2 className="text-[25px] font-normal text-black">
          How bad is your pain?
        </h2>
        <button></button>
      </div>
      <div className="main-wrapper home-wrapper">
        <div className="w-full max-w-4xl mx-auto p-6 ">
          <div className="space-y-0">
            {/* <!-- Scale Numbers --> */}
            <div className="flex justify-between items-center text-bar">
              <div className="text-2xl font-bold text-gray-800">0</div>
              <div className="text-2xl font-bold text-gray-800">1</div>
              <div className="text-2xl font-bold text-gray-800">2</div>
              <div className="text-2xl font-bold text-gray-800">3</div>
              <div className="text-2xl font-bold text-gray-800">4</div>
              <div className="text-2xl font-bold text-gray-800">5</div>
              <div className="text-2xl font-bold text-gray-800">6</div>
              <div className="text-2xl font-bold text-gray-800">7</div>
              <div className="text-2xl font-bold text-gray-800">8</div>
              <div className="text-2xl font-bold text-gray-800">9</div>
              <div className="text-2xl font-bold text-gray-800">10</div>
            </div>

            {/* <!-- Color Gradient Bar --> */}
            <div className="relative h-4 gradient-bar mt-3 mb-8">
              {/* <!-- Scale markers --> */}
              <div className="absolute inset-0 top-7.5 flex justify-between items-center px-1 left-0 line-bar">
                <div className="w-2 h-[30px] line-1"></div>
                <div className="w-2 h-[30px] line-2"></div>
                <div className="w-2 h-[30px] line-3"></div>
                <div className="w-2 h-[30px] line-4"></div>
                <div className="w-2 h-[30px] line-5"></div>
                <div className="w-2 h-[30px] line-6"></div>
                <div className="w-2 h-[30px] line-7"></div>
                <div className="w-2 h-[30px] line-8"></div>
                <div className="w-2 h-[30px] line-9"></div>
                <div className="w-2 h-[30px] line-10"></div>
                <div className="w-2 h-[30px] line-11"></div>
              </div>
            </div>

            {/* <!-- Pain Level Labels --> */}
            <div className="flex justify-between items-center text-sm font-normal text-gray-700 mb-8 bttm-txt-bar flex-wrap">
              <span className="text-[16px] font-medium">No Pain</span>
              <span className="text-[16px] font-medium">Mild</span>
              <span className="text-[16px] font-medium">Moderate</span>
              <span className="text-[16px] font-medium">Severe</span>
              <span className="text-[16px] font-medium">Very Severe</span>
              <span className="text-[16px] font-medium">
                Worst Pain <br /> Imaginable
              </span>
            </div>

            {/* <!-- Emoji Faces --> */}
            <div className="flex flex-wrap justify-between items-center emoji-bar">
              <div className="flex flex-col items-center space-y-1  mb-3">
                <img src={Emo1} alt="" />
                <span className="pt-1.5 px-5 bg-white rounded-full shadow-2xl text-[20px] leading-normal mt-4 border-2 border-white cursor-pointer hover:border-blue-600 transition-colors duration-300">
                  0
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2  mb-3">
                <img src={Emo2} alt="" />
                <span className="pt-1.5 px-5 bg-white rounded-full shadow-2xl text-[20px] leading-normal mt-4 border-2 border-white cursor-pointer hover:border-blue-600 transition-colors duration-300">
                  1 - 2
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2 mb-3">
                <img src={Emo3} alt="" />
                <span className="pt-1.5 px-5 bg-white rounded-full shadow-2xl text-[20px] leading-normal mt-4 border-2 border-white cursor-pointer hover:border-blue-600 transition-colors duration-300">
                  3 - 4
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2 mb-3">
                <img src={Emo4} alt="" />
                <span className="pt-1.5 px-5 bg-white rounded-full shadow-2xl text-[20px] leading-normal mt-4 border-2 border-white cursor-pointer hover:border-blue-600 transition-colors duration-300">
                  5- 6
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2 mb-3">
                <img src={Emo5} alt="" />
                <span className="pt-1.5 px-5 bg-white rounded-full shadow-2xl text-[20px] leading-normal mt-4 border-2 border-white cursor-pointer hover:border-blue-600 transition-colors duration-300">
                  7 - 8
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2 mb-3">
                <img src={Emo6} alt="" />
                <span className="pt-1.5 px-5 bg-white rounded-full shadow-2xl text-[20px] leading-normal mt-4 border-2 border-white cursor-pointer hover:border-blue-600 transition-colors duration-300">
                  9-10
                </span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FeelingList;
