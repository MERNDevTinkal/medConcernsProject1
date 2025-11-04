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

const NeedBoardUpload = () => {
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [existingData, setExistingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioError, setAudioError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");
  useEffect(() => {
    if (id) {
      setLoader(true);
      apiCall
        .get(`your-api-endpoint-here/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          if (data.status) {
            setExistingData(data.data);
            setAudio(data.data.audio);
            setImage(data.data.image);
            formik.setValues({
              firstname: data.data.name || "",
            });
          } else {
            toast.error(data.msg, { autoClose: 1500 });
          }
          setIsLoading(false); // Data fetched, stop loading
          setLoader(false);
        })
        .catch((err) => {
          toast.error("Error fetching data.", { autoClose: 1500 });
          setIsLoading(false); // Stop loading on error
          setLoader(false);
        });
    } else {
      setIsLoading(false); // No ID, so just stop loading
    }
  }, [id]);

  // Handle file uploads for audio
  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes("audio")) {
      setAudioError(false);
      setAudio(file);
    } else {
      toast.error("Please upload a valid audio file.", { autoClose: 1500 });
    }
  };

  // Handle file uploads for image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImageError(false);
      setImage(file);
    } else {
      toast.error("Only JPG/PNG images are allowed.", { autoClose: 1500 });
    }
  };

  const handleSubmit = (values) => {
    if (!audio || !image) {
      toast.error("Name, audio, and image are required.", { autoClose: 1500 });
      return;
    }
    setLoader(true);
    const formData = new FormData();
    formData.append("licenses_id", licenses_id);
    formData.append("name", values.firstname);
    formData.append("audio", audio);
    formData.append("image", image);
    if (id) {
      formData.append("topic_id", id);
    }
    if (!audio) {
      setAudioError(true);
    }
    if (!image) {
      setImageError(true);
    }

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
          navigate("/success-path"); // Redirect after success
        } else {
          toast.error(data.msg, { autoClose: 1500 });
        }
        setLoader(false);
      })
      .catch((err) => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="mx-5 my-5">
          <div className="py-9 px-5 bg-white shadow-lg rounded-2xl">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex items-center mb-9 gap-11 justify-between upload-frm">
                {/* Name Field */}
                <div className="w-[266px]">
                  <label
                    htmlFor="name"
                    className="block text-[16px] mb-4 font-medium text-black"
                  >
                    Name
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none border-[#D6D6D6] h-[54px]"
                  />
                  {formik.errors.firstname && formik.touched.firstname && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.firstname}
                    </div>
                  )}
                </div>

                {/* Audio Upload */}
                <div className="text-center">
                  <label
                    htmlFor="audio-upload"
                    className="block text-[16px] mb-6 font-medium text-black"
                  >
                    Audio
                  </label>
                  <input
                    type="file"
                    id="audio-upload"
                    className="hidden"
                    onChange={handleAudioUpload}
                    accept="audio/*"
                  />
                  <button
                    type="button"
                    className="flex justify-center items-center"
                  >
                    <img src={VoiceIcon} alt="Voice Icon" />
                  </button>
                  {isAudioError && (
                    <div className="text-red-500 text-sm">
                      Audio is required.
                    </div>
                  )}
                </div>

                {/* Image Upload */}
                <div className="w-[266px]">
                  <label
                    htmlFor="file-upload"
                    className="block text-[16px] mb-4 font-medium text-black"
                  >
                    Upload Image
                  </label>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer px-3 bg-white flex items-center justify-between rounded-xl border-1 border-dashed border-[#D6D6D6] w-full h-[54px]"
                  >
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <p className="text-sm font-normal text-[16px] color-[#0009]">
                      Choose File
                    </p>
                    <img src={UploadIcon} alt="Upload Icon" />
                  </label>
                  {imageError && (
                    <div className="text-red-500 text-sm">
                      Image is required.
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="thm-btn w-20" disabled={loader}>
                {loader ? "Submitting..." : id ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NeedBoardUpload;
