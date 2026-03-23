import React, { useEffect, useState } from "react";
import { BackArrow } from "../../Component/DiseasesData/images";
import Footer from "../../Component/Layout/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Component/webLoader/loader";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import Pagination from "../../Component/pagination/pagination";
import getSetting from "../../Component/settingApi/settings";
import Header from "../../Component/Layout/Header/Header";
const WhiteBoardList = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [savedDrawings, setSavedDrawings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // State for delete confirmation popup
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [drawingToDelete, setDrawingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchDrawings(currentPage);
  }, [currentPage]);

  const fetchDrawings = (page) => {
    const token = localStorage.getItem("token");
    const licenses_id = localStorage.getItem("license_key");
    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    payload.append("page", page);

    api
      .post("whiteBoardlist", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data.status) {
          setSavedDrawings(data.data);
          setLastPage(data.last_page || 1);
        } else {
          toast.error(data.msg, { autoClose: 1500 });
        }
        setLoader(false);
      })
      .catch(({ response }) => {
        toast.error(response?.data?.message || response?.data?.msg, {
          autoClose: 1500,
        });
        setLoader(false);
      });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
  };

  const handleNavigate = (id) => {
    navigate(`/whiteboard/${id}`);
  };

  const handleDeleteClick = (e, drawing) => {
    e.stopPropagation(); // Prevent triggering the row click event
    setDrawingToDelete(drawing);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    if (!drawingToDelete) return;

    setIsDeleting(true);
    const token = localStorage.getItem("token");
    const licenses_id = localStorage.getItem("license_key");

    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    payload.append("white_id", drawingToDelete.id);
    api
      .post("whiteBoardDelete", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data.status) {
          toast.success(data.msg || "Whiteboard deleted successfully", { autoClose: 1500 });
          // Refresh the list
          fetchDrawings(currentPage);
        } else {
          toast.error(data.msg || "Failed to delete whiteboard", { autoClose: 1500 });
        }
        setIsDeleting(false);
        setShowDeletePopup(false);
        setDrawingToDelete(null);
      })
      .catch(({ response }) => {
        toast.error(response?.data?.message || response?.data?.msg || "An error occurred", {
          autoClose: 1500,
        });
        setIsDeleting(false);
        setShowDeletePopup(false);
        setDrawingToDelete(null);
      });
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setDrawingToDelete(null);
  };

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

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {/* <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 top-0 bg-white innr-header">
            <Link to="/whiteboard">
              <img src={BackArrow} alt="Back" />
            </Link>
            <h1 className="text-[25px] font-normal text-black">
              {selectedLanguage === "Spanish" ? "Pizarra" : "Whiteboard"}
            </h1> */}
          {/* <Link to="#">{/* <img src={NextArrow} alt="Next" /> */}

          <Header
            selectedLanguage={selectedLanguage}
            introductionOn={''}
            calendarOn={''}
            name={
              (location.pathname === "/whiteboard"
                && selectedLanguage === "Spanish")
                ? "Pizarra"
                : "Whiteboard"
            }
          />
          <div className="main-wrapper home-wrapper pt-20">
            <div className="px-4">
              {savedDrawings.length > 0 ? (
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h5 className="px-6 py-3 text-[20px] font-normal text-black">
                      #
                    </h5>
                    <h5 className="px-6 py-3 text-[20px] font-normal text-black">
                      {selectedLanguage === "Spanish" ? "Nombre" : "Name"}
                    </h5>
                    <h5 className="px-6 py-3 text-[20px] font-normal text-black">
                      {selectedLanguage === "Spanish" ? "Fecha" : "Date"}
                    </h5>
                    <h5 className="px-6 py-3 text-[20px] font-normal text-black">
                      {selectedLanguage === "Spanish" ? "Acción" : "Action"}
                    </h5>
                  </div>

                  {savedDrawings.map((d, index) => (
                    <div
                      onClick={() => handleNavigate(d.id)}
                      style={{ cursor: "pointer" }}
                      key={d.id}
                      className="flex justify-between items-center py-3.5 px-5 bg-white rounded-2xl shadow-lg mb-2 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h5 className="text-black text-[18px] font-normal">
                        {(currentPage - 1) * 10 + (index + 1)}
                      </h5>
                      <h5 className="text-black text-[18px] font-normal">
                        {d.name_key}
                      </h5>
                      <h5 className="text-black text-[18px] font-normal">
                        {formatDate(d.createdAt)}
                      </h5>
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-50 transition-colors duration-200"
                        onClick={(e) => handleDeleteClick(e, d)}
                      >
                        {/* Replace this with your actual delete icon */}
                        <svg
                          className="w-5 h-5 text-red-500 hover:text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4">
                    <Pagination
                      selectedLanguage={selectedLanguage}
                      currentPage={currentPage}
                      lastPage={lastPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[70vh]">
                  <p className="text-lg font-semibold text-gray-600">
                    {selectedLanguage === "Spanish"
                      ? "No hay datos"
                      : "No Data"}
                  </p>
                </div>
              )}
            </div>
            <Footer />
          </div>

          {/* Delete Confirmation Popup */}
          {showDeletePopup && drawingToDelete && (
            <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {selectedLanguage === "Spanish" ? "Confirmar eliminación" : "Confirm Delete"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {selectedLanguage === "Spanish"
                      ? `¿Estás seguro de que deseas eliminar "${drawingToDelete.name_key}"? Esta acción no se puede deshacer.`
                      : `Are you sure you want to delete "${drawingToDelete.name_key}"? This action cannot be undone.`}
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={cancelDelete}
                      disabled={isDeleting}
                      className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                    >
                      {selectedLanguage === "Spanish" ? "Cancelar" : "Cancel"}
                    </button>
                    <button
                      onClick={confirmDelete}
                      disabled={isDeleting}
                      className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isDeleting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {selectedLanguage === "Spanish" ? "Eliminando..." : "Deleting..."}
                        </>
                      ) : (
                        selectedLanguage === "Spanish" ? "Eliminar" : "Delete"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WhiteBoardList;