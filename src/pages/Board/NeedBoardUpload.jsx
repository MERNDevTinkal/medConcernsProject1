
import React, { useState, useEffect, useRef } from "react";
import Header from "../../Component/Layout/Header/Header";
import {
  UploadIcon,
  VoiceIcon,
} from "../../Component/DiseasesData/images";
import Footer from "../../Component/Layout/Footer/Footer";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import apiCall from "../../Component/apiCall/apiCall";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";

const NeedBoardUpload = () => {
  const location = useLocation();
  const { item, hideImage } = location.state || {};
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loader, setLoader] = useState(false);
  const [existingData, setExistingData] = useState(null);
  const [isAudioError, setAudioError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [calendarOn, setCalendarOn] = useState(false);
  const [introductionOn, setIntroductionOn] = useState(false);

  // Recorder
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const mediaStreamRef = useRef(null);

  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const navigate = useNavigate();
  const { id } = item ?? {};
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");

  useEffect(() => {
    if (item) {
      setExistingData(item);
      setAudioPreview(item.audio || null);
      setImagePreview(item.image || null);
    }
  }, [item]);

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("audio")) {
      setAudio(file);
      setAudioPreview(URL.createObjectURL(file));
      setAudioError(false);
    } else {
      toast.error("Please upload a valid audio file.", { autoClose: 1500 });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (hideImage !== "boardside" && file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError(false);
    } else if (hideImage !== "boardside") {
      toast.error("Only JPG/PNG images are allowed.", { autoClose: 1500 });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        const audioURL = URL.createObjectURL(blob);
        setAudio(blob);
        setAudioPreview(audioURL);
        setRecordedChunks([]);
        setIsRecording(false);
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecordedChunks(chunks);
      setIsRecording(true);
    } catch {
      toast.error("Microphone access denied.", { autoClose: 1500 });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
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
      () => { }
    );
  }, [loader]);

  const handleSubmit = (values) => {
    setIsSubmitted(true);
    let hasError = false;
    if (!audio && !audioPreview) {
      setAudioError(true);
      hasError = true;
    }
    if (hideImage !== "boardside") {
      if (!image && !imagePreview) {
        setImageError(true);
        hasError = true;
      }
    }
    if (hasError) return;
    setLoader(true);
    const formData = new FormData();
    formData.append("licenses_id", licenses_id);
    formData.append("name", values.firstname);
    if (audio) formData.append("audio", audio, "recorded_audio.wav");
    if (hideImage !== "boardside" && image) formData.append("image", image);
    if (id) formData.append("topic_id", id);
    const endpoint = id ? "topic-board" : "topic-boardCreate";
    apiCall
      .post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        if (data.status) {
          toast.success(id ? "Icon updated successfully" : "Icon created successfully", {
            autoClose: 1500,
          });
          navigate(hideImage === "boardside" ? "/topic-board" : "/board");
        } else {
          toast.error(data.msg, { autoClose: 1500 });
        }
        setLoader(false);
      })
      .catch(() => {
        toast.error("An error occurred. Please try again.", { autoClose: 1500 });
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
          <Header
            selectedLanguage={selectedLanguage}
            introductionOn={introductionOn}
            calendarOn={calendarOn}
            name={selectedLanguage === "Spanish" ? "Necesita subir la placa" : "Needs Board Upload"}
          />
          <div className="main-wrapper home-wrapper">
            <div className="mx-5 my-5">
              <div className="py-9 px-5 bg-white shadow-lg rounded-2xl">
                <form onSubmit={formik.handleSubmit}>
                  <div className="flex items-center mb-9 gap-11 justify-between upload-frm">
                    {/* NAME */}
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
                        <div className="text-red-500 text-sm mt-2">{formik.errors.firstname}</div>
                      )}
                    </div>
                    {/* AUDIO */}
                    <div className="text-center">
                      <label className="block text-[16px] mb-6 font-medium text-black">Audio</label>
                      <div className="flex flex-col items-center">
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
                        </label>

                        {!isRecording ? (
                          <button
                            type="button"
                            onClick={startRecording}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg"
                          >
                            🎙 Start Recording
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={stopRecording}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg"
                          >
                            ⏹ Stop Recording
                          </button>
                        )}
                      </div>

                      {audioPreview && (
                        <audio controls src={audioPreview} className="mt-3 w-[250px] mx-auto" />
                      )}

                      {isSubmitted && isAudioError && (
                        <div className="text-red-500 text-sm mt-2">Audio is required.</div>
                      )}
                    </div>

                    {/* IMAGE (HIDE IF hideImage === true) */}
                    {hideImage !== "boardside" && (
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
                          <p className="text-sm text-[#0009]">Choose File</p>
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
                          <div className="text-red-500 text-sm mt-2">Image is required.</div>
                        )}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="thm-btn w-32 flex justify-center" disabled={loader}>
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
