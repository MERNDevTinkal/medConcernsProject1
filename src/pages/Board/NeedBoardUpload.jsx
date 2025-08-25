import React from "react";
import Header from "../../Component/Layout/Header/Header";
import UploadIcon from "../../assets/images/upload.svg";
import VoiceIcon from "../../assets/images/voice.svg";
import Footer from "../../Component/Layout/Footer/Footer";

const NeedBoardUpload = () => {
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper ">
        <div className="mx-5 my-5">
          <div className="py-9 px-5 bg-white shadow-lg rounded-2xl">
            <form>
              <div className="flex items-center mb-9 gap-11 justify-between upload-frm">
                <div className="w-[266px]">
                  <label
                    htmlFor="name"
                    className="block text-[16px] mb-4 font-medium text-black"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none border-[#D6D6D6] h-[54px]"
                  />
                </div>
                <div className=" text-center">
                  <label
                    htmlFor=""
                    className="block text-[16px] mb-6 font-medium text-black"
                  >
                    Audio
                  </label>
                  <button type="button">
                    <img src={VoiceIcon} />
                  </button>
                </div>
                <div className="w-[266px]">
                  <label
                    htmlFor=""
                    className="block text-[16px] mb-4 font-medium text-black"
                  >
                    Upload Image
                  </label>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer px-3 bg-white flex items-center justify-between rounded-xl border-1 border-dashed border-[#D6D6D6] w-full h-[54px]"
                  >
                    <input id="file-upload" type="file" className="hidden" />
                    <p className="text-sm font-normal text-[16px] color-[#0009]">
                      Choose File
                    </p>
                    <img src={UploadIcon} />
                  </label>
                </div>
              </div>
              <button className="thm-btn w-20" type="button">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NeedBoardUpload;
