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
  const uploadedImages = location.state?.uploadedImages ?? [];
  console.log("dddd", location.state)
  const oldImages = location.state?.oldImages ?? [];
  const pathname = location.state?.pathname ?? [];
  const imageList = Object.values(Images).map((img) => img.default);
  const [selectedIconCount, setSelectedIconCount] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [CalendarOn, setCalendarOn] = useState("");
  const [IntroductionOn, setIntroductionOn] = useState("");
  const [loader, setLoader] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  console.log("Ffffff", oldImages)
  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      () => { },
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => { },
      () => { },
      () => { },
      () => { }
    );
    // setSelectedImages((oldImages) => [
    //   ...oldImages,
    //   ...uploadedImages,
    // ]);
  }, []);
  useEffect(() => {
    const mergedImages = [...new Set([...oldImages, ...uploadedImages])];
    setSelectedImages(mergedImages);
  }, [oldImages, uploadedImages]);
  const handleImageClick = (src) => {
    setSelectedImages((prev) =>
      prev.includes(src)
        ? prev.filter((img) => img !== src)
        : [...prev, src]
    );
  };
  const handleDone = () => {
    console.log("===>selectedImages", selectedImages)
    navigate(pathname, { state: { selectedImages } });
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper">
          <div className="flex justify-end mt-6">
            <button
              onClick={handleDone}
              className="thm-btn px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
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
                      className={`dashboard-cards rounded-2xl bg-white text-center border-4 transition-colors duration-300 shadow-sm ${isSelected
                        ? "border-blue-500"
                        : "border-white hover:border-gray-300"
                        }`}
                    >
                      <div className="dashboard-img card-img-h rounded-2xl">
                        <img
                          src={src}
                          className="w-full rounded-2xl"
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
