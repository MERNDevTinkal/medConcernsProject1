import React, { useEffect, useContext, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import SummaryLeftCard from "../../Component/SummaryConcern/SummaryLeftCard";
import Arrow from "../../assets/images/arrow.svg";
import Footer from "../../Component/Layout/Footer/Footer";
import SummaryRightCard from "../../Component/SummaryConcern/SummaryRightCard";
import { GlobalContext } from "../../context/DiseaseContext";
import SaveModel from "../../Component/saveASModel/saveModel";
import api from "../../Component/apiCall/apiCall";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SummaryList = () => {
  const { diseases } = useContext(GlobalContext);
  const [ShowSaveModal, setShowSaveModal] = useState(false);
  const [saveAs, setSaveAs] = useState("");
  const saveData = () => {
    const licenses_id = sessionStorage.getItem("license_key");
    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    payload.append("name_key", saveAs);
    payload.append("summary_data", JSON.stringify(diseases));
    api
      .post("summaries", payload)
      .then(({ data }) => {
        if (data.status) {
          setShowSaveModal(false);
          toast.success(data.msg);
        }
      })
      .catch(({ response }) => {
        if (response.data.status) {
          toast.error(response.data.message);
        }
      });
  };
  return (
    <>
      <Header name={"Summery List"} />
      {diseases?.concern?.name || diseases?.summaryList.length > 0 ? (
        <div className="main-wrapper home-wrapper">
          <div className="flex justify-end space-x-2">
            <button
              style={{ border: "2px solid black" }}
              className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-100"
            >
              List
            </button>
            <button
              onClick={() => {
                setShowSaveModal(true);
              }}
              style={{ border: "2px solid black" }}
              className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-100"
            >
              Save
            </button>
          </div>

          <div className="flex flex-row items-center w-full px-4 my-5 summary-main">
            <div className="md:w-1/4 sm:w-1/2 w-full">
              <SummaryLeftCard SummaryConcernData={diseases?.concern} />
            </div>
            <div className="arrow-right mx-4">
              <img src={Arrow} alt="arrow" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4.5 sm:gap-3">
              <SummaryRightCard SummaryDetail={diseases?.summaryList} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-2xl font-semibold">No Summary Available</h1>
        </div>
      )}
      {ShowSaveModal && (
        <SaveModel
          saveData={saveData}
          setSaveAs={setSaveAs}
          setShowSaveModal={setShowSaveModal}
        />
      )}
      <ToastContainer />
      <Footer />
    </>
  );
};

export default SummaryList;
