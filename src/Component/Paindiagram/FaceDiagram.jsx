import React, { useState, useRef, useEffect, useContext } from "react";
import {
  maleCompleteFace,
  femaleCompleteFace,
} from "../../Component/DiseasesData/images";
import Loader from "../../Component/webLoader/loader";
import Header from "../../Component/Layout/Header/Header";
import getSetting from "../../Component/settingApi/settings";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import { GlobalContext } from "../../context/DiseaseContext";
import { bodyImages } from "./bodyPartsImages.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  // men
  // English
  EarMale,
  Forehead_comMale,
  EyeMale,
  NoseMale,
  MouthMale,
  neckMale,
  ChinMale,
  Cheeks_comMale,
  // spanish
  orejaMAleSpanish,
  ojoMAleSpanish,
  narizMAleSpanish,
  bocaMAleSpanish,
  MejillaMAleSpanish,
  BarbillaMAleSpanish,
  CuelloMAleSpanish,
  EspaldaMAleSpanish,
  // female
  // English
  eye,
  ear,
  nose,
  mouth,
  cheek,
  chin,
  Neck,
  forehead,
  // spanish
  orejaFemaleSpanish,
  frenteFemaleSpanish,
  ojoFemaleSpanish,
  narizFemaleSpanish,
  bocaFemaleSpanish,
  mejillaFemaleSpanish,
  barbillaFemaleSpanish,
  cuelloFemaleSpanish,
} from "../../Component/DiseasesData/audio.jsx";

/* =========================
   REGION HELPER
========================= */
const makeRegion = (name, x1, y1, x2, y2, audio) => ({
  name,
  x1,
  y1,
  x2,
  y2,
  audio,
});

// male
const earFaceRegions = [
  makeRegion("Left Ear", 297, 532, 357, 672, EarMale),
  makeRegion("Right Ear", 667, 530, 723, 666, EarMale),
  makeRegion("Forehead", 347, 314, 667, 482, Forehead_comMale),
  makeRegion("Left Eye", 355, 510, 475, 572, EyeMale),
  makeRegion("Right Eye", 539, 516, 639, 582, EyeMale),
  makeRegion("Nose", 477, 554, 553, 662, NoseMale),
  makeRegion("Mouth", 425, 672, 575, 736, MouthMale),
  makeRegion("Right Cheek", 583, 602, 639, 726, Cheeks_comMale),
  makeRegion("Left Cheek", 353, 612, 439, 742, Cheeks_comMale),
  makeRegion("Chin", 443, 762, 567, 814, ChinMale),
  makeRegion("Neck", 333, 823, 685, 945, neckMale),
];

// male (Spanish)
const earFaceRegionsSpanish = [
  makeRegion("Oreja Izquierdo", 297, 532, 357, 672, orejaMAleSpanish),
  makeRegion("Oreja Derecho", 667, 530, 723, 666, orejaMAleSpanish),
  makeRegion("Frente", 347, 314, 667, 482, EspaldaMAleSpanish),
  makeRegion("Ojo Izquierdo", 355, 510, 475, 572, ojoMAleSpanish),
  makeRegion("Ojo Derecho", 539, 516, 639, 582, ojoMAleSpanish),
  makeRegion("Nariz", 477, 554, 553, 662, narizMAleSpanish),
  makeRegion("Boca", 425, 672, 575, 736, bocaMAleSpanish),
  makeRegion("Mejilla Derecho", 583, 602, 639, 726, MejillaMAleSpanish),
  makeRegion("Mejilla Izquierdo", 353, 612, 439, 742, MejillaMAleSpanish),
  makeRegion("Barbilla", 443, 762, 567, 814, BarbillaMAleSpanish),
  makeRegion("Cuello", 333, 823, 685, 945, CuelloMAleSpanish),
];

// female
const femaleFaceRegions = [
  makeRegion("Left Ear", 297, 532, 357, 672, ear),
  makeRegion("Right Ear", 629, 545, 697, 645, ear),
  makeRegion("Forehead", 385, 329, 663, 487, forehead),
  makeRegion("Left Eye", 355, 505, 483, 575, eye),
  makeRegion("Right Eye", 535, 509, 633, 565, eye),
  makeRegion("Nose", 473, 563, 539, 657, nose),
  makeRegion("Mouth", 427, 674, 587, 757, mouth),
  makeRegion("Right Cheek", 549, 599, 615, 719, cheek),
  makeRegion("Left Cheek", 287, 539, 379, 657, cheek),
  makeRegion("Chin", 447, 774, 578, 820, chin),
  makeRegion("Neck", 359, 787, 619, 943, Neck),
];

// female (Spanish)
const femaleFaceRegionsSpanish = [
  makeRegion("Oreja Izquierdo", 297, 532, 357, 672, orejaFemaleSpanish),
  makeRegion("Oreja Derecho", 629, 545, 697, 645, orejaFemaleSpanish),
  makeRegion("Frente", 385, 329, 663, 487, frenteFemaleSpanish),
  makeRegion("Ojo Izquierdo", 355, 505, 483, 575, ojoFemaleSpanish),
  makeRegion("Ojo Derecho", 535, 509, 633, 565, ojoFemaleSpanish),
  makeRegion("Nariz", 473, 563, 539, 657, narizFemaleSpanish),
  makeRegion("Boca", 427, 674, 587, 757, bocaFemaleSpanish),
  makeRegion("Mejilla Derecho", 549, 599, 615, 719, mejillaFemaleSpanish),
  makeRegion("Mejilla Izquierdo", 287, 539, 379, 657, mejillaFemaleSpanish),
  makeRegion("Barbilla", 447, 774, 578, 820, barbillaFemaleSpanish),
  makeRegion("Cuello", 359, 787, 619, 943, cuelloFemaleSpanish),
];

