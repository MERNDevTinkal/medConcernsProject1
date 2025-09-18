import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DigramBack from "../../assets/images/digram-back.png";
import DigramFront from "../../assets/images/digram-front.svg";
import Refresh from "../../assets/images/refresh_17981405.png";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import { GlobalContext } from "../../context/DiseaseContext";
import Femalebodyback from "../../assets/images/female_bodyback.png";
import Frontfemale from "../../assets/images/front_female.png";
function makeRegion(name, x1, y1, x2, y2) {
  return {
    name,
    x1: Math.min(x1, x2),
    y1: Math.min(y1, y2),
    x2: Math.max(x1, x2),
    y2: Math.max(y1, y2),
  };
}

const backRegions = [
  makeRegion(`Back`, 110, 63, 260, 160),
  makeRegion(`Elbow`, 220, 12, 250, 50),
  makeRegion(`Arm`, 250, 12, 300, 35),
  makeRegion(`Arm`, 120, 12, 220, 35),
  makeRegion(`Hand`, 310, 12, 330, 35),
  makeRegion(`Finger`, 335, 12, 360, 35),
  makeRegion(`Butt`, 260, 60, 340, 160),
  makeRegion(`Lower Leg`, 458, 60, 580, 100),
  makeRegion(`Lower Leg`, 458, 120, 580, 150),
  makeRegion(`Foot / Toe`, 590, 120, 630, 150),
  makeRegion(`Foot / Toe`, 590, 60, 630, 100),
  makeRegion(`Knee`, 430, 60, 460, 100),
  makeRegion(`Knee`, 430, 120, 460, 150),
  makeRegion(`Arm`, 250, 180, 300, 211),
  makeRegion(`Arm`, 150, 170, 220, 211),
  makeRegion(`Elbow`, 225, 170, 250, 211),
  makeRegion(`Arm`, 255, 180, 301, 210),
  makeRegion(`Hand`, 310, 210, 330, 190),
  makeRegion(`Finger`, 335, 210, 350, 190),
];

const backRegionsSpanish = [
  makeRegion(`Espalda`, 110, 63, 260, 160),
  makeRegion(`Codo`, 220, 12, 250, 50),
  makeRegion(`Brazo`, 250, 12, 300, 35),
  makeRegion(`Brazo`, 120, 12, 220, 35),
  makeRegion(`Mano`, 310, 12, 330, 35),
  makeRegion(`Dedo`, 335, 12, 360, 35),
  makeRegion(`Glúteo`, 260, 60, 340, 160),
  makeRegion(`Pierna inferior`, 458, 60, 580, 100),
  makeRegion(`Pierna inferior`, 458, 120, 580, 150),
  makeRegion(`Pie / Dedo`, 590, 120, 630, 150),
  makeRegion(`Pie / Dedo`, 590, 60, 630, 100),
  makeRegion(`Rodilla`, 430, 60, 460, 100),
  makeRegion(`Rodilla`, 430, 120, 460, 150),
  makeRegion(`Brazo`, 250, 180, 300, 211),
  makeRegion(`Brazo`, 150, 170, 220, 211),
  makeRegion(`Codo`, 225, 170, 250, 211),
  makeRegion(`Brazo`, 255, 180, 301, 210),
  makeRegion(`Mano`, 310, 210, 330, 190),
  makeRegion(`Dedo`, 335, 210, 350, 190),
];

const frontRegions = [
  makeRegion(`Forhead`, 20, 80, 40, 128),
  makeRegion(`Eye`, 45, 80, 60, 100),
  makeRegion(`Eye`, 45, 105, 60, 122),
  makeRegion(`Nose`, 50, 95, 70, 105),
  makeRegion(`Mouth`, 70, 112, 80, 90),
  makeRegion(`Ear`, 50, 70, 70, 80),
  makeRegion(`Ear`, 50, 125, 70, 135),
  makeRegion(`Neck`, 90, 80, 110, 120),
  makeRegion(`Chest & Breast`, 120, 50, 185, 150),
  makeRegion(`Abdomen`, 220, 145, 265, 60),
  makeRegion(`Pelvis / Genitals`, 290, 88, 330, 110),
  makeRegion(`Hip`, 280, 45, 320, 70),
  makeRegion(`Hip`, 280, 160, 320, 135),
  makeRegion(`Thigh`, 320, 115, 385, 160),
  makeRegion(`Thigh`, 320, 45, 385, 90),
  makeRegion(`Knee`, 400, 90, 440, 55),
  makeRegion(`Knee`, 400, 110, 440, 145),
  makeRegion(`Lower Leg`, 450, 58, 560, 90),
  makeRegion(`Lower Leg`, 450, 107, 560, 140),
  makeRegion(`Foot / Toe`, 570, 110, 610, 134),
  makeRegion(`Foot / Toe`, 570, 65, 610, 90),
  makeRegion(`Shoulder`, 180, 160, 117, 175),
  makeRegion(`Arm `, 126, 170, 290, 190),
  makeRegion(`Hand`, 298, 178, 321, 200),
  makeRegion(`Finger`, 330, 178, 340, 200),
  makeRegion(`Shoulder`, 97, 19, 131, 41),
  makeRegion(`Arm`, 137, 9, 300, 32),
  makeRegion(`Hand`, 300, 8, 330, 20),
  makeRegion(`Finger`, 330, 12, 340, 30),
];

