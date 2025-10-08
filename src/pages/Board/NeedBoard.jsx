import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import Footer from "../../Component/Layout/Footer/Footer";
import { useLocation } from "react-router-dom";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
import TopicBoard from "../../Component/TopicBoardPop/TopicBoardPop";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiCall from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

const NeedBoard = () => {
  const location = useLocation();
  const [getAllDiseases, setDiseases] = useState([]);
  const [selectedIconCount, setSelectedIconCount] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [needboard, setNeedboard] = useState(null);
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");
  const [apiData, setApiData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [topicId, setTopicId] = useState("");
  const [editData, setEditData] = useState(null);
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
    getData();
  }, [loader]);

  const getData = () => {
    const formData = new FormData();
    formData.append("licenses_id", licenses_id);
    apiCall
      .post("topic-board/list", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data.status) {
          setApiData(data.data);
        } else {
          toast.error(data.msg, { autoClose: 1500 });
        }
      })
      .catch(({ response }) => {
        toast.error(response.data.message || response.data.msg, {
          autoClose: 1500,
        });
      });
  };

  const selectedNeedboard = needboard
    ? needboard.split(",").filter(Boolean)
    : [];

  const handleSubmit = (value) => {
    setLoader(true);
    setShowModal(false);
    const formData = new FormData();
    formData.append("licenses_id", licenses_id);
    formData.append("name", value.firstname);
    if (value.image && typeof value.image !== "string") {
      formData.append("image", value.image);
    }
    if (editData?.id) {
      formData.append("topic_id", editData?.id);
    }
    const endpoint = editData ? "topic-board/edit" : "topic-boardCreate";

    apiCall
      .post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        if (data.status) {
          toast.success(
            editData?.id
              ? "Icon updated successfully"
              : "Icon added successfully",
            { autoClose: 1500 }
          );
        } else {
          toast.error(data.msg, { autoClose: 1500 });
        }
        setLoader(false);
      })
      .catch(({ response }) => {
        toast.error(response.data.message || response.data.msg, {
          autoClose: 1500,
        });
        setLoader(false);
      });
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Name is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test("fileRequired", "Image is required", function (value) {
        if (editData) {
          return (
            value !== null &&
            (typeof value === "string" || value instanceof File)
          );
        }
        return value instanceof File;
      })
      .test("fileType", "Only JPG/PNG allowed", function (value) {
        if (!value || typeof value === "string") return true;
        return ["image/jpeg", "image/png"].includes(value.type);
      }),
  });

  const formik = useFormik({
    initialValues: {
      licenses_id: editData?.licenses_id ?? "",
      firstname: editData?.name ?? "",
      image: editData?.image ?? null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (value, { resetForm }) => {
      handleSubmit(value);
      formik.resetForm({
        values: {
          firstname: "",
          image: null,
        },
      });
      setEditData(null);
    },
  });

  const mergedData = [...getAllDiseases, ...apiData];

  const handleDelete = (id) => {
    setIsDelete(true);
    setShowModal(true);
    setTopicId(id);
  };
  const onConfirm = (topicId) => {
    setLoader(true);
    setShowModal(false);
    apiCall
      .post(
        "deleteTopicBoard",
        { topic_id: topicId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        if (data.status) {
          toast.success("Icon deleted successfully", { autoClose: 1500 });
        } else {
          toast.error(data.msg, { autoClose: 1500 });
        }
        setIsDelete(false);

        setLoader(false);
      })
      .catch(({ response }) => {
        setIsDelete(false);
        setShowModal(false);
        toast.error(response.data.message || response.data.msg, {
          autoClose: 1500,
        });
        setLoader(false);
      });
  };
  const handleEdit = (item) => {
    setEditData(item);
    setShowModal(true);
  };
  return (
    <>
      {showModal && (
        <TopicBoard
          setEditData={setEditData}
          topicId={topicId}
          setIsDelete={setIsDelete}
          onConfirm={onConfirm}
          isDelete={isDelete}
          formik={formik}
          setShowModal={setShowModal}
        />
      )}
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
              className="dashboard-h grid gap-3 p-3"
              style={{
                gridTemplateColumns:
                  selectedIconCount === 6
                    ? "repeat(3, 1fr)" // 3 per row
                    : `repeat(${selectedIconCount || 2}, 1fr)`,
                gridTemplateRows:
                  selectedIconCount === 6 ? "repeat(2, 1fr)" : "auto",
              }}
            >
              {mergedData
                .filter((item) => !selectedNeedboard.includes(item.name))
                .map((item, index) => (
                  <div style={{ cursor: "pointer" }} key={index}>
                    <div className="dashboard-cards rounded-2xl bg-white text-center h-full py-2 px-3">
                      {item.name && !item.nameEs && (
                        <div className="flex justify-end">
                          <span style={{ color: "blue" }}>
                            <MdEdit
                              onClick={() => {
                                handleEdit(item);
                              }}
                            />
                          </span>
                          <span style={{ color: "red" }}>
                            <MdOutlineDelete
                              onClick={() => {
                                handleDelete(item.id);
                              }}
                            />
                          </span>
                        </div>
                      )}
                      <div className="dashboard-img flex justify-center items-center">
                        <img
                          className="mainImageSize"
                          style={{
                            height: selectedIconCount === 6 ? "50px" : "",
                          }}
                          src={item?.image}
                          alt={item?.name}
                        />
                      </div>
                      <p className="text-[12px] mt-4 color-black mb-0 ">
                        {selectedLanguage === "Spanish"
                          ? item?.nameEs || item?.name
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
                {selectedLanguage === "Spanish"
                  ? "+ Agregar nuevo"
                  : "+ Add New"}
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
