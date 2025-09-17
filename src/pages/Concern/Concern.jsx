import React, { useEffect, useState } from "react";
import ConcernCard from "../../Component/ConcernCard/ConcernCard";
import TopicBoard from "../../Component/TopicBoard/TopicBoard";
import Header from "../../Component/Layout/Header/Header";
import Cards from "../../Component/Homecards/Cards";
import Footer from "../../Component/Layout/Footer/Footer";
import { useLocation } from "react-router-dom";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";

const Concern = () => {
  const location = useLocation();
  const [selectedIconCount, setSelectedIconCount] = React.useState(0);
  const [concerns, setConcerns] = useState(null);
  const [loader, setLoader] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      () => {},
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader,
      setConcerns
    );
  }, []);

  const selectedConcerns = concerns ? concerns.split(",").filter(Boolean) : [];
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            name={
              location.pathname === "/topic-board"
                ? selectedLanguage === "Spanish"
                  ? "Tablero de temas"
                  : "Topic Board"
                : selectedLanguage === "Spanish"
                ? "Preocupaciones"
                : "Concerns"
            }
          />

          <div className="main-wrapper home-wrapper ">
            <div className="dashboard-wrapper px-4 py-1.5">
              <div
                className={`dashboard-h grid  gap-7 sm:grid-cols-${
                  selectedIconCount || 3
                } md:grid-cols-${selectedIconCount || 4} grid-cols-${
                  selectedIconCount || 2
                } py-3`}
              >
                {location.pathname === "/concern" ? (
                  <ConcernCard
                    skipKeys={selectedConcerns}
                    selectedLanguage={selectedLanguage}
                  />
                ) : (
                  <TopicBoard selectedLanguage={selectedLanguage} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Concern;
