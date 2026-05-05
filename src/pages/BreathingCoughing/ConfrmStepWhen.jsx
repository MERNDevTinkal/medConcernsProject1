import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import { Checked, Close, BackArrow } from "../../Component/DiseasesData/images";
import { GlobalContext } from "../../context/DiseaseContext";
import { breathingWhenOptions } from "../../Component/DiseasesData/diseasesData";
import { useParams } from "react-router-dom";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
import {
  YesFemale,
  femaleNoSpanish,
  YesFemaleSpanish,
  NoFemale,
  NoFemaleSpanish,
  YesSpanishMale,
  YesMale,
  No_male,
  No_no_maleSpanish,
} from "../../../src/Component/DiseasesData/audio";
function ConfrmStepWhen() {
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const [confirmData, setConfirmData] = useState({});
  const { updateDisease, diseases } = useContext(GlobalContext);
  const location = useLocation();
  const pathprimary = location.pathname;
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  const [calendarOn, setCalendarOn] = React.useState("");
  const handleConfrmStepWhen = async (value, path, audio) => {
    if (value && path) {
      await getTextToSpeech(
        value,
        selectedLanguage === "Spanish" ? "es-ES" : "",
        audio,
      );
      updateDisease(pathprimary, value);

      if (confirmData?.name === "Something Else") {
        return navigate("/Whiteboard");
      }
      if (calendarOn && path === "/howoften") {
        return navigate("/new-problem");
      }
      navigate(path);
    }
  };
  useEffect(() => {
    const getSelectedTime = breathingWhenOptions.find((item) => {
      return item.id == id;
    });
    setConfirmData(getSelectedTime);
  }, [id]);
  useEffect(() => {
    getSetting(
      () => {},
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      () => {},
      setLoader,
      () => {},
      () => {},
      () => {},
      () => {},
    );
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between py-4 fixed left-0 right-0 top-0 bg-white innr-header">
            <div
              onClick={() => {
                navigate(-1);
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={BackArrow} />
            </div>
            <h2 className="Header-text text-[30px] font-medium text-black text-center py-2">
              {selectedLanguage === "Spanish"
                ? confirmData.nameEs
                : confirmData.name}
            </h2>
            <button className="opacity-0">Medconcern</button>
          </div>
          <div className="main-wrapper home-wrapper items-center justify-center flex flex-col">
            <div className="grid grid-cols-2  md:gap-20 gap-5 my-5 items-center">
              <div className="dashboard-cards brthng-card rounded-2xl bg-white text-center shadow-sm p-3">
                <div className="dashboard-img rounded-2xl h-full w-full">
                  <div className="h-full w-full">
                    <img
                      src={confirmData.image}
                      className="mx-auto rounded-xl w-full"
                        draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="w-full overflow-hidden decision-cards">
                  <div
                    to="/howoften"
                    onClick={() => {
                      handleConfrmStepWhen(
                        selectedLanguage === "Spanish" ? "SÍ" : "YES",
                        "/howoften",
                        selectedLanguage === "" && selectedGender === ""
                          ? YesMale
                          : selectedLanguage === "Spanish" &&
                              selectedGender === "Male"
                            ? YesSpanishMale
                            : selectedLanguage === "Spanish" &&
                                selectedGender === "Female"
                              ? YesFemaleSpanish
                              : selectedLanguage === "" &&
                                  selectedGender === "Female"
                                ? YesFemale
                                : selectedLanguage === "" &&
                                    selectedGender === "Male"
                                  ? YesMale
                                  : selectedLanguage === "English" &&
                                      selectedGender === "Male"
                                    ? YesMale
                                    : selectedLanguage === "English" &&
                                        selectedGender === "Female"
                                      ? YesFemale
                                      : YesMale,
                      );
                    }}
                  >
                    <div className="custom-wdth flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-5 cursor-pointer hover:border-blue-600 transition-colors duration-300">
                      <div className="flex items-center">
                        <p className="text-[32px] font-medium text-green-600">
                          {selectedLanguage === "Spanish" ? "SÍ" : "YES"}
                        </p>
                      </div>
                      <div>
                        <img src={Checked} alt="" />
                      </div>
                    </div>
                  </div>

                  <div
                    to="/"
                    onClick={() => {
                      handleConfrmStepWhen(
                        "NO",
                        -1,
                        selectedLanguage === "" && selectedGender === ""
                          ? No_male
                          : selectedLanguage === "Spanish" &&
                              selectedGender === "Male"
                            ? No_no_maleSpanish
                            : selectedLanguage === "Spanish" &&
                                selectedGender === "Female"
                              ? femaleNoSpanish
                              : selectedLanguage === "" &&
                                  selectedGender === "Female"
                                ? NoFemale
                                : selectedLanguage === "" &&
                                    selectedGender === "Male"
                                  ? No_male
                                  : selectedLanguage === "English" &&
                                      selectedGender === "Male"
                                    ? No_male
                                    : selectedLanguage === "English" &&
                                        selectedGender === "Female"
                                      ? NoFemale
                                      : No_male,
                      );
                    }}
                  >
                    <div className="custom-wdth flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mt-5 cursor-pointer hover:border-blue-600 transition-colors duration-300">
                      <div className="flex items-center">
                        <p className="text-[32px] font-medium text-red-600">
                          NO
                        </p>
                      </div>
                      <div>
                        <img src={Close} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default ConfrmStepWhen;
