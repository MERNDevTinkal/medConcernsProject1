import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/DiseaseContext";
import { topicBoard } from "../DiseasesData/diseasesData";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import apiCall from "../../Component/apiCall/apiCall";
import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import DeletePopup from "../../Component/TopicBoardPop/TopicBoardPop";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

const TopicBoard = ({
  gifLoader,
  selectedLanguage,
  selectedIconCount,
  selectedGender,
  setLoader,
}) => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { updateDisease, addOrUpdateSummary } = useContext(GlobalContext);
  const isSpeakingRef = useRef(false);
  const [mergedData, setMargedData] = useState([]);
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");
  const [showModal, setShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [topicId, setTopicId] = useState("");
  const [editData, setEditData] = useState(null);
  const [apiItems, setApiItems] = useState([]);
  useEffect(() => {
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
            const apiItems = Array.isArray(data?.data) ? data?.data : [data?.data] || [];
            setApiItems(apiItems)
          } else {
            toast.error(data?.msg, { autoClose: 1500 });
          }
        })
        .catch(({ response }) => {
          toast.error(response?.data?.message || response?.data?.msg, {
            autoClose: 1500,
          });
        });
    };
    getData();
  }, []);

  useEffect(() => {
    const merged = [...topicBoard, ...apiItems];
    setMargedData(merged);
  }, [topicBoard, apiItems])
  const validationSchema = Yup.object({
    firstname: Yup.string().required("Name is required"),
  });
  const formik = useFormik({
    initialValues: {
      licenses_id: editData?.licenses_id ?? "",
      firstname: editData?.name ?? "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (value, { resetForm }) => {
      handleSubmit(value);
      formik.resetForm({
        values: {
          firstname: "",
        },
      });
      setEditData(null);
    },
  });
  const handleConcern = async (value, mainpath) => {
    try {
      if (isSpeakingRef.current) return;
      if (value && (value?.audio || mainpath)) {
        isSpeakingRef.current = true;
        const voiceFile = value?.audio ? value?.audio :
          selectedLanguage === "" && selectedGender === ""
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
          voiceFile
        );
        const isConcern = Cookies.get("is_concern");
        const prefix = isConcern && isConcern?.includes("true_")
          ? isConcern + "/" + path
          : path;
        addOrUpdateSummary(prefix, [value]);
        // navigate(mainpath);
        navigate(
          `${value?.audio ? "/topicboard/custom/_id" : mainpath}`,
          { state: { value } }
        );
        isSpeakingRef.current = false;
      }
    } catch (error) {
      console.error("Error in handleConcern:", error);
    }
  };
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
  return (
    <>
      {showModal && (
        <DeletePopup
          setEditData={setEditData}
          topicId={topicId}
          setIsDelete={setIsDelete}
          onConfirm={onConfirm}
          formik={formik}
          isDelete={isDelete}
          setShowModal={setShowModal}
        />
      )}
      {mergedData?.map(
        (item, index) =>
          (!item?.image
          ) && (
            <div
              key={item.id + "-" + index}
              className={
                selectedIconCount === 1
                  ? "topicSetting-single-items"
                  : selectedIconCount === 2
                    ? "topicSetting-double-items"
                    : selectedIconCount === 3
                      ? "topicSetting-triple-items"
                      : selectedIconCount === 4
                        ? "topicSetting-quadriple-items"
                        : selectedIconCount === 6
                          ? "topicSetting-hexuple-items"
                          : ""
              }
              style={{ cursor: "pointer" }}
              onClick={() => handleConcern(item, item.path)}
            >
              <div
                key={index}
                className="dashboard-cards relative rounded-2xl bg-white h-[140px] flex flex-col items-center justify-center text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300 p-3"
              >
                {/* Spanish text stays centered */}
                {item?.audio !== undefined && item?.audio && item?.audio.trim() !== "" && (
                  <div className="flex justify-end absolute top-4 right-4">
                    <span style={{ color: "blue" }}>
                      <MdEdit
                        onClick={() => {
                          navigate(`/icon-upload`, {
                            state: { item, hideImage: "boardside" },
                          });
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
                <div className="text-[20px] mt-3 mb-2 text-black">


                  <p className={`text-[20px] mt-1 mb-1 text-black ${((selectedLanguage === "Spanish" ? item?.nameEs : item?.name)?.length > 12)
                    ? "shirnk-txt"
                    : ""
                    }`}>

                    {selectedLanguage === "Spanish"
                      ? item?.audio
                        ? item?.name
                        : item?.nameEs
                      : item?.name}
                  </p>


                </div>

                {/* English text positioned near bottom */}
                {!item.audio && selectedLanguage === "Spanish" && (
                  <p className="absolute bottom-0 break-words">{item?.name}</p>
                )}
              </div>
            </div>
          )
      )}
    </>
  );
};

export default TopicBoard;
