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
  const [concerns, setUncheckConcerns] = useState(null);
  const [loader, setLoader] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      setSelectedGender,
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader,
      () => {},
      () => {},
      () => {},
      setUncheckConcerns
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
                  ? "Tablero Temático"
                  : "Topic Board"
                : selectedLanguage === "Spanish"
                ? "Preocupaciones"
                : "Concerns"
            }
          />

          <div className="main-wrapper home-wrapper ">
            <div
              className="dashboard-h grid gap-3 p-3"
              style={{
                gridTemplateColumns:
                  selectedIconCount === 6
                    ? "repeat(3, 1fr)" // 3 per row
                    : `repeat(${selectedIconCount || 2}, 1fr)`,
                gridTemplateRows:
                  selectedIconCount === 6 ? "repeat(2, 1fr)" : "auto",
              }}
            >
              {location.pathname === "/concern" ? (
                <ConcernCard
                  skipKeys={selectedConcerns}
                  selectedLanguage={selectedLanguage}
                  selectedIconCount={selectedIconCount}
                  selectedGender={selectedGender}
                />
              ) : (
                <TopicBoard
                  selectedLanguage={selectedLanguage}
                  selectedIconCount={selectedIconCount}
                  selectedGender={selectedGender}
                />
              )}
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Concern;
