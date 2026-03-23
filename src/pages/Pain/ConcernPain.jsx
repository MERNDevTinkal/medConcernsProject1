import React, { useContext, useState, useEffect } from "react";
import DecisionCard from "../../Component/ProblemCard/DecisionCard";
import { ConcernImg1, BackArrow } from "../../Component/DiseasesData/images";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import { GlobalContext } from "../../context/DiseaseContext";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import Header from "../../Component/Layout/Header/Header";
function ConcernPain() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { partName, image } = state || {};
  const { deleteLastSummaryItem } = useContext(GlobalContext);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  const [loader, setLoader] = useState(true);
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
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {/* <div className="flex items-center justify-between py-4 fixed left-0 right-0 to-0 bg-white innr-header">
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                deleteLastSummaryItem();
                navigate(-1);
              }}
            >
              <img src={BackArrow} />
            </Link>
            <h2 className="Header-text text-[30px] font-medium text-black text-center py-2">
              {partName || "Pain"}
            </h2>
            <button></button>
          </div> */}
          <Header
            selectedLanguage={selectedLanguage}
            introductionOn={''}
            calendarOn={''}
            name={
              partName || "Pain"
            }
          />
          <div className="main-wrapper home-wrapper items-center justify-center flex flex-col">
            <div className="grid grid-cols-2 gap-18 my-5 items-center common-scale mt-12">
              <div className="dashboard-cards brthng-card rounded-2xl bg-white text-center shadow-sm p-3">
                <div className="dashboard-img rounded-2xl h-full w-full">
                  <div className="h-full w-full">
                    <img src={image || ConcernImg1} className="w-full" />
                  </div>
                </div>
              </div>
              <div>
                <DecisionCard
                  selectedLanguage={selectedLanguage}
                  partName={partName}
                  selectedGender={selectedGender}
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

export default ConcernPain;
