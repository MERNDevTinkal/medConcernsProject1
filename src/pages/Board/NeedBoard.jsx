import React, { useEffect, useState, useContext, useRef } from "react";
import Header from "../../Component/Layout/Header/Header";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import Footer from "../../Component/Layout/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
import DeletePopup from "../../Component/TopicBoardPop/TopicBoardPop";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiCall from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import Cookies from "js-cookie";

const NeedBoard = () => {
  const location = useLocation();
  const [selectedGender, setSelectedGender] = React.useState("");

  const [getAllDiseases, setDiseases] = useState([]);
  const [selectedIconCount, setSelectedIconCount] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [needboard, setUncheckNeedBoard] = useState(null);
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");
  const [apiData, setApiData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [topicId, setTopicId] = useState("");
  const [editData, setEditData] = useState(null);
  const [IntroductionOn, setIntroductionOn] = React.useState("");
  const isSpeakingRef = useRef(false);

  const [CalendarOn, setCalendarOn] = React.useState("");
  const { updateDisease, resetDiseases, addOrUpdateSummary } =
    useContext(GlobalContext);
  const path = location.pathname;
  useEffect(() => {
    setDiseases(diseasesData[location.pathname]);
  }, [location?.pathname]);
  const navigate = useNavigate();
  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => { },
      () => { },
      setUncheckNeedBoard
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
  const handleNeedBoard = async (value, mainpath) => {
    if (value && (value?.audio || mainpath)) {
      if (isSpeakingRef.current) return;
      isSpeakingRef.current = true;
      resetDiseases();
      const audioValue = value?.audio
        ? value?.audio
        : selectedLanguage === "" && selectedGender === ""
          ? value?.maleEnglish
          : selectedLanguage === "Spanish" && selectedGender === "Male"
            ? value?.maleSpanish
            : selectedLanguage === "Spanish" && selectedGender === "Female"
              ? value?.femaleSpanish
              : selectedLanguage === "" && selectedGender === "Female"
                ? value?.femaleEnglish
                : selectedLanguage === "" && selectedGender === "Male"
                  ? value?.maleEnglish
                  : selectedLanguage === "English" && selectedGender === "Male"
                    ? value?.maleEnglish
                    : selectedLanguage === "English" && selectedGender === "Female"
                      ? value?.femaleEnglish
                      : value?.maleEnglish;
      await getTextToSpeech(
        selectedLanguage === "Spanish" ? value.nameEs : value.name,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        audioValue
      );
      const isConcern = Cookies.get("is_concern");
      const prefix = isConcern && isConcern?.includes("true_")
        ? isConcern + "/" + path.replace("/", "")
        : path.replace("/", "");
      addOrUpdateSummary(prefix, [value]);
      navigate(
        `${value?.audio ? "/board/confrm-step-yesno/custom" : mainpath}`,
        { state: { value } }
      );
      isSpeakingRef.current = false;
    }
  };
  return (
    <>
      {showModal && (
        <DeletePopup
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
            introductionOn={IntroductionOn}
            calendarOn={CalendarOn}
            name={
              selectedLanguage === "Spanish"
                ? "Tablero de Necesidades"
                : "Needs Board"
            }
          />

          <div className="main-wrapper home-wrapper ">
            <div className="dashboard-wrapper px-4 py-1.5">
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
                    item?.image && (
                      <div
                        className={
                          selectedIconCount === 1
                            ? "dash-single-items"
                            : selectedIconCount === 2
                              ? "dash-double-items"
                              : selectedIconCount === 3
                                ? "dash-triple-items"
                                : selectedIconCount === 4
                                  ? "dash-quadriple-items"
                                  : selectedIconCount === 6
                                    ? "dash-hexuple-items"
                                    : ""
                        }
                        style={{ cursor: "pointer" }}
                        key={index}
                      >
                        <div className="dashboard-cards rounded-2xl bg-white text-center relative border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">

                          {item?.audio && item.audio.trim() !== "" && (
                            <div className="flex justify-end absolute top-4 right-4">
                              <span style={{ color: "blue" }}>
                                <MdEdit
                                  onClick={() =>
                                    navigate(`/icon-upload`, {
                                      state: { item },
                                    })
                                  }
                                />
                              </span>
                              <span style={{ color: "red" }}>
                                <MdOutlineDelete
                                  onClick={() => handleDelete(item.id)}
                                />
                              </span>
                            </div>
                          )}

                          <div
                            className="dashboard-img card-img-h rounded-2xl"
                            onClick={() => handleNeedBoard(item, item.secPath)}
                          >
                            <img
                              className="w-full"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>

                          <p className="text-[16px] mt-4 color-black mb-0">
                            {selectedLanguage === "Spanish"
                              ? item.nameEs || item.name
                              : item.name}
                          </p>
                        </div>
                      </div>
                    )
                  ))}

              </div>
            </div>
            {/* Add Button at bottom */}
            <div className="flex justify-center my-6">
              <button
                onClick={() => {
                  navigate("/icon-upload");
                }}
                className="thm-btn"
              >
                {selectedLanguage === "Spanish"
                  ? "+ Agregar icono"
                  : "+ Add Icon"}
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
