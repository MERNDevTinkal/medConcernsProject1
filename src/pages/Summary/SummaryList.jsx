import React, { useEffect, useContext, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import SummaryLeftCard from "../../Component/SummaryConcern/SummaryLeftCard";
import Arrow from "../../assets/images/arrow.svg";
import Footer from "../../Component/Layout/Footer/Footer";
import SummaryRightCard from "../../Component/SummaryConcern/SummaryRightCard";
import { GlobalContext } from "../../context/DiseaseContext";
import SaveModel from "../../Component/saveASModel/saveModel";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import { useNavigate } from "react-router-dom";
const SummaryList = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const { diseases } = useContext(GlobalContext);
  const [ShowSaveModal, setShowSaveModal] = useState(false);
  const [saveAs, setSaveAs] = useState("");
  const saveData = () => {
    const licenses_id = localStorage.getItem("license_key");
    const token = localStorage.getItem("token");
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
      () => {},
      () => {},
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader
    );
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            name={
              selectedLanguage === "Spanish"
                ? "Lista veraniega"
                : "Summery List"
            }
          />
          {diseases?.concern?.name || diseases?.summaryList.length > 0 ? (
            <div className="main-wrapper home-wrapper">
              <div className="flex justify-end space-x-2">
                {/* <button
                  onClick={() => window.print()}
                  style={{ border: "2px solid black" }}
                  className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-100"
                >
                  {selectedLanguage === "Spanish" ? "Imprimir" : "Print"}
                </button> */}

                <button
                  onClick={handleSummaryListRoute}
                  style={{ border: "2px solid black" }}
                  className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-100"
                >
                  {selectedLanguage === "Spanish" ? "Lista" : "List"}
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
              </div>

              <div className="flex flex-row items-center w-full px-4 my-5 summary-main">
                <div className="md:w-1/4 sm:w-1/2 w-full">
                  <SummaryLeftCard
                    selectedLanguage={selectedLanguage}
                    SummaryConcernData={diseases?.concern}
                  />
                </div>
                <div className="arrow-right mx-4">
                  <img src={Arrow} alt="arrow" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4.5 sm:gap-3">
                  <SummaryRightCard
                    selectedLanguage={selectedLanguage}
                    SummaryDetail={diseases?.summaryList}
                  />
                </div>
              </div>
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
              saveData={saveData}
              setSaveAs={setSaveAs}
              setShowSaveModal={setShowSaveModal}
            />
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default SummaryList;