const frontRegionsSpanish = [
  makeRegion(`Frente`, 20, 80, 40, 128),
  makeRegion(`Ojo`, 45, 80, 60, 100),
  makeRegion(`Ojo`, 45, 105, 60, 122),
  makeRegion(`Nariz`, 50, 95, 70, 105),
  makeRegion(`Boca`, 70, 112, 80, 90),
  makeRegion(`Oreja`, 50, 70, 70, 80),
  makeRegion(`Oreja`, 50, 125, 70, 135),
  makeRegion(`Cuello`, 90, 80, 110, 120),
  makeRegion(`Pecho y Senos`, 120, 50, 185, 150),
  makeRegion(`Abdomen`, 220, 145, 265, 60),
  makeRegion(`Pelvis / Genitales`, 290, 88, 330, 110),
  makeRegion(`Cadera`, 280, 45, 320, 70),
  makeRegion(`Cadera`, 280, 160, 320, 135),
  makeRegion(`Muslo`, 320, 115, 385, 160),
  makeRegion(`Muslo`, 320, 45, 385, 90),
  makeRegion(`Rodilla`, 400, 90, 440, 55),
  makeRegion(`Rodilla`, 400, 110, 440, 145),
  makeRegion(`Pierna inferior`, 450, 58, 560, 90),
  makeRegion(`Pierna inferior`, 450, 107, 560, 140),
  makeRegion(`Pierna inferior`, 570, 110, 610, 134),
  makeRegion(`Pie / Dedo`, 570, 65, 610, 90),
  makeRegion(`Hombro`, 180, 160, 117, 175),
  makeRegion(`Brazo`, 126, 170, 290, 190),
  makeRegion(`Mano`, 298, 178, 321, 200),
  makeRegion(`Dedo`, 330, 178, 340, 200),
  makeRegion(`Hombro`, 97, 19, 131, 41),
  makeRegion(`Brazo`, 137, 9, 300, 32),
  makeRegion(`Mano`, 300, 8, 330, 20),
  makeRegion(`Dedo`, 330, 12, 340, 30),
];

const PADDING = 0;

