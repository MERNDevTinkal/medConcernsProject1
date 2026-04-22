import React, { useEffect, useState } from "react";
import { HowAreYou1, BackArrow } from "../../Component/DiseasesData/images";
import { useLocation, Link, useParams } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import YesNo from "../../Component/YesNo/YesNo";
import { useNavigate } from "react-router-dom";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import { howareyou } from "../../../public/assets/ImagesImports";
import Header from "../../Component/Layout/Header/Header";
import { } from "react-router-dom";

function YesAndNo() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  const [loader, setLoader] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fatigueValue = queryParams.get('name');

  useEffect(() => {
    getSetting(
      () => { },
      setSelectedGender,
      setSelectedLanguage,
      () => { },
      () => { },
      setLoader,
      () => { },
      () => { },
      () => { },
      () => { },
    );
  }, []);

  const { id } = useParams();
  const option = howareyou.find((item) => item.id === Number(id));
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            introductionOn={''}
            calendarOn={''}
            name={
              (fatigueValue && fatigueValue !== null) ? fatigueValue : selectedLanguage === "Spanish"
                ? option?.nameEs || "Dolor"
                : option?.name || "Pain"
            }
          />
          <div className="main-wrapper home-wrapper items-center justify-center flex flex-col  min-h-[80vh]">
            <div className="grid grid-cols-2 gap-18  my-0 items-center common-scale mt-5">
              <div className="dashboard-cards brthng-card rounded-2xl bg-white text-center shadow-sm p-3">
                <div className="dashboard-img rounded-2xl w-full h-full">
                  {/* <img src={HowAreYou1} className="w-full" /> */}

                  <div className="w-full h-full">
                    {(fatigueValue && fatigueValue !== null) ? (
                      <div className="w-full h-full flex items-center justify-center   rounded-xl">
                        <div className="text-8xl font-bold ">
                          {id || 0}
                        </div>
                      </div>
                    ) : (
                      <img
                        src={option.image || HowAreYou1}
                        alt={option.name || "alt"}
                        className="mx-auto rounded-xl w-full content-cls"
                          draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <YesNo
                  id={id}
                  fatigueValue={fatigueValue}
                  selectedGender={selectedGender}
                  selectedLanguage={selectedLanguage}
                />
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default YesAndNo;
