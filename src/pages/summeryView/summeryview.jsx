import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import SummaryLeftCard from "../../Component/SummaryConcern/SummaryLeftCard";
import Arrow from "../../assets/images/arrow.svg";
import Footer from "../../Component/Layout/Footer/Footer";
import SummaryRightCard from "../../Component/SummaryConcern/SummaryRightCard";
import SaveModel from "../../Component/saveASModel/saveModel";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../Component/webLoader/loader";
import { useParams } from "react-router-dom";

const SummaryList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const [summaryData, setSummaryData] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (id) {
      const payload = new FormData();
      const license_key = sessionStorage.getItem("license_key");
      payload.append("search_key", id);
      payload.append("licenses_id", license_key);
      api
        .post("summaries_all", payload)
        .then(({ data }) => {
          if (data.status) {
            setSummaryData(JSON.parse(data?.data[0]?.summary_data));
          } else {
            toast.error("Failed to load summary.");
          }
        })
        .catch(() => {
          toast.error("Error fetching summary.");
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      toast.error("No summary ID provided.");
      setLoader(false);
    }
  }, [id]);
  return (
    <>
      <Header name={"Summary Detail"} />
      {loader ? (
        <Loader />
      ) : summaryData?.concern || summaryData?.summaryList > 0 ? (
        <div className="main-wrapper home-wrapper">
          <div className="flex flex-row items-center w-full px-4 my-5 summary-main">
            <div className="md:w-1/4 sm:w-1/2 w-full">
              <SummaryLeftCard SummaryConcernData={summaryData.concern} />
            </div>
            <div className="arrow-right mx-4">
              <img src={Arrow} alt="arrow" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4.5 sm:gap-3">
              <SummaryRightCard SummaryDetail={summaryData.summaryList} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-2xl font-semibold">No Summary Available</h1>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SummaryList;
