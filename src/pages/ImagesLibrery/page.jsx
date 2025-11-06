import React, { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import Footer from "../../Component/Layout/Footer/Footer";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
export default function ImagesLibrery() {
  const Images = import.meta.glob("../../assets/images/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });

  // ✅ Convert object to array of image URLs
  const imageList = Object.values(Images).map((img) => img.default);
  const [selectedIconCount, setSelectedIconCount] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [CalendarOn, setCalendarOn] = React.useState("");
  const [IntroductionOn, setIntroductionOn] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [selectedGender, setSelectedGender] = React.useState("");

  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      setSelectedGender,
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

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper">
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
              {/* ✅ Use imageList instead of Images */}
              {imageList.map((src, index) => (
                <div
                  key={index}
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
                  style={{ cursor: "pointer" }}
                >
                  <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
                    <div className="dashboard-img card-img-h rounded-2xl">
                      <img
                        src={src}
                        className="w-full"
                        alt={`image-${index}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