/* =========================
   COMPONENT
========================= */
const EarDiagram = () => {
  const imageRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [loader, setLoader] = useState(true);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [calendarOn, setCalendarOn] = useState("");
  const [introductionOn, setIntroductionOn] = useState("");
  const { addOrUpdateSummary } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();
  const mainpath = location.pathname;
  const replaceString = (bodyName) => {
    const replacements = [
      { en: "left", es: "Izquierdo" },
      { en: "right", es: "Derecho" },
    ];
    let result = bodyName;
    replacements.forEach(({ en, es }) => {
      const regexEn = new RegExp(en, "gi");
      const regexEs = new RegExp(es, "gi");

      result = result.replace(regexEn, "").replace(regexEs, "");
    });
    return result.replace(/\s+/g, " ").trim();
  };
  useEffect(() => {
    getSetting(
      () => {},
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => {},
      () => {},
      () => {},
      () => {},
    );
  }, []);

  const handleClick = (e) => {
    const img = imageRef.current;
    const rect = img.getBoundingClientRect();

    // Click position on displayed image
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert to REAL image coordinates
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    const realX = clickX * scaleX;
    const realY = clickY * scaleY;

    const activeRegions =
      selectedGender === "Female" && selectedLanguage === "Spanish"
        ? femaleFaceRegionsSpanish
        : selectedGender === "Female" && selectedLanguage === "English"
          ? femaleFaceRegions
          : selectedGender === "Female" && selectedLanguage === ""
            ? femaleFaceRegions
            : selectedGender === "Male" && selectedLanguage === ""
              ? earFaceRegions
              : selectedGender === "Male" && selectedLanguage === "Spanish"
                ? earFaceRegionsSpanish
                : earFaceRegions;
    // Find region
    let clickedRegion =
      activeRegions.find(
        (r) => realX >= r.x1 && realX <= r.x2 && realY >= r.y1 && realY <= r.y2,
      ) || null;

    if (!clickedRegion) {
      let minDist = Infinity;
      activeRegions.forEach((r) => {
        const cx = (r.x1 + r.x2) / 2;
        const cy = (r.y1 + r.y2) / 2;
        const d = Math.hypot(realX - cx, realY - cy);
        if (d < minDist) {
          minDist = d;
          clickedRegion = r;
        }
      });
    }
    setMarker({ x: clickX, y: clickY });
    const cleanedName = clickedRegion.name
      .replace(/^(Right|Left)\s+/i, "") // English
      .replace(
        /^(Derecho|Izquierdo|Derecho|Izquierdo|Izquierdo|derecho)\s+/i,
        "",
      );
    getTextToSpeech(
      cleanedName,
      selectedLanguage === "Spanish" ? "es-ES" : "",
      clickedRegion?.audio,
    );

    setMarker({ x: clickX, y: clickY });
    const value = clickedRegion?.name;
    const isConcern = Cookies.get("is_concern");
    const prefix =
      isConcern && isConcern?.includes("true_")
        ? isConcern + "/" + mainpath
        : mainpath;
    addOrUpdateSummary(prefix, [
      {
        image:
          bodyImages?.[selectedGender === "Female" ? "women" : "men"]?.[value],
        name: replaceString(clickedRegion?.name),
      },
    ]);
    Cookies.set("is_pain_flow", "Yes");
    navigate("/concern-pain", {
      state: {
        partName: replaceString(clickedRegion?.name),
        image:
          bodyImages?.[selectedGender === "Female" ? "women" : "men"]?.[value],
      },
    });
    // isSpeakingRef.current = false;
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            calendarOn={calendarOn}
            introductionOn={introductionOn}
            name={
              selectedLanguage === "Spanish"
                ? "¿Dónde está tu dolor?"
                : "Where is your pain?"
            }
          />

          <div className="main-wrapper pt-20">
            <div className="flex justify-center">
              <div className="relative bg-white shadow rounded-xl max-w-2xl w-full">
                <div className="flex justify-center relative  h-[220px] rounded-2xl shadow-md">
                  <div className="digram-cards ">
                    <img
                      ref={imageRef}
                      src={
                        selectedGender === "Female"
                          ? femaleCompleteFace
                          : maleCompleteFace
                      }
                      alt="Face Diagram"
                      onClick={handleClick}
                      draggable={false}
                      className="digram-cards-img cursor-pointer absolute left-1/2 bottom-0 transform -translate-x-1/2"
                    />
                    {marker && (
                      <div
                        className="absolute w-8 h-8 rounded-full bg-red-500/40 border-2 border-red-600 pointer-events-none"
                        style={{
                          left: marker.x,
                          top: marker.y,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EarDiagram;
