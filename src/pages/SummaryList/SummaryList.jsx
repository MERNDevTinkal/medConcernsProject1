import React, { useContext, useState, useEffect } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import Loader from "../../Component/webLoader/loader";
const SummaryList = () => {
  const [summaryList, setSummaryList] = useState([]);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const license_key = sessionStorage.getItem("license_key");
    const payload = new FormData();
    payload.append("licenses_id", license_key);
    api
      .post("summaries_all", payload)
      .then(({ data }) => {
        if (data.status) {
          setSummaryList(data.data);
          setLoader(false);
        }
      })
      .catch(({ response }) => {
        if (response.data.status) {
          toast.error(response.data.message);
        }
      });
  }, []);
  return (
    <>
      <Header name={"Summary List"} />
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper py-6 px-4">
          {summaryList.length > 0 ? (
            <ul className="space-y-3">
              {summaryList.map((item, index) => (
                <li
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="flex justify-between items-center bg-[#ffff] hover:bg-[#ffff] px-4 py-3 rounded-full font-medium text-sm sm:text-base  cursor-pointer transition-all duration-200"
                >
                  <span>{item.text}</span>
                  <span className="text-xl text-[#008CFF]">→</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-600 text-lg mt-10">
              No summary available.
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default SummaryList;
