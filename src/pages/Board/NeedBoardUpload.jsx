import React, { useState, useEffect } from "react";
import Header from "../../Component/Layout/Header/Header";
import UploadIcon from "../../assets/images/upload.svg";
import VoiceIcon from "../../assets/images/voice.svg";
import Footer from "../../Component/Layout/Footer/Footer";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import apiCall from "../../Component/apiCall/apiCall";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Component/webLoader/loader";
const NeedBoardUpload = () => {
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loader, setLoader] = useState(false);
  const [existingData, setExistingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioError, setAudioError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");

  useEffect(() => {
    if (id) {
      setLoader(true);
      apiCall
        .get(`your-api-endpoint-here/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          if (data.status) {
            setExistingData(data.data);
            setAudio(data.data.audio);
            setImage(data.data.image);
            setAudioPreview(data.data.audio);
            setImagePreview(data.data.image);
            formik.setValues({
              firstname: data.data.name || "",
            });
          } else {
            toast.error(data.msg, { autoClose: 1500 });
          }
          setIsLoading(false);
          setLoader(false);
        })
        .catch(() => {
          toast.error("Error fetching data.", { autoClose: 1500 });
          setIsLoading(false);
          setLoader(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes("audio")) {
      setAudioError(false);
      setAudio(file);
      setAudioPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a valid audio file.", { autoClose: 1500 });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImageError(false);
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      toast.error("Only JPG/PNG images are allowed.", { autoClose: 1500 });
    }
  };

  const handleSubmit = (values) => {
    setIsSubmitted(true); // ✅ Mark form as submitted once
    let hasError = false;
    if (!audio) {
      setAudioError(true);
      hasError = true;
    } else {
      setAudioError(false);
    }
    if (!image) {
      setImageError(true);
      hasError = true;
    } else {
      setImageError(false);
    }
    if (hasError) return;
    setLoader(true);
    const formData = new FormData();
    formData.append("licenses_id", licenses_id);
    formData.append("name", values.firstname);
    formData.append("audio", audio);
    formData.append("image", image);
    if (id) formData.append("topic_id", id);
    const endpoint = id ? "topic-board/edit" : "topic-boardCreate";
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
            id ? "Data updated successfully" : "Data created successfully",
            { autoClose: 1500 }
          );
          navigate("/success-path");
        } else {
          toast.error(data.msg, { autoClose: 1500 });
        }
        setLoader(false);
      })
      .catch(() => {
        toast.error("An error occurred. Please try again.", {
          autoClose: 1500,
        });
        setLoader(false);
      });
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: existingData?.name ?? "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });

  //  {isLoading ? (
  //     <Loader />
  //   )
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="main-wrapper home-wrapper">
            <div className="mx-5 my-5">
              <div className="py-9 px-5 bg-white shadow-lg rounded-2xl">
                <form onSubmit={formik.handleSubmit}>
                  <div className="flex items-center mb-9 gap-11 justify-between upload-frm">
                    {/* Name Field */}
                    <div className="w-[266px]">
                      <label className="block text-[16px] mb-4 font-medium text-black">
                        Name
                      </label>
                      <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                        value={formik.values.firstname}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none border-[#D6D6D6] h-[54px]"
                      />
                      {/* ✅ Show validation error only after submit */}
                      {isSubmitted && formik.errors.firstname && (
                        <div className="text-red-500 text-sm mt-2">
                          {formik.errors.firstname}
                        </div>
                      )}
                    </div>

                    {/* ✅ Audio Upload with preview */}
                    <div className="text-center">
                      <label className="block text-[16px] mb-6 font-medium text-black">
                        Audio
                      </label>
                      <input
                        type="file"
                        id="audio-upload"
                        className="hidden"
                        onChange={handleAudioUpload}
                        accept="audio/*"
                      />
                      <label
                        htmlFor="audio-upload"
                        className="cursor-pointer flex justify-center items-center"
                      >
                        <img src={VoiceIcon} alt="Voice Icon" />
                      </label>

                      {audioPreview && (
                        <audio
                          controls
                          src={audioPreview}
                          className="mt-3 w-[250px] mx-auto"
                        />
                      )}

                      {/* ✅ Show audio error only after submit */}
                      {isSubmitted && isAudioError && (
                        <div className="text-red-500 text-sm mt-2">
                          Audio is required.
                        </div>
                      )}
                    </div>

                    {/* ✅ Image Upload with preview */}
                    <div className="w-[266px]">
                      <label className="block text-[16px] mb-4 font-medium text-black">
                        Upload Image
                      </label>
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer px-3 bg-white flex items-center justify-between rounded-xl border border-dashed border-[#D6D6D6] w-full h-[54px]"
                      >
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleImageUpload}
                          accept="image/png, image/jpeg"
                        />
                        <p className="text-sm font-normal text-[16px] text-[#0009]">
                          Choose File
                        </p>
                        <img src={UploadIcon} alt="Upload Icon" />
                      </label>

                      {imagePreview && (
                        <div className="mt-4">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-[120px] h-[120px] object-cover rounded-lg border"
                          />
                        </div>
                      )}

                      {/* ✅ Show image error only after submit */}
                      {isSubmitted && imageError && (
                        <div className="text-red-500 text-sm mt-2">
                          Image is required.
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="thm-btn w-20"
                    disabled={loader}
                  >
                    {loader ? "Submitting..." : id ? "Update" : "Save"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default NeedBoardUpload;
