import React, { useState, useEffect } from "react";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";

export default function ImagesLibrery() {
  const Images = import.meta.glob(
    "../../assets/ImagesLibrery/*.{png,jpg,jpeg,svg}",
    { eager: true }
  );
  const navigate = useNavigate();
  const location = useLocation();
  const {
    oldImages,
    paths,
    textBlocks,
    selectedImages: initialSelected,
    pathname,
  } = location.state || {};

  const imageList = Object.values(Images).map((img) => img.default);
  const [selectedIconCount, setSelectedIconCount] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [CalendarOn, setCalendarOn] = useState("");
  const [IntroductionOn, setIntroductionOn] = useState("");
  const [loader, setLoader] = useState(true);
  const [selectedImages, setSelectedImages] = useState(initialSelected || []);

  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      () => {},
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => {},
      () => {},
      () => {},
      () => {}
    );
  }, []);

  const handleImageClick = (src) => {
    setSelectedImages((prev) =>
      prev.includes(src) ? prev.filter((img) => img !== src) : [...prev, src]
    );
  };

  const handleDone = () => {
    navigate(pathname, {
      state: {
        selectedImages,
        oldImages,
        paths,
        textBlocks,
      },
    });
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper">
          <div className="imagelibarary-header ">
            <button
              onClick={handleDone}
              className="thm-btn px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700  "
            >
              Done
            </button>
          </div>
          <div className="dashboard-wrapper px-4 py-1.5">
            <div
              className="dashboard-h grid gap-3 p-3"
              style={{
                gridTemplateColumns:
                  selectedIconCount === 6
                    ? "repeat(3, 1fr)"
                    : `repeat(${selectedIconCount || 2}, 1fr)`,
                gridTemplateRows:
                  selectedIconCount === 6 ? "repeat(2, 1fr)" : "auto",
              }}
            >
              {imageList.map((src, index) => {
                const isSelected = selectedImages.includes(src);
                return (
                  <div
                    key={index}
                    onClick={() => handleImageClick(src)}
                    style={{ cursor: "pointer" }}
                    className={
                      selectedIconCount === 1
                        ? "dash-single-items"
                        : selectedIconCount === 2
                        ? "dash-double-items"
                        : selectedIconCount === 3
                        ? "dash-triple-items"
                        : selectedIconCount === 4
                        ? "dash-quadriple-items"
                        : selectedIconCount === 6
                        ? "dash-hexuple-items"
                        : ""
                    }
                  >
                    <div
                      className={`dashboard-cards rounded-2xl bg-white text-center border-4 transition-all duration-300 shadow-sm relative ${
                        isSelected
                          ? "border-blue-500 scale-95"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1 z-10 shadow-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <div className="dashboard-img card-img-h rounded-2xl overflow-hidden relative">
                        {isSelected && (
                          <div className="absolute inset-0 bg-blue-500/10 z-0"></div>
                        )}
                        <img
                          src={src}
                          className="w-full h-full object-contain rounded-2xl relative z-10"
                          alt={`image-${index}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}