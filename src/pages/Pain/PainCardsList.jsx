import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../../context/DiseaseContext";
import { diseasesData } from "../../Component/DiseasesData/diseasesData";
import { useNavigate, useLocation } from "react-router-dom";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import Loader from "../../Component/webLoader/loader";
import Cookies from "js-cookie";

const PainCardsList = ({
  selectedGender,
  selectedLanguage,
  selectedIconCount,
}) => {
  const { addOrUpdateSummary } = useContext(GlobalContext);
  const isSpeakingRef = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();
  const pathprimary = location.pathname;
  const [loader, setLoader] = useState(true);
  const [painFeelParams, setPainFeelParams] = useState([]);
  const handleConcern = async (value, path) => {
    if (value && path) {
      if (isSpeakingRef.current) return;
      isSpeakingRef.current = true;

      await getTextToSpeech(
        selectedLanguage === "Spanish" ? value.nameEs : value.name,
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
      const isConcern = Cookies.get("is_concern");
      const prefix = isConcern && isConcern?.includes("true_")
        ? isConcern + "/" + pathprimary
        : pathprimary;
      addOrUpdateSummary(prefix, [value]);
      navigate(path);
      isSpeakingRef.current = false;
    }
  };
  useEffect(() => {
    setPainFeelParams(diseasesData[pathprimary]);
    setLoader(false);
  }, [pathprimary]);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {painFeelParams.map((item) => (
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
              key={item.id}
              onClick={() =>
                handleConcern(
                  item,
                  item?.secPath?.includes("/confrm-step-yesno")
                    ? `${pathprimary}${item?.secPath}/${item?.id}`
                    : `${item?.secPath}`
                )
              }
            >
              <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
                <div className="dashboard-img card-img-h rounded-2xl">
                  <img
                    style={{
                      ...(selectedIconCount === 6 ? { height: "" } : ""),
                    }}
                    src={item.image}
                    className="w-full "
                    alt={item.name}
                  />
                </div>
                <p className="text-[16px] mt-3 mb-2 color-black">
                  {selectedLanguage === "Spanish" ? item.nameEs : item.name}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default PainCardsList;
