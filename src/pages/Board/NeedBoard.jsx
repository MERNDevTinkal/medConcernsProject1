import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import { Link } from "react-router-dom";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import Footer from "../../Component/Layout/Footer/Footer";
import { useLocation } from "react-router-dom";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
import TopicBoard from "../../Component/TopicBoardPop/TopicBoardPop";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import apiCall from "../../Component/apiCall/apiCall";
const NeedBoard = () => {
  const location = useLocation();
  const [getAllDiseases, setDiseases] = useState([]);
  const [selectedIconCount, setSelectedIconCount] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [needboard, setNeedboard] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState();

  useEffect(() => {
    setDiseases(diseasesData[location.pathname]);
  }, [location?.pathname]);

  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      () => {},
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader,
      () => {},
      setNeedboard
    );
  }, []);

  const selectedNeedboard = needboard
    ? needboard.split(",").filter(Boolean)
    : [];
  // Open modal with prefilled data when clicking on card
  const handleCardClick = (item) => {
    setFormData({
      licenses_id: "",
      name: item?.name,
      image: null,
    });
    setShowModal(true);
  };

  // Submit handler (you can replace with API call)
  const handleSubmit = (value) => {
    const formData = new FormData();
    formData.append("licenses_id", licenses_id);
    formData.append("name", value.firstname);
    formData.append("image", value.image);
    apiCall.post("topic-boardCreate");
  };
  const validationSchema = Yup.object({
    firstname: Yup.string().required("Name is required"),
    image: Yup.mixed().required("Image is required"),
  });
  const formik = useFormik({
    initialValues: {
      licenses_id: "",
      firstname: "",
      image: null,
    },
    validationSchema,
    onSubmit: (value) => {
      handleSubmit(value);
    },
  });

  return (
    <>
      {showModal && <TopicBoard formik={formik} setShowModal={setShowModal} />}
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            name={
              selectedLanguage === "Spanish"
                ? "Tablero de Necesidades"
                : "Needs Board"
            }
          />

          <div className="main-wrapper home-wrapper ">
            <div
              className={`dashboard-h grid grid-cols-${
                selectedIconCount || 2
              } sm:grid-cols-${selectedIconCount || 3} md:grid-cols-${
                selectedIconCount || 3
              } gap-3.5 px-4 my-4`}
            >
              {getAllDiseases
                .filter((item) => !selectedNeedboard.includes(item.name))
                .map((item, index) => (
                  <div
                    style={{ cursor: "pointer" }}
                    key={index}
                    onClick={() => handleCardClick(item)}
                  >
                    <div className="dashboard-cards rounded-2xl bg-white text-center h-full py-2 px-3">
                      <div className="dashboard-img flex justify-center items-center">
                        <img src={item?.image} alt={item?.name} />
                      </div>
                      <p className="text-[12px] mt-4 color-black mb-0 ">
                        {selectedLanguage === "Spanish"
                          ? item?.nameEs
                          : item?.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Add Button at bottom */}
            <div className="flex justify-center my-6">
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-2xl shadow-lg hover:bg-blue-700"
              >
                + Add New
              </button>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default NeedBoard;
