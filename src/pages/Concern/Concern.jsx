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
                className="dashboard-h grid gap-2 p-2"
                style={{
                  gridTemplateColumns:
                    selectedIconCount === 6
                      ? "repeat(3, 1fr)"
                      : `repeat(${selectedIconCount || 2}, 1fr)`,
                  gridTemplateRows:
                    selectedIconCount === 6 ? "repeat(2, 1fr)" : "auto",
                  height: selectedIconCount === 6 ? "100vh" : "auto",
                }}
              >
                {location.pathname === "/concern" ? (
                  <ConcernCard
                    skipKeys={selectedConcerns}
                    selectedLanguage={selectedLanguage}
                    selectedIconCount={selectedIconCount}
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