const PainDiagram = ({ selectedGender, selectedLanguage }) => {
  const [marker, setMarker] = useState(null);
  const [croppedPart, setCroppedPart] = useState(null);
  const location = useLocation();
  const mainpath = location.pathname;
  const [isfront, setIsfront] = useState(false);
  const canvasRef = useRef(null);
  const cropSize = 100;
  const navigate = useNavigate();
  const [bodyImage, setBodyImage] = useState("");
  const { addOrUpdateSummary } = useContext(GlobalContext);
  console.log("===>selectedGenderselectedGender", selectedGender);
  const handleImageClick = (e) => {
    const img = e.target;
    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const realX = clickX * scaleX;
    const realY = clickY * scaleY;
    const activeRegions = isfront
      ? selectedLanguage === "Spanish"
        ? backRegionsSpanish
        : backRegions
      : selectedLanguage === "Spanish"
      ? frontRegionsSpanish
      : frontRegions;
    let clickedRegion =
      activeRegions.find(
        (r) =>
          realX >= r.x1 - PADDING &&
          realX <= r.x2 + PADDING &&
          realY >= r.y1 - PADDING &&
          realY <= r.y2 + PADDING
      ) || null;

    // If not found, pick nearest region center (no "Body" fallback)
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
    // Speak the selected name
    getTextToSpeech(clickedRegion.name);
    // Crop around the click point
    const imageObj = new Image();
    imageObj.src = isfront ? DigramBack : DigramFront; // true = back, false = front
    imageObj.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      let startX = realX - cropSize / 2;
      let startY = realY - cropSize / 2;

      if (startX < 0) startX = 0;
      if (startY < 0) startY = 0;
      if (startX + cropSize > imageObj.naturalWidth)
        startX = imageObj.naturalWidth - cropSize;
      if (startY + cropSize > imageObj.naturalHeight)
        startY = imageObj.naturalHeight - cropSize;

      canvas.width = cropSize;
      canvas.height = cropSize;
      ctx.drawImage(
        imageObj,
        startX,
        startY,
        cropSize,
        cropSize,
        0,
        0,
        cropSize,
        cropSize
      );
      const croppedData = canvas.toDataURL("image/png");
      setMarker({ x: clickX, y: clickY });
      setCroppedPart(croppedData);
      addOrUpdateSummary(mainpath, [
        { image: croppedData, name: clickedRegion.name },
      ]);
      navigate("/concern-pain", {
        state: { partName: clickedRegion.name, image: croppedData },
      });
    };
  };

  const handleRefresh = () => {
    setIsfront((prev) => !prev);
    setCroppedPart(null);
    setMarker(null);
  };
  useEffect(() => {
    let getImage;
    if (selectedGender === "Male") {
      getImage = isfront ? DigramBack : DigramFront;
    } else {
      getImage = isfront ? Femalebodyback : Frontfemale;
    }

    setBodyImage(getImage);
  }, [selectedGender, isfront]);
  return (
    <>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleRefresh}
          className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
        >
          <img src={Refresh} alt="refresh" className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-[350px] md:w-[500px]">
          {bodyImage && (
            <img
              src={bodyImage}
              alt="body diagram"
              className="w-full h-auto"
              onClick={handleImageClick}
            />
          )}

          {marker && (
            <div
              className="absolute w-10 h-10 rounded-full bg-[#FF00004D] border-2 border-red-500 pointer-events-none"
              style={{ left: marker.x - 8, top: marker.y - 8 }}
            />
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {croppedPart && (
          <div className="p-2 border rounded shadow mt-6">
            <img
              src={croppedPart}
              alt="Selected Part"
              className="w-24 h-24 object-contain"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PainDiagram;

// import React, { useState, useRef } from "react";
// import Femalebodyback from "../../assets/images/female_bodyback.png";
// import Frontfemale from "../../assets/images/front_female.png";

// const PainDiagram = () => {
//   const [region, setRegion] = useState(null); // केवल 1 rectangle
//   const [drawing, setDrawing] = useState(false);
//   const [start, setStart] = useState(null);
//   const svgRef = useRef(null);

//   // Mouse दबाते ही शुरू
//   const handleMouseDown = (e) => {
//     const rect = svgRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setStart({ x, y });
//     setDrawing(true);
//     setRegion(null); // नया draw होने पर पुराना remove
//   };

//   // Mouse move करते समय rectangle दिखाओ
//   const handleMouseMove = (e) => {
//     if (!drawing || !start) return;
//     const rect = svgRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     setRegion({
//       x1: Math.min(start.x, x),
//       y1: Math.min(start.y, y),
//       x2: Math.max(start.x, x),
//       y2: Math.max(start.y, y),
//       name: "Selected Area",
//     });
//   };

//   // Mouse छोड़ने पर rectangle को final करो
//   const handleMouseUp = () => {
//     setDrawing(false);
//     setStart(null);
//   };

//   // Double click → remove rectangle
//   const handleDoubleClick = () => {
//     setRegion(null);
//   };
//   console.log("region", region);
//   return (
//     <>
//       <div className="flex justify-end mt-4">
//         <button
//           // onClick={handleRefresh}
//           className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
//         >
//           {/* <img src={Refresh} alt="refresh" className="w-6 h-6" /> */}
//         </button>
//       </div>

//       <div className="flex flex-col items-center">
//         <div className="relative w-[350px] md:w-[500px]">
//           {Frontfemale && (
//             <img
//               src={Frontfemale}
//               alt="body diagram"
//               className="w-full h-auto"
//             />
//           )}

//           {/* === Rectangle drawing overlay === */}
//           <svg
//             ref={svgRef}
//             className="absolute top-0 left-0 w-full h-full"
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseUp={handleMouseUp}
//           >
//             {region && (
//               <g
//                 onDoubleClick={handleDoubleClick}
//                 style={{ cursor: "pointer" }}
//               >
//                 <rect
//                   x={region.x1}
//                   y={region.y1}
//                   width={region.x2 - region.x1}
//                   height={region.y2 - region.y1}
//                   fill="rgba(255,0,0,0.2)"
//                   stroke="red"
//                   strokeWidth={2}
//                 />
//                 <text
//                   x={region.x1 + 5}
//                   y={region.y1 + 15}
//                   fontSize="12"
//                   fill="black"
//                 >
//                   {region.name}
//                 </text>
//                 <text
//                   x={region.x1 + 5}
//                   y={region.y1 + 30}
//                   fontSize="10"
//                   fill="gray"
//                 >
//                   ({Math.round(region.x1)}, {Math.round(region.y1)}) - (
//                   {Math.round(region.x2)}, {Math.round(region.y2)})
//                 </text>
//               </g>
//             )}
//           </svg>

//           {/* Old marker still works if you want */}
//           {/* {marker && ( */}
//           <div
//             className="absolute w-10 h-10 rounded-full bg-[#FF00004D] border-2 border-red-500 pointer-events-none"
//             // style={{ left: marker.x - 8, top: marker.y - 8 }}
//           />
//           {/* )} */}
//         </div>

//         {/* Hidden canvas (cropping still works if needed) */}
//         <canvas style={{ display: "none" }} />

//         {/* {croppedPart && ( */}
//         <div className="p-2 border rounded shadow mt-6">
//           {/* <img
//         src={croppedPart}
//         alt="Selected Part"
//         className="w-24 h-24 object-contain"
//       /> */}
//         </div>
//         {/* )} */}
//       </div>
//     </>
//   );
// };

// export default PainDiagram;
