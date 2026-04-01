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
  makeRegion("Left Ear", 11, 358, 88, 518, ear),
  makeRegion("Right Ear", 476, 362, 540, 522, ear),
  makeRegion("Forehead", 123, 78, 471, 324, forehead),
  makeRegion("Left Eye", 103, 317, 254, 430, eye),
  makeRegion("Right Eye", 320, 324, 466, 424, eye),
  makeRegion("Nose", 241, 398, 332, 547, nose),
  makeRegion("Mouth", 188, 558, 361, 639, mouth),
  makeRegion("Right Cheek", 358, 474, 451, 601, cheek),
  makeRegion("Left Cheek", 105, 451, 222, 564, cheek),
  makeRegion("Chin", 210, 652, 349, 712, chin),
  makeRegion("Neck", 125, 715, 462, 882, Neck),
];

// female (Spanish)
const femaleFaceRegionsSpanish = [
  makeRegion("Oreja Izquierdo", 109, 322, 257, 444, orejaFemaleSpanish),
  makeRegion("Oreja Derecho", 318, 319, 474, 442, orejaFemaleSpanish),
  makeRegion("Frente", 123, 78, 471, 324, frenteFemaleSpanish),
  makeRegion("Ojo Izquierdo", 13, 367, 103, 522, ojoFemaleSpanish),
  makeRegion("Ojo Derecho", 473, 357, 546, 523, ojoFemaleSpanish),
  makeRegion("Nariz", 241, 398, 332, 547, narizFemaleSpanish),
  makeRegion("Boca", 188, 558, 361, 639, bocaFemaleSpanish),
  makeRegion("Mejilla Derecho", 549, 599, 615, 719, mejillaFemaleSpanish),
  makeRegion("Mejilla Izquierdo", 287, 539, 379, 657, mejillaFemaleSpanish),
  makeRegion("Barbilla", 210, 652, 349, 712, barbillaFemaleSpanish),
  makeRegion("Cuello", 125, 715, 462, 882, cuelloFemaleSpanish),
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
      () => { },
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => { },
      () => { },
      () => { },
      () => { },
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

                      className="digram-cards-img cursor-pointer absolute left-1/2 bottom-0 transform -translate-x-1/2"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
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
// import React, { useState, useRef } from "react";
// import { Femalebodyback } from "../../Component/DiseasesData/images.jsx";
// import {
//   maleCompleteFace,
//   femaleCompleteFace,
// } from "../../Component/DiseasesData/images";
// function makeRegion(name, x1, y1, x2, y2) {
//   return {
//     name,
//     x1: Math.min(x1, x2),
//     y1: Math.min(y1, y2),
//     x2: Math.max(x1, x2),
//     y2: Math.max(y1, y2),
//   };
// }

// const PainDiagramGenerator = () => {
//   const [region, setRegion] = useState(null);
//   const [drawing, setDrawing] = useState(false);
//   const [start, setStart] = useState(null);

//   const svgRef = useRef(null);
//   const imgRef = useRef(null);

//   const getMousePos = (e) => {
//     const rect = svgRef.current.getBoundingClientRect();
//     return {
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     };
//   };

//   const handleMouseDown = (e) => {
//     const pos = getMousePos(e);
//     setStart(pos);
//     setDrawing(true);
//     setRegion(null);
//   };

//   const handleMouseMove = (e) => {
//     if (!drawing || !start) return;

//     const pos = getMousePos(e);

//     setRegion({
//       x1: Math.min(start.x, pos.x),
//       y1: Math.min(start.y, pos.y),
//       x2: Math.max(start.x, pos.x),
//       y2: Math.max(start.y, pos.y),
//     });
//   };

//   const handleMouseUp = () => {
//     setDrawing(false);
//     setStart(null);

//     if (region && imgRef.current) {
//       const img = imgRef.current;

//       const scaleX = img.naturalWidth / img.width;
//       const scaleY = img.naturalHeight / img.height;

//       const realRegion = makeRegion(
//         "Body Part",
//         Math.round(region.x1 * scaleX),
//         Math.round(region.y1 * scaleY),
//         Math.round(region.x2 * scaleX),
//         Math.round(region.y2 * scaleY)
//       );

//       console.log(
//         `makeRegion(\`${realRegion.name}\`, ${realRegion.x1}, ${realRegion.y1}, ${realRegion.x2}, ${realRegion.y2}, audioFile),`
//       );
//     }
//   };

//   const clearRegion = () => {
//     setRegion(null);
//   };

//   return (
//     <div className="flex flex-col items-center p-6">

//       <h2 className="text-lg font-bold mb-4">
//         Drag to Create Region
//       </h2>

//       <div className="relative w-[350px] md:w-[500px]">

//         <img
//           ref={imgRef}
//           src={femaleCompleteFace}
//           alt="body diagram"
//           className="w-full h-auto select-none"
//           draggable={false}
//         />

//         <svg
//           ref={svgRef}
//           className="absolute top-0 left-0 w-full h-full cursor-crosshair"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//         >
//           {region && (
//             <g onDoubleClick={clearRegion}>

//               <rect
//                 x={region.x1}
//                 y={region.y1}
//                 width={region.x2 - region.x1}
//                 height={region.y2 - region.y1}
//                 fill="rgba(255,0,0,0.25)"
//                 stroke="red"
//                 strokeWidth={2}
//               />

//               <text
//                 x={region.x1 + 5}
//                 y={region.y1 + 15}
//                 fontSize="12"
//                 fill="black"
//               >
//                 Selected Area
//               </text>

//               <text
//                 x={region.x1 + 5}
//                 y={region.y1 + 30}
//                 fontSize="10"
//                 fill="gray"
//               >
//                 ({Math.round(region.x1)}, {Math.round(region.y1)}) →
//                 ({Math.round(region.x2)}, {Math.round(region.y2)})
//               </text>

//             </g>
//           )}
//         </svg>
//       </div>

//       <p className="mt-4 text-sm text-gray-600">
//         Drag mouse to create region • Double click box to clear
//       </p>
//     </div>
//   );
// };

// export default PainDiagramGenerator;