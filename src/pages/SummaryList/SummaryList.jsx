import React, { useState, useEffect } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import Loader from "../../Component/webLoader/loader";
import Pagination from "../../Component/pagination/pagination";
import getSetting from "../../Component/settingApi/settings";
import { FiEye, FiTrash2 } from "react-icons/fi";
import DeletePopUp from "../../Component/DeleteSummaryPopup/DeletePop";
const SummaryList = () => {
  const [summaryList, setSummaryList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [calendarOn, setCalendarOn] = useState(1);
  const [IntroductionOn, setIntroductionOn] = useState(1);
  const [lastPage, setLastPage] = useState(1); // From API
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchApi = () => {
    const token = localStorage.getItem("token");
    const license_key = localStorage.getItem("license_key");
    const payload = new FormData();
    payload.append("licenses_id", license_key);
    payload.append("page", currentPage);
    setLoader(true);
    api
      .post("summaries_all", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data.status) {
          setSummaryList(data.data);
          setCurrentPage(data.current_page);
          setLastPage(data.last_page);
        }
        setLoader(false);
      })
      .catch(({ response }) => {
        toast.error(response?.data?.message || response?.data?.msg, {
          autoClose: 1500,
        });
        setLoader(false);
      });
  }
  useEffect(() => {
    fetchApi();
  }, [currentPage]);

  const handleRoute = (name) => {
    navigate(`/summary-view/${name}`);
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
      () => { }
    );
  }, []);
  const confirmDelete = (Summary_id) => {
    const token = localStorage.getItem("token");
    const license_key = localStorage.getItem("license_key");
    const payload = new FormData();
    payload.append("licenses_id", license_key);
    payload.append("Summary_id", Summary_id);
    setLoader(true);
    api
      .post("summariDelete", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data?.status) {
          toast.success(data.msg, { autoClose: 1500 });

          setShowDeleteModal(false);
          fetchApi(); // refresh list only on success
        } else {
          toast.error(data.msg || "Delete failed", { autoClose: 1500 });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong", { autoClose: 1500 });
      })
      .finally(() => {
        setLoader(false);
      });

  }
  return (
    <>
      <Header
        selectedLanguage={selectedLanguage}
        calendarOn={calendarOn}
        introductionOn={IntroductionOn}
        name={
          selectedLanguage === "Spanish" ? "Lista resumida" : "Summary List"
        }
      />
      <DeletePopUp selectedLanguage={selectedLanguage} deleteId={deleteId} setShowDeleteModal={setShowDeleteModal} confirmDelete={confirmDelete} showDeleteModal={showDeleteModal} />
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper py-6 px-4">
          {summaryList.length > 0 ? (
            <>
              <ul className="space-y-3">
                {summaryList.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleRoute(item.name_key)}

                    className="flex justify-between items-center bg-[#ffff] hover:bg-[#ffff] px-4 py-3 rounded-full font-medium text-sm sm:text-base cursor-pointer transition-all duration-200"
                  >
                    <span>{item.name_key}</span>
                    <div className="flex items-center gap-4">
                      <FiEye
                        className="text-[#008CFF] text-lg cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); handleRoute(item.name_key); }}
                      />
                      <FiTrash2
                        className="text-red-500 text-lg cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(item.id);
                          setShowDeleteModal(true);
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <Pagination
                selectedLanguage={selectedLanguage}
                currentPage={currentPage}
                lastPage={lastPage}
                setCurrentPage={setCurrentPage}
              />
            </>
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
