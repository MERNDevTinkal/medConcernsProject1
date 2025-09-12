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

  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      () => {},
      () => {},
      () => {},
      () => {},
      setLoader,
      setConcerns
    );
  }, []);

  const selectedConcerns = concerns ? concerns.split(",").filter(Boolean) : [];
  return (
    <>
      <Header
        name={location.pathname === "/topic-board" ? "Topic Board" : "Concerns"}
      />
      {loader ? (
        <Loader />
      ) : (
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
                // ✅ skip those concerns which are already in selectedConcerns
                <ConcernCard skipKeys={selectedConcerns} />
              ) : (
                <TopicBoard />
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Concern;
