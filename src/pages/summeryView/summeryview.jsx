import React, { useEffect, useState } from "react";
import SummaryLeftCard from "../../Component/SummaryConcern/SummaryLeftCard";
import Footer from "../../Component/Layout/Footer/Footer";
import SummaryRightCard from "../../Component/SummaryConcern/SummaryRightCard";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../Component/webLoader/loader";
import { useParams } from "react-router-dom";
import { Arrow } from "../../Component/DiseasesData/images";
import getSetting from "../../Component/settingApi/settings";
import Header from "../../Component/Layout/Header/Header";
const SummaryList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [summaryData, setSummaryData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  useEffect(() => {
    if (id) {
      const payload = new FormData();
      const token = localStorage.getItem("token");
      const license_key = localStorage.getItem("license_key");
      payload.append("search_key", id);
      payload.append("licenses_id", license_key);
      api
        .post("summaries_all", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          if (data.status) {
            setSummaryData(JSON.parse(data?.data[0]?.summary_data));
          } else {
            toast.error(data?.msg, { autoClose: 1500 });
          }
        })
        .catch(() => {
          toast.error(response?.data?.message || response?.data?.msg, {
            autoClose: 1500,
          });
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      toast.error("No summary ID provided.");
      setLoader(false);
    }
  }, [id]);
  useEffect(() => {
    getSetting(
      () => { },
      () => { },
      setSelectedLanguage,
      () => { },
      () => { },
      setLoader
    );
  }, []);
  const handleSummaryListRoute = () => {
    navigate("/summary-list");
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            isSummary={false}
            selectedLanguage={selectedLanguage}
            name={selectedLanguage === "Spanish" ? "Resumen" : "Summary"}
          />
          {summaryData?.summaryList?.length > 0 ? (
            <div className="main-wrapper home-wrapper">
              <div className="flex justify-end space-x-2 mb-2">
                <button
                  onClick={() => window.print()}
                  style={{ border: "2px solid black" }}
                  className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-100"
                >
                  {selectedLanguage === "Spanish" ? "Imprimir" : "Print"}
                </button>
                <button
                  onClick={handleSummaryListRoute}
                  style={{ border: "2px solid black" }}
                  className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-100"
                >
                  {selectedLanguage === "Spanish" ? "Lista" : "List"}
                </button>
              </div>
              {summaryData?.summaryList?.length > 0 &&
                summaryData?.summaryList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row items-center w-full my-5 summary-main"
                    >
                      <div className="md:w-1/2 sm:w-1/2 w-full">
                        <SummaryLeftCard
                          board={item?.flow?.[0]?.route}
                          selectedLanguage={selectedLanguage}
                          SummaryConcernData={item?.concern?.data?.[0]}
                          headerNames={summaryData?.headerNames}
                        />
                      </div>
                      <div className="arrow-right mx-4">
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
              {summaryData?.summaryList[0]?.concern && (
                <div
                  onClick={() => {
                    navigate("/summary-list");
                  }}
                  className="flex justify-center mt-10 mb-6"
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
          <Footer />
        </>
      )}
    </>
  );
};

export default SummaryList;
