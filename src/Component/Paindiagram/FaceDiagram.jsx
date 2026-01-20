import React, { useState, useRef, useEffect } from "react";
import { FaceDigram } from "../../Component/DiseasesData/images";
import Loader from "../../Component/webLoader/loader";
import Header from "../../Component/Layout/Header/Header";
const EarDiagram = () => {
  const [point, setPoint] = useState(null);
  const imageRef = useRef(null);
  const [loader, setLoader] = useState(true);
  const handleClick = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPoint({ x, y });
  };

  useEffect(() => {
    setLoader(false)
  }, [])

  return (
    <>
      {loader ? <Loader /> : (
        <>
          <Header
          // selectedLanguage={selectedLanguage}
          // calendarOn={calendarOn}
          // introductionOn={introductionOn}
          // name={
          //   selectedLanguage === "Spanish"
          //     ? "¿Cómo se siente en general?"
          //     : "How do you feel overall?"
          // }
          />
          <div className="max-w-4xl mx-auto px-4 md:px-8 mt-6 bg-white rounded-xl shadow-md relative">
            {/* Rectangle Card */}
            <div className="">

              {/* Image Wrapper */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[100%] pt-6"
              >
                <img
                  ref={imageRef}
                  src={FaceDigram}
                  alt="Face Diagram"
                  onClick={handleClick}
                  className="h-full w-auto object-contain cursor-crosshair select-none"
                  draggable={false}
                />

                {point && (
                  <div
                    className="absolute w-5 h-5 rounded-full bg-red-500/40 border-2 border-red-600 pointer-events-none"
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EarDiagram;
