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
import { useNavigate, useLocation } from "react-router-dom";
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
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

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
    // Detect iOS and Safari
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);

    setIsIos(isIOS);
    setIsSafari(isSafariBrowser);

    if (item) {
      setExistingData(item);
      setAudioPreview(item.audio || null);
      setImagePreview(item.image || null);
    }

    // Cleanup on unmount
    return () => {
      stopMediaTracks();
    };
  }, [item]);

  const stopMediaTracks = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }
  };

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

  // iOS-specific permission request
  const requestIOSPermission = () => {
    if (isIos) {
      toast.info(
        <div>
          <p>On iOS Safari:</p>
          <p>1. Allow microphone access when prompted</p>
          <p>2. If denied, go to:</p>
          <p>Settings &gt; Safari &gt; Microphone</p>
          <p>3. Enable microphone for this site</p>
        </div>,
        { autoClose: 5000, closeButton: true }
      );
    }
  };

  const startRecording = async () => {
    stopMediaTracks();
    try {
      if (isIos && isSafari) {
        // requestIOSPermission();
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        await audioContext.resume();
        audioContext.close();
      }
      const constraints = isIos ? {
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          sampleRate: 44100
        }
      } : { audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;
      let mimeType = "audio/webm";
      if (isIos) {
        if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else if (MediaRecorder.isTypeSupported('audio/aac')) {
          mimeType = 'audio/aac';
        }
      }
      const recorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 128000
      });
      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blobType = isIos ? 'audio/mp4' : 'audio/wav';
        const blob = new Blob(chunks, { type: blobType });
        const audioURL = URL.createObjectURL(blob);
        setAudio(blob);
        setAudioPreview(audioURL);
        setRecordedChunks([]);
        setIsRecording(false);
        setPermissionGranted(true);
        if (!isIos) {
          stopMediaTracks();
        }
      };
      recorder.onerror = (event) => {
        console.error("Recorder error:", event.error);
        toast.error("Recording error occurred. Please try again.", { autoClose: 1500 });
        setIsRecording(false);
        stopMediaTracks();
      };
      const timeslice = isIos ? 250 : 1000;
      recorder.start(timeslice);
      setMediaRecorder(recorder);
      setRecordedChunks(chunks);
      setIsRecording(true);
      const maxDuration = isIos ? 180000 : 300000;
      setTimeout(() => {
        if (recorder.state === 'recording') {
          stopRecording();
          toast.info("Recording stopped automatically", { autoClose: 2000 });
        }
      }, maxDuration);

    } catch (error) {
      console.error("Recording error:", error);
      let errorMessage = "Failed to access microphone. ";
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage += "Permission denied. ";
        if (isIos) {
          errorMessage += "On iOS, go to Settings > Safari > Microphone and allow access.";
        } else {
          errorMessage += "Please allow microphone access in your browser settings.";
        }
      } else if (error.name === 'NotFoundError') {
        errorMessage += "No microphone found.";
      } else if (error.name === 'NotReadableError') {
        errorMessage += "Microphone is already in use by another application.";
      } else if (error.name === 'SecurityError') {
        errorMessage += "Microphone access requires a secure connection (HTTPS).";
      }
      toast.error(errorMessage, { autoClose: 4000 });
      setIsRecording(false);
      stopMediaTracks();
      if (isIos && (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError')) {
        setTimeout(() => {
          toast.info(
            <div>
              <strong>iOS Safari Microphone Fix:</strong>
              <ol style={{ marginLeft: '20px', textAlign: 'left' }}>
                <li>Tap AA in address bar</li>
                <li>Select "Website Settings"</li>
                <li>Enable "Microphone"</li>
                <li>Refresh the page</li>
              </ol>
            </div>,
            { autoClose: 6000, closeButton: true }
          );
        }, 1000);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    } else {
      setIsRecording(false);
    }
    setTimeout(() => {
      stopMediaTracks();
    }, isIos ? 1000 : 0);
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
    if (audio) {
      const fileName = isIos ? "recorded_audio.m4a" : "recorded_audio.wav";
      formData.append("audio", audio, fileName);
    }
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
                       {selectedLanguage === "Spanish" ? "Nombre" : "Name"}
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
                      <label className="block text-[16px] mb-6 font-medium text-black">
                        {selectedLanguage === "Spanish" ? "Audio" : "Audio"}
                      </label>
                      <div className="flex flex-col items-center">
                        <input
                          type="file"
                          id="audio-upload"
                          className="hidden"
                          onChange={handleAudioUpload}
                          accept="audio/*"
                          capture={isIos ? "microphone" : undefined} // iOS-specific attribute
                        />
                        <label
                          htmlFor="audio-upload"
                          className="cursor-pointer flex justify-center items-center mb-3"
                        >
                          <img src={VoiceIcon} alt="Voice Icon" />
                          <span className="ml-2">{selectedLanguage === "Spanish" ? "Subir archivo de audio" : "Upload Audio File"}</span>
                        </label>

                        {/* iOS-specific note */}
                        {isIos && !permissionGranted && (
                          <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                            <p className="text-yellow-700">
                              <strong>{selectedLanguage === "Spanish" ? "Nota de iOS:" : "iOS Note:"}</strong> {selectedLanguage === "Spanish" ? "El primer intento de grabación pedirá permiso para usar el micrófono." : "First recording attempt will ask for microphone permission."}
                            </p>
                          </div>
                        )}

                        {!isRecording ? (
                          <button
                            type="button"
                            onClick={startRecording}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            disabled={loader}
                          >
                            {selectedLanguage === "Spanish" ? "🎙 Iniciar grabación" : "🎙 Start Recording"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={stopRecording}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            {selectedLanguage === "Spanish" ? "⏹ Detener grabación" : "⏹ Stop Recording"}
                          </button>
                        )}

                        {isRecording && (
                          <div className="mt-2 flex items-center">
                            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                            <span className="text-sm text-gray-600">{selectedLanguage === "Spanish" ? "Grabando..." : "Recording..."}</span>
                          </div>
                        )}
                      </div>

                      {audioPreview && (
                        <div className="mt-4">
                          <audio
                            controls
                            src={audioPreview}
                            className="mt-3 w-full max-w-[300px] mx-auto"
                            controlsList={isIos ? "nodownload" : ""}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setAudio(null);
                              setAudioPreview(null);
                              URL.revokeObjectURL(audioPreview); // Clean up memory
                            }}
                            className="text-sm text-red-500 mt-2 hover:text-red-700"
                          >
                            {selectedLanguage === "Spanish" ? "Eliminar Audio" : "Remove Audio"}
                          </button>
                        </div>
                      )}

                      {isSubmitted && isAudioError && (
                        <div className="text-red-500 text-sm mt-2">{selectedLanguage === "Spanish" ? "El audio es obligatorio." : "Audio is required."}</div>
                      )}
                    </div>

                    {/* IMAGE (HIDE IF hideImage === true) */}
                    {hideImage !== "boardside" && (
                      <div className="w-[266px]">
                        <label className="block text-[16px] mb-4 font-medium text-black">
                          {selectedLanguage === "Spanish" ? "Subir Imagen" : "Upload Image"}
                        </label>

                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer px-3 bg-white flex items-center justify-between rounded-xl border border-dashed border-[#D6D6D6] w-full h-[54px] hover:bg-gray-50 transition-colors"
                        >
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                            accept="image/png, image/jpeg"
                            capture={isIos ? "environment" : undefined} // iOS camera access
                          />
                          <p className="text-sm text-[#0009]">
                            {selectedLanguage === "Spanish" ? "Elegir Archivo" : "Choose File"}
                          </p>
                          <img src={UploadIcon} alt="Upload Icon" />
                        </label>

                        {imagePreview && (
                          <div className="mt-4">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-[120px] h-[120px] object-cover rounded-lg border"
                              draggable={false}
                              onContextMenu={(e) => e.preventDefault()}
                              onDragStart={(e) => e.preventDefault()}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImage(null);
                                setImagePreview(null);
                                URL.revokeObjectURL(imagePreview); // Clean up memory
                              }}
                              className="text-sm text-red-500 mt-1 hover:text-red-700"
                            >
                              {selectedLanguage === "Spanish" ? "Eliminar Imagen" : "Remove Image"}
                            </button>
                          </div>
                        )}

                        {isSubmitted && imageError && (
                          <div className="text-red-500 text-sm mt-2">
                            {selectedLanguage === "Spanish" ? "La imagen es obligatoria." : "Image is required."}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="thm-btn w-32 flex justify-center items-center h-10 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loader}
                  >
                    {loader ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                        {selectedLanguage === "Spanish" ? "Enviando..." : "Submitting..."}
                      </>
                    ) : id ? (selectedLanguage === "Spanish" ? "Actualizar" : "Update") : (selectedLanguage === "Spanish" ? "Guardar" : "Save")}
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