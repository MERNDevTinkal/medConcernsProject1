import React, { useState, useEffect, useRef } from "react";
import Header from "../../Component/Layout/Header/Header";
import UploadIcon from "../../assets/images/upload.svg";
import VoiceIcon from "../../assets/images/voice.svg";
import Footer from "../../Component/Layout/Footer/Footer";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import apiCall from "../../Component/apiCall/apiCall";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Loader from "../../Component/webLoader/loader";

const NeedBoardUpload = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loader, setLoader] = useState(false);
  const [existingData, setExistingData] = useState(null);
  const [isAudioError, setAudioError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const mediaRecorderRef = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");
  useEffect(() => {
    if (item) {
      setExistingData(item);
      setAudioPreview(item.audio || null);
      setImagePreview(item.image || null);
    }
  }, [item]);

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes("audio")) {
      setAudioError(false);
      setAudio(file);
      setAudioPreview(URL.createObjectURL(file));
      setRecordedChunks([]);
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setRecordedChunks([]);
      mediaRecorder.start();
      setIsRecording(true);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "audio/webm" });
        const audioURL = URL.createObjectURL(blob);
        setAudio(blob);
        setAudioPreview(audioURL);
        setIsRecording(false);
      };
    } catch (error) {
      toast.error("Microphone access denied or not available.", {
        autoClose: 1500,
      });
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const deleteRecordedAudio = () => {
    setAudio(null);
    setAudioPreview(null);
    setRecordedChunks([]);
    setIsRecording(false);
  };
  const handleSubmit = (values) => {
    setIsSubmitted(true);
    let hasError = false;

    if (!audio && !audioPreview) {
      setAudioError(true);
      hasError = true;
    } else {
      setAudioError(false);
    }

    if (!image && !imagePreview) {
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
    if (audio) formData.append("audio", audio);
    if (image) formData.append("image", image);

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

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="main-wrapper home-wrapper">
            <div className="mx-5 my-5">
              <div className="py-9 px-5 bg-white shadow-lg rounded-2xl">
                <form onSubmit={formik.handleSubmit}>
                  <div className="flex items-center mb-9 gap-11 justify-between upload-frm">
                    <div className="w-[266px]">
                      <label className="block text-[16px] mb-4 font-medium text-black">
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
                      {isSubmitted && formik.errors.firstname && (
                        <div className="text-red-500 text-sm mt-2">
                          {formik.errors.firstname}
                        </div>
                      )}
                    </div>
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
                        className="cursor-pointer flex justify-center items-center mb-3"
                      >
                        <img src={VoiceIcon} alt="Voice Icon" />
                        <span className="ml-2 text-sm text-[#0009]">
                          Upload Audio
                        </span>
                      </label>

                      {/* Recording Buttons */}
                      <div className="flex flex-col items-center gap-2">
                        {!isRecording ? (
                          <button
                            type="button"
                            onClick={startRecording}
                            className="bg-green-500 text-white rounded-xl px-4 py-2 text-sm"
                          >
                            🎙 Start Recording
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={stopRecording}
                            className="bg-red-500 text-white rounded-xl px-4 py-2 text-sm"
                          >
                            ⏹ Stop Recording
                          </button>
                        )}

                        {audioPreview && (
                          <div className="flex flex-col items-center mt-3">
                            <audio
                              controls
                              src={audioPreview}
                              className="w-[250px]"
                            />
                            <button
                              type="button"
                              onClick={deleteRecordedAudio}
                              className="mt-2 text-red-500 text-sm underline"
                            >
                              Delete Audio
                            </button>
                          </div>
                        )}
                      </div>

                      {isSubmitted && isAudioError && (
                        <div className="text-red-500 text-sm mt-2">
                          Audio is required.
                        </div>
                      )}
                    </div>

                    {/* ✅ Image Upload + Preview */}
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
