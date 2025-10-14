import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/DiseaseContext";
import BackArrow from "../../assets/images/back-arrow.svg";
import {
  diseasesData,
  feelingValues,
} from "../../Component/DiseasesData/diseasesData";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
const FeelingListPain = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const location = useLocation();
  const pathprimary = location.pathname;
  const path = location.pathname;
  const navigate = useNavigate();
  const [painFeelParams, setPainFeelParams] = useState([]);
  const [selectedGender, setSelectedGender] = React.useState("");
  const { addOrUpdateSummary } = useContext(GlobalContext);
  const handlegetPain = async (value, path, painFeel) => {
    if (value && path) {
      await getTextToSpeech(
        painFeel,
        selectedLanguage === "Spanish" ? "es-ES" : "",
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
          : value?.maleEnglish
      );
      addOrUpdateSummary(pathprimary, [value]);
      navigate(path);
    }
  };
  useEffect(() => {
    setPainFeelParams(diseasesData[path]);
  }, [path]);
  const handleBackRoute = () => {
    navigate(-1);
  };
  useEffect(() => {
    getSetting(
      () => {},
      setSelectedGender,
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader
    );
  }, []);
  const handleBynumber = async (id) => {
    console.log("fdsfsfsf", feelingValues);
    const arrayFeeling = painFeelParams.filter((item) => {
      if (id == 1 || id == 2) {
        return item.id == 2;
      } else if (id == 3 || id == 4) {
        return item.id == 3;
      } else if (id == 5 || id == 6) {
        return item.id == 4;
      } else if (id == 7 || id == 8) {
        return item.id == 5;
      } else if (id == 9 || id == 10) {
        return item.id == 6;
      } else if (!id) {
        return item.id == 1;
      }
    });
    const value = arrayFeeling?.[0];
    const valuepath = value?.secPath?.includes("/confrm-step-yesno")
      ? `${path}${value?.secPath}/${value?.id}`
      : `${value?.secPath}`;
    const painFeel =
      selectedLanguage === "Spanish" ? value.painFeelEs : value.painFeel;
    if (value && valuepath) {
      await getTextToSpeech(
        painFeel,
        selectedLanguage === "Spanish" ? "es-ES" : "",
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
          : value?.maleEnglish
      );
      addOrUpdateSummary(pathprimary, [value]);
      // navigate(valuepath);
    }
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
            <button onClick={handleBackRoute}>
              <img src={BackArrow} />
            </button>
            <h2 className="text-[25px] font-normal text-black">
              {selectedLanguage === "Spanish"
                ? "¿Qué tan fuerte es tu dolor?"
                : "How bad is your pain?"}
            </h2>
            <button></button>
          </div>

          <div className="main-wrapper home-wrapper">
            <div className="w-full max-w-4xl mx-auto p-6 ">
              <div className="space-y-0">
                {/* <!-- Scale Numbers --> */}
                <div className="flex justify-between items-center text-bar">
                  <div
                    onClick={() => {
                      handleBynumber(0);
                    }}
                    className="text-2xl font-bold text-gray-800"
                  >
                    0
                  </div>
                  <div
                    onClick={() => {
                      handleBynumber(1);
                    }}
                    className="text-2xl font-bold text-gray-800"
                  >
                    1
                  </div>
                  <div
                    onClick={() => {
                      handleBynumber(2);
                    }}
                    className="text-2xl font-bold text-gray-800"
                  >
                    2
                  </div>
                  <div
                    onClick={() => {
                      handleBynumber(3);
                    }}
                    className="text-2xl font-bold text-gray-800"
                  >
                    3
                  </div>
                  <div
                    onClick={() => {
                      handleBynumber(4);
                    }}
                    className="text-2xl font-bold text-gray-800"
                  >
                    4
                  </div>
                  <div
                    onClick={() => {
                      handleBynumber(5);
                    }}
                    className="text-2xl font-bold text-gray-800"
                  >
                    5
                  </div>
                  <div
                    onClick={() => {
                      handleBynumber(6);
                    }}
                    className="text-2xl font-bold text-gray-800"
                  >
                    6
                  </div>
                  <div
                    onClick={() => {
                      handleBynumber(7);
                    }}
                    className="text-2xl font-bold text-gray-800"
                  >
                    7
                  </div>
                  <div
                    onClick={() => {
                      handleBynumber(8);
                    }}
                    className="text-2xl font-bold text-gray-800"
                  >
                    8
                  </div>
                  <div
                    onClick={() => {
                      handleBynumber(9);
                    }}
                    className="text-2xl font-bold text-gray-800"
                  >
                    9
                  </div>
                  <div
                    onClick={() => {
                      handleBynumber(10);
                    }}
                    className="text-2xl font-bold text-gray-800"
                  >
                    10
                  </div>
                </div>

                {/* <!-- Color Gradient Bar --> */}
                <div className="relative h-4 gradient-bar mt-3 mb-8">
                  {/* <!-- Scale markers --> */}
                  <div className="absolute inset-0 top-7.5 flex justify-between items-center px-1 left-0 line-bar">
                    <div
                      onClick={() => {
                        handleBynumber(0);
                      }}
                      className="w-2 h-[30px] line-1"
                    ></div>
                    <div
                      onClick={() => {
                        handleBynumber(1);
                      }}
                      className="w-2 h-[30px] line-2"
                    ></div>
                    <div
                      onClick={() => {
                        handleBynumber(2);
                      }}
                      className="w-2 h-[30px] line-3"
                    ></div>
                    <div
                      onClick={() => {
                        handleBynumber(3);
                      }}
                      className="w-2 h-[30px] line-4"
                    ></div>
                    <div
                      onClick={() => {
                        handleBynumber(4);
                      }}
                      className="w-2 h-[30px] line-5"
                    ></div>
                    <div
                      onClick={() => {
                        handleBynumber(5);
                      }}
                      className="w-2 h-[30px] line-6"
                    ></div>
                    <div
                      onClick={() => {
                        handleBynumber(6);
                      }}
                      className="w-2 h-[30px] line-7"
                    ></div>
                    <div
                      onClick={() => {
                        handleBynumber(7);
                      }}
                      className="w-2 h-[30px] line-8"
                    ></div>
                    <div
                      onClick={() => {
                        handleBynumber(8);
                      }}
                      className="w-2 h-[30px] line-9"
                    ></div>
                    <div
                      onClick={() => {
                        handleBynumber(9);
                      }}
                      className="w-2 h-[30px] line-10"
                    ></div>
                    <div
                      onClick={() => {
                        handleBynumber(10);
                      }}
                      className="w-2 h-[30px] line-11"
                    ></div>
                  </div>
                </div>

                {/* <!-- Pain Level Labels --> */}
                <div className="flex justify-between items-center text-sm font-normal text-gray-700 mb-8 bttm-txt-bar flex-wrap">
                  {feelingValues.map((item, index) => (
                    <span
                      onClick={() => {
                        handleBynumber(!index ? index : index + 1);
                      }}
                      key={item.id}
                      className="text-[16px] font-medium text-center"
                    >
                      {item.id === 6 ? (
                        <>
                          {selectedLanguage === "Spanish" ? (
                            <>
                              Peor dolor <br /> imaginable
                            </>
                          ) : (
                            <>
                              Worst Pain <br /> Imaginable
                            </>
                          )}
                        </>
                      ) : selectedLanguage === "Spanish" ? (
                        item.nameEs
                      ) : (
                        item.name
                      )}
                    </span>
                  ))}
                </div>

                {/* <!-- Emoji Faces --> */}
                <div className="flex flex-wrap justify-between items-center emoji-bar">
                  {painFeelParams.map((data, index) => (
                    <div key={data.id}>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handlegetPain(
                            data,
                            data?.secPath?.includes("/confrm-step-yesno")
                              ? `${path}${data?.secPath}/${data?.id}`
                              : `${data?.secPath}`,
                            selectedLanguage === "Spanish"
                              ? data.painFeelEs
                              : data.painFeel
                          );
                        }}
                        className={`flex flex-col items-center space-y-${index}  mb-3`}
                      >
                        <img src={data.image} alt="" />
                        <span
                          onClick={() => {
                            handlegetPain(
                              data,
                              data?.secPath?.includes("/confrm-step-yesno")
                                ? `${path}${data?.secPath}/${data?.id}`
                                : `${data?.secPath}`,
                              data.painFeel
                            );
                          }}
                          className="pt-1.5 px-5 bg-white rounded-full shadow-2xl text-[20px] leading-normal mt-4 border-2 border-white cursor-pointer hover:border-blue-600 transition-colors duration-300"
                        >
                          {data.params ?? "0"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default FeelingListPain;
