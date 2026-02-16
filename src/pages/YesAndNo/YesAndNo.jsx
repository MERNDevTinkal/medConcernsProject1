import React, { useEffect, useState } from "react";
import { HowAreYou1, BackArrow } from "../../Component/DiseasesData/images";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import YesNo from "../../Component/YesNo/YesNo";
import { useNavigate } from "react-router-dom";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import { howareyou } from "../../../public/assets/ImagesImports";

function YesAndNo() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getSetting(
      () => {},
      setSelectedGender,
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader,
      () => {},
      () => {},
      () => {},
      () => {},
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
          <div className="flex items-center justify-between py-4 fixed left-0 right-0 to-0 bg-white innr-header">
            <div
              onClick={() => {
                navigate(-1);
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={BackArrow} />
            </div>
            <h2 className="text-[30px] font-medium text-black text-center">
              {selectedLanguage === "Spanish"
                ? option?.nameEs || "Dolor"
                : option?.name || "Pain"}
            </h2>
            <button className="opacity-0">Medconcern</button>
          </div>
          <div className="main-wrapper home-wrapper items-center justify-center flex flex-col ">
            <div className="grid grid-cols-2 md:gap-18 gap-5 my-5 items-center common-scale mt-12">
              <div className="dashboard-cards brthng-card rounded-2xl bg-white text-center shadow-sm p-3">
                <div className="dashboard-img rounded-2xl w-full h-full">
                  {/* <img src={HowAreYou1} className="w-full" /> */}

                  <div className="w-full h-full">
                    <img
                      src={option.image || HowAreYou1}
                      alt={option.name || "alt"}
                      className="mx-auto rounded-xl w-full content-cls"
                    />
                  </div>
                </div>
              </div>
              <div>
                <YesNo
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
