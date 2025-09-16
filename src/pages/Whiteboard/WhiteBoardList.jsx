import React, { useEffect, useState } from "react";
import BackArrow from "../../assets/images/back-arrow.svg";
import Footer from "../../Component/Layout/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Component/webLoader/loader";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import Pagination from "../../Component/pagination/pagination";

const WhiteBoardList = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [savedDrawings, setSavedDrawings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

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

  const handleNavigate = (name) => {
    navigate(`/whiteboard/${name}`);
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 top-0 bg-white innr-header">
        <Link to="/whiteboard">
          <img src={BackArrow} alt="Back" />
        </Link>
        <h1 className="text-[25px] font-normal text-black">Whiteboard</h1>
        <Link to="#">{/* <img src={NextArrow} alt="Next" /> */}</Link>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper pt-20">
          <div className="px-4">
            {savedDrawings.length > 0 && (
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <h5 className="px-6 py-3 text-[20px] font-normal text-black">
                    #
                  </h5>
                  <h5 className="px-6 py-3 text-[20px] font-normal text-black">
                    Name
                  </h5>
                  <h5 className="px-6 py-3 text-[20px] font-normal text-black">
                    Date
                  </h5>
                </div>

                {savedDrawings.map((d, index) => (
                  <div
                    onClick={() => {
                      handleNavigate(d.name_key);
                    }}
                    style={{ cursor: "pointer" }}
                    key={d.id}
                    className="flex justify-between items-center py-3.5 px-5 bg-white rounded-2xl shadow-lg mb-2"
                  >
                    <h5 className="text-black text-[18px] font-normal">
                      {(currentPage - 1) * 10 + (index + 1)}{" "}
                    </h5>
                    <h5 className="text-black text-[18px] font-normal">
                      {d.name_key}
                    </h5>
                    <h5 className="text-black text-[18px] font-normal">
                      {formatDate(d.createdAt)}
                    </h5>
                  </div>
                ))}
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default WhiteBoardList;
