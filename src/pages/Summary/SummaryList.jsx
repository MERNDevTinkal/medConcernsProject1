import React, { useEffect, useContext, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import SummaryLeftCard from "../../Component/SummaryConcern/SummaryLeftCard";
import { Arrow } from "../../Component/DiseasesData/images";
import Footer from "../../Component/Layout/Footer/Footer";
import SummaryRightCard from "../../Component/SummaryConcern/SummaryRightCard";
import { GlobalContext } from "../../context/DiseaseContext";
import SaveModel from "../../Component/saveASModel/saveModel";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import { useNavigate } from "react-router-dom";
import ConcernPopUp from "../../Component/concernPopUp/ConcernPop";
import Cookies from "js-cookie";
import SaveWarningPopup from "../../Component/SaveWarningPopup/SaveWarningPopup";
import { useSearchParams } from "react-router-dom";

const SummaryList = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const { diseases, clearAllDiseases } = useContext(GlobalContext);
  const [ShowSaveModal, setShowSaveModal] = useState(false);
  const [showDonePopUp, setshowDonePopUp] = useState(false);
  const [calendarOn, setCalendarOn] = useState(false);
  const [introductionOn, setIntroductionOn] = useState(false);
  const [saveAs, setSaveAs] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const saveData = () => {
    const licenses_id = localStorage.getItem("license_key");
    const token = localStorage.getItem("token");
    Cookies.remove("is_pain_flow");
    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    payload.append("name_key", saveAs);
    payload.append("summary_data", JSON.stringify(diseases));
    api
      .post("summaries", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data.status) {
          setShowSaveModal(false);
          toast.success(data.msg, {
            autoClose: 1500,
            onClose: navigate("/summary-list"),
          });
        }
      })
      .catch(({ response }) => {
        toast.error(response?.data?.message || response?.data?.msg, {
          autoClose: 1500,
        });
      });
  };
  const handleSummaryListRoute = () => {
    navigate("/summary-list");
  };
  useEffect(() => {
    getSetting(
      () => { },
      () => { },
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => { },
      () => { },
      () => { },
      () => { },
    );
  }, []);
  const confirmFun = (value) => {
    setshowDonePopUp(false);
    Cookies.remove("is_pain_flow");
    if (value === "Yes") {
      const lastValue = Cookies.get("is_concern");
      let count = 1;
      if (lastValue && lastValue.includes("_")) {
        count = Number(lastValue.split("_")[1]) + 1;
      }
      Cookies.set("is_concern", `true_${count}`);
      navigate("/concern");
    } else if (value === "No") {
      setIsPopupOpen(true);
      Cookies.remove("is_concern");
    }
  };

  const ConcernPopUpFun = () => {
    setshowDonePopUp((pre) => !pre);
  };

  const discardChanges = () => {
    setIsPopupOpen(false);
    clearAllDiseases();
    navigate("/concern");
  };

  const keepEditing = () => {
    setIsPopupOpen(false);
    setShowSaveModal(true);
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            isSummary={diseases?.summaryList?.length > 0 ? true : false}
            // setIsPopupOpen={setIsPopupOpen}
            selectedLanguage={selectedLanguage}
            calendarOn={calendarOn}
            introductionOn={introductionOn}
            name={selectedLanguage === "Spanish" ? "Resumen" : "Summary"}
          />
          {(diseases?.summaryList?.length > 0 || (name && id && name !== null && id !== null)) ? (
            <div className="main-wrapper home-wrapper">
              <div className="flex justify-end space-x-2 ">
                <button
                  onClick={() => window.print()}
                  style={{ border: "2px solid black" }}
                  className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-100"
                >
                  {selectedLanguage === "Spanish" ? "Imprimir" : "Print"}
                </button>
                <button
                  onClick={() => {
                    setShowSaveModal(true);
                  }}
                  style={{ border: "2px solid black" }}
                  className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-100"
                >
                  {selectedLanguage === "Spanish" ? "Ahorrar" : "Save"}
                </button>
                <button
                  onClick={handleSummaryListRoute}
                  style={{ border: "2px solid black" }}
                  className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-100"
                >
                  {selectedLanguage === "Spanish" ? "Lista" : "List"}
                </button>
              </div>
              {diseases?.summaryList?.length > 0 &&
                diseases?.summaryList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row items-start w-full my-5 summary-main common-scale justify-between"
                    >
                      <div className="md:w-1/4 sm:w-1/2 w-full">
                        <SummaryLeftCard
                          board={item?.flow[0]?.route}
                          selectedLanguage={selectedLanguage}
                          SummaryConcernData={item?.concern?.data?.[0]}
                          headerNames={diseases?.headerNames}
                        />
                      </div>
                      <div className="arrow-right mx-4 self-center">
                        <img src={Arrow} alt="arrow" />
                      </div>
                      <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-3 sm:gap-2 summary-list-right">
                        <SummaryRightCard
                          selectedLanguage={selectedLanguage}
                          SummaryDetail={item?.flow}
                        />
                      </div>
                    </div>
                  );
                })}
              {diseases?.summaryList[0]?.concern && (
                <div
                  onClick={() => {
                    ConcernPopUpFun();
                  }}
                  className="flex justify-center mb-2"
                >
                  <button className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-100">
                    {selectedLanguage === "Spanish" ? "Hecho" : "Done"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[70vh]">
              <h1 className="text-2xl font-semibold">
                {selectedLanguage === "Spanish"
                  ? "No hay resumen disponible"
                  : "No Summary Available"}
              </h1>
            </div>
          )}

          {ShowSaveModal && (
            <SaveModel
              selectedLanguage={selectedLanguage}
              saveData={saveData}
              setSaveAs={setSaveAs}
              setShowSaveModal={setShowSaveModal}
            />
          )}
          {showDonePopUp && (
            <ConcernPopUp
              selectedLanguage={selectedLanguage}
              confirmFun={confirmFun}
            />
          )}
          {isPopupOpen && (
            <SaveWarningPopup
              open={isPopupOpen}
              onConfirm={discardChanges}
              onCancel={keepEditing}
            />
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default SummaryList;
