import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DigramBack from "../../assets/images/digram-back.png";
import DigramFront from "../../assets/images/digram-front.svg";
import Refresh from "../../assets/images/refresh_17981405.png";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import { GlobalContext } from "../../context/DiseaseContext";
import Femalebodyback from "../../assets/images/female_bodyback.png";
import Frontfemale from "../../assets/images/front_female.png";
import { bodyImages } from "./bodyPartsImages.jsx";

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
  makeRegion(`Back`, 124, 54, 244, 156),
  makeRegion(`Right Elbow`, 220, 12, 250, 50),
  makeRegion(`Right forearm`, 248, 13, 294, 35),
  makeRegion(`Right Arm`, 153, 28, 225, 49),
  makeRegion(`Right Hand`, 310, 12, 330, 35),
  makeRegion(`Right Finger`, 335, 12, 360, 35),
  makeRegion(`Right Lower Leg`, 458, 60, 580, 100),
  makeRegion(`Left Lower Leg`, 458, 120, 580, 150),
  makeRegion(`Left Foot & Toe`, 590, 120, 630, 150),
  makeRegion(`Right Foot & Toe`, 590, 60, 630, 100),
  makeRegion(`Knee`, 430, 60, 460, 100),
  makeRegion(`Knee`, 430, 120, 460, 150),
  makeRegion(`Left forearm`, 247, 177, 293, 205),
  makeRegion(`Left Arm`, 149, 171, 220, 199),
  makeRegion(`Left Elbow`, 225, 170, 250, 211),
  makeRegion(`Left Hand`, 310, 210, 330, 190),
  makeRegion(`Left Finger`, 335, 210, 350, 190),
  makeRegion(`Left Shoulder`, 108, 162, 149, 190),
  makeRegion(`Right Shoulder`, 114, 28, 151, 65),
  makeRegion(`Right Wrist`, 297, 14, 306, 31),
  makeRegion(`Left Wrist`, 294, 190, 303, 206),
  makeRegion(`Lower Back`, 245, 67, 271, 155),
  makeRegion(`Right Butt`, 277, 56, 344, 112),
  makeRegion(`Left Butt`, 261, 121, 344, 168),
  makeRegion(`Right Thigh`, 347, 56, 425, 101),
  makeRegion(`Left Thigh`, 344, 114, 413, 168),
  makeRegion(`Forhead`, 16, 91, 75, 127),
  makeRegion(`Right Ear`, 44, 76, 69, 88),
  makeRegion(`Left Ear`, 47, 135, 69, 141),
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
  makeRegion(`Right Ear`, 50, 70, 70, 80),
  makeRegion(`Left Ear`, 50, 125, 70, 135),
  makeRegion(`Neck`, 90, 80, 110, 120),
  makeRegion(`Chest & Breast`, 120, 50, 185, 150),
  makeRegion(`Abdomen`, 220, 145, 265, 60),
  makeRegion(`Pelvis / Genitals`, 290, 88, 330, 110),
  makeRegion(`Right Hip`, 280, 45, 320, 70),
  makeRegion(`Left Hip`, 280, 160, 320, 135),
  makeRegion(`Left Thigh`, 320, 115, 385, 160),
  makeRegion(`Right Thigh`, 320, 45, 385, 90),
  makeRegion(`Right Knee`, 400, 90, 440, 55),
  makeRegion(`Left Knee`, 400, 110, 440, 145),
  makeRegion(`Right Lower Leg`, 450, 58, 560, 90),
  makeRegion(`Left Lower Leg`, 450, 107, 560, 140),
  makeRegion(`Left Foot & Toe`, 570, 110, 610, 134),
  makeRegion(`Right Foot & Toe`, 570, 65, 610, 90),
  makeRegion(`Left Shoulder`, 180, 160, 117, 175),
  makeRegion(`Left Arm `, 143, 155, 209, 182),
  makeRegion(`Left Hand`, 298, 178, 321, 200),
  makeRegion(`Finger`, 330, 178, 340, 200),
  makeRegion(`Right Shoulder`, 97, 19, 131, 41),
  makeRegion(`Right Arm`, 150, 10, 221, 49),
  makeRegion(`Right Hand`, 300, 8, 330, 20),
  makeRegion(`Finger`, 330, 12, 340, 30),
  makeRegion(`Left Forearm`, 221, 162, 279, 191),
  makeRegion(`Right Forearm`, 230, 7, 288, 39),
  makeRegion(`Left Cheek`, 59, 111, 70, 124),
  makeRegion(`Right Cheek`, 58, 84, 70, 94),
  makeRegion(`Chin`, 85, 94, 88, 112),
];

const frontRegionsSpanish = [
  makeRegion(`Frente`, 20, 80, 40, 128),
  makeRegion(`Ojo`, 45, 80, 60, 100),
  makeRegion(`Ojo`, 45, 105, 60, 122),
  makeRegion(`Nariz`, 50, 95, 70, 105),
  makeRegion(`Boca`, 70, 112, 80, 90),
  makeRegion(`Oreja Derecha`, 50, 70, 70, 80),
  makeRegion(`Oreja Izquierda`, 50, 125, 70, 135),
  makeRegion(`Cuello`, 90, 80, 110, 120),
  makeRegion(`Pecho y Senos`, 120, 50, 185, 150),
  makeRegion(`Abdomen`, 220, 145, 265, 60),
  makeRegion(`Pelvis / Genitales`, 290, 88, 330, 110),
  makeRegion(`Cadera Derecha`, 280, 45, 320, 70),
  makeRegion(`Cadera Izquierda`, 280, 160, 320, 135),
  makeRegion(`Muslo Izquierdo`, 320, 115, 385, 160),
  makeRegion(`Muslo Derecho`, 320, 45, 385, 90),
  makeRegion(`Rodilla Derecha`, 400, 90, 440, 55),
  makeRegion(`Rodilla Izquierda`, 400, 110, 440, 145),
  makeRegion(`Pierna Inferior Derecha`, 450, 58, 560, 90),
  makeRegion(`Pierna Inferior Izquierda`, 450, 107, 560, 140),
  makeRegion(`Pie y Dedos Izquierdos`, 570, 110, 610, 134),
  makeRegion(`Pie y Dedos Derechos`, 570, 65, 610, 90),
  makeRegion(`Hombro Izquierdo`, 180, 160, 117, 175),
  makeRegion(`Brazo Izquierdo`, 143, 155, 209, 182),
  makeRegion(`Mano Izquierda`, 298, 178, 321, 200),
  makeRegion(`Dedo Izquierdo`, 330, 178, 340, 200),
  makeRegion(`Hombro Derecho`, 97, 19, 131, 41),
  makeRegion(`Brazo Derecho`, 150, 10, 221, 49),
  makeRegion(`Mano Derecha`, 300, 8, 330, 20),
  makeRegion(`Dedo Derecho`, 330, 12, 340, 30),
  makeRegion(`Antebrazo Izquierdo`, 221, 162, 279, 191),
  makeRegion(`Antebrazo Derecho`, 230, 7, 288, 39),
  makeRegion(`Mejilla Izquierda`, 59, 111, 70, 124),
  makeRegion(`Mejilla Derecha`, 58, 84, 70, 94),
  makeRegion(`Barbilla`, 85, 94, 88, 112),
];

const femalefrontRegions = [
  makeRegion(`Chest & Breast`, 385, 192, 602, 444),
  makeRegion(`Abdomen`, 623, 211, 844, 413),
  makeRegion(`Shoulder`, 353, 441, 518, 494),
  makeRegion(`Arm`, 448, 490, 858, 529),
  makeRegion(`Hand`, 883, 522, 942, 599),
  makeRegion(`Finger`, 953, 536, 1016, 613),
  makeRegion(`Neck`, 304, 266, 364, 340),
  makeRegion(`Shoulder`, 364, 119, 494, 185),
  makeRegion(`Arm`, 476, 87, 890, 108),
  makeRegion(`Hand`, 886, 28, 953, 98),
  makeRegion(`Finger`, 932, 17, 1034, 59),
  makeRegion(`Hip`, 830, 147, 946, 220),
  makeRegion(`Thigh`, 946, 150, 1174, 287),
  makeRegion(`Knee`, 1139, 189, 1254, 287),
  makeRegion(`Lower Leg`, 1261, 171, 1573, 255),
  makeRegion(`Foot & Toe`, 1566, 199, 1672, 255),
  makeRegion(`Hip`, 802, 406, 939, 483),
  makeRegion(`Thigh`, 939, 315, 1170, 441),
  makeRegion(`Knee`, 1167, 322, 1251, 423),
  makeRegion(`Lower Leg`, 1268, 329, 1556, 406),
  makeRegion(`Lower Leg`, 1268, 329, 1556, 406),
  makeRegion(`Foot & Toe`, 1559, 325, 1672, 413),
  makeRegion(`Forhead`, 133, 238, 171, 367),
  makeRegion(`Eye`, 185, 252, 217, 297),
  makeRegion(`Eye`, 185, 311, 224, 364),
  makeRegion(`Ear`, 185, 367, 241, 395),
  makeRegion(`Ear`, 189, 213, 255, 248),
  makeRegion(`Nose`, 196, 297, 255, 318),
  makeRegion(`Mouth`, 259, 287, 297, 332),
  makeRegion(`Pelvis / Genitals`, 877, 241, 912, 367),
];

const femaleBackImage = [
  makeRegion(`Back`, 385, 164, 739, 437),
  makeRegion(`Elbow`, 588, 476, 651, 539),
  makeRegion(`Arm`, 367, 473, 578, 501),
  makeRegion(`Lower Arm`, 637, 536, 851, 571),
  makeRegion(`Hand`, 890, 532, 960, 599),
  makeRegion(`Finger`, 974, 532, 1013, 606),
  makeRegion(`Arm`, 381, 122, 595, 164),
  makeRegion(`Lower Arm`, 648, 59, 862, 105),
  makeRegion(`Hand`, 872, 38, 956, 80),
  makeRegion(`Finger`, 949, 10, 1013, 73),
  makeRegion(`Butt`, 746, 168, 942, 476),
  makeRegion(`Thigh`, 942, 147, 1177, 273),
  makeRegion(`Knee`, 1184, 178, 1247, 287),
  makeRegion(`Lower Leg`, 1251, 168, 1595, 262),
  makeRegion(`Foot & Toe`, 1609, 157, 1682, 269),
  makeRegion(`Thigh`, 914, 325, 1181, 437),
  makeRegion(`Knee`, 1191, 325, 1293, 434),
  makeRegion(`Lower Leg`, 1297, 329, 1605, 402),
  makeRegion(`Foot&Toe`, 1602, 325, 1676, 406),
];

const femalefrontRegionsSpanish = [
  makeRegion(`Pecho y Senos`, 385, 192, 602, 444), // Chest & Breast
  makeRegion(`Abdomen`, 623, 211, 844, 413), // Abdomen
  makeRegion(`Hombro`, 353, 441, 518, 494), // Shoulder
  makeRegion(`Brazo`, 448, 490, 858, 529), // Arm
  makeRegion(`Mano`, 883, 522, 942, 599), // Hand
  makeRegion(`Dedo`, 953, 536, 1016, 613), // Finger
  makeRegion(`Cuello`, 304, 266, 364, 340), // Neck
  makeRegion(`Hombro`, 364, 119, 494, 185), // Shoulder
  makeRegion(`Brazo`, 476, 87, 890, 108), // Arm
  makeRegion(`Mano`, 886, 28, 953, 98), // Hand
  makeRegion(`Dedo`, 932, 17, 1034, 59), // Finger
  makeRegion(`Cadera`, 830, 147, 946, 220), // Hip
  makeRegion(`Muslo`, 946, 150, 1174, 287), // Thigh
  makeRegion(`Rodilla`, 1139, 189, 1254, 287), // Knee
  makeRegion(`Pierna Inferior`, 1261, 171, 1573, 255), // Lower Leg
  makeRegion(`Pie y Dedos`, 1566, 199, 1672, 255), // Foot & Toe
  makeRegion(`Cadera`, 802, 406, 939, 483), // Hip
  makeRegion(`Muslo`, 939, 315, 1170, 441), // Thigh
  makeRegion(`Rodilla`, 1167, 322, 1251, 423), // Knee
  makeRegion(`Pierna Inferior`, 1268, 329, 1556, 406), // Lower Leg
  makeRegion(`Pierna Inferior`, 1268, 329, 1556, 406), // Lower Leg (duplicate)
  makeRegion(`Pie y Dedos`, 1559, 325, 1672, 413), // Foot & Toe
  makeRegion(`Frente`, 133, 238, 171, 367), // Forhead
  makeRegion(`Ojo`, 185, 252, 217, 297), // Eye
  makeRegion(`Ojo`, 185, 311, 224, 364), // Eye
  makeRegion(`Oreja`, 185, 367, 241, 395), // Ear
  makeRegion(`Oreja`, 189, 213, 255, 248), // Ear
  makeRegion(`Nariz`, 196, 297, 255, 318), // Nose
  makeRegion(`Boca`, 259, 287, 297, 332), // Mouth
  makeRegion(`Pelvis / Genitales`, 877, 241, 912, 367), // Pelvis / Genitals
];

const femaleBackImageSpanish = [
  makeRegion(`Espalda`, 385, 164, 739, 437), // Back
  makeRegion(`Codo`, 588, 476, 651, 539), // Elbow
  makeRegion(`Superior`, 367, 473, 578, 501), // Upper Arm
  makeRegion(`Antebrazo`, 637, 536, 851, 571), // Lower Arm
  makeRegion(`Mano`, 890, 532, 960, 599), // Hand
  makeRegion(`Dedo`, 974, 532, 1013, 606), // Finger
  makeRegion(`Superior`, 381, 122, 595, 164), // Upper Arm
  makeRegion(`Antebrazo`, 648, 59, 862, 105), // Lower Arm
  makeRegion(`Mano`, 872, 38, 956, 80), // Hand
  makeRegion(`Dedo`, 949, 10, 1013, 73), // Finger
  makeRegion(`Glúteos`, 746, 168, 942, 476), // Butt
  makeRegion(`Muslo`, 942, 147, 1177, 273), // Thigh
  makeRegion(`Rodilla`, 1184, 178, 1247, 287), // Knee
  makeRegion(`Pierna Inferior`, 1251, 168, 1595, 262), // Lower Leg
  makeRegion(`Pie y Dedos`, 1609, 157, 1682, 269), // Foot & Toe
  makeRegion(`Muslo`, 914, 325, 1181, 437), // Thigh
  makeRegion(`Rodilla`, 1191, 325, 1293, 434), // Knee
  makeRegion(`Pierna Inferior`, 1297, 329, 1605, 402), // Lower Leg
  makeRegion(`Pie y Dedos`, 1602, 325, 1676, 406), // Foot & Toe
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
        ? selectedGender === "Female"
          ? femaleBackImageSpanish
          : backRegionsSpanish
        : selectedGender === "Female"
        ? femaleBackImage
        : backRegions
      : selectedLanguage === "Spanish"
      ? selectedGender === "Female"
        ? femalefrontRegionsSpanish
        : frontRegionsSpanish
      : selectedGender === "Female"
      ? femalefrontRegions
      : frontRegions;
    let clickedRegion =
      activeRegions.find(
        (r) =>
          realX >= r.x1 - PADDING &&
          realX <= r.x2 + PADDING &&
          realY >= r.y1 - PADDING &&
          realY <= r.y2 + PADDING
      ) || null;
    console.log("==>clickedRegionclickedRegion", clickedRegion);
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
    getTextToSpeech(
      selectedLanguage === "Spanish"
        ? clickedRegion.nameEs
        : clickedRegion.name,
      selectedLanguage === "Spanish" ? "es-ES" : ""
    );
    const imageObj = new Image();
    imageObj.src = bodyImage;
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
      const value = clickedRegion?.name;
      addOrUpdateSummary(mainpath, [
        { image: bodyImages?.men?.[value], name: clickedRegion.name },
      ]);
      // navigate("/concern-pain", {
      //   state: {
      //     partName: clickedRegion.name,
      //     image: bodyImages?.men?.[value],
      //   },
      // });
    };
  };

  const handleRefresh = () => {
    setIsfront((prev) => !prev);
    setCroppedPart(null);
    setMarker(null);
  };
  useEffect(() => {
    let getImage;
    if (selectedGender === "Female") {
      getImage = isfront ? Femalebodyback : Frontfemale;
    } else {
      getImage = isfront ? DigramBack : DigramFront;
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
// // import Frontfemale from "../../assets/images/front_female.png";
// // import Frontfemale from "../../assets/images/female_bodyback.png";
// import Frontfemale from "../../assets/images/digram-back.png";
// // import Frontfemale from "../../assets/images/digram-front.svg";
// function makeRegion(name, x1, y1, x2, y2) {
//   return {
//     name,
//     x1: Math.min(x1, x2),
//     y1: Math.min(y1, y2),
//     x2: Math.max(x1, x2),
//     y2: Math.max(y1, y2),
//   };
// }

// const PainDiagram = () => {
//   const [region, setRegion] = useState(null);
//   const [drawing, setDrawing] = useState(false);
//   const [start, setStart] = useState(null);
//   const svgRef = useRef(null);
//   const imgRef = useRef(null);

//   const handleMouseDown = (e) => {
//     const rect = svgRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setStart({ x, y });
//     setDrawing(true);
//     setRegion(null);
//   };

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
//       name: "",
//     });
//   };

//   const handleMouseUp = () => {
//     setDrawing(false);
//     setStart(null);

//     if (region && imgRef.current) {
//       // === Scale according to natural image size ===
//       const img = imgRef.current;
//       const scaleX = img.naturalWidth / img.width;
//       const scaleY = img.naturalHeight / img.height;

//       const realRegion = makeRegion(
//         "Selected Area",
//         Math.round(region.x1 * scaleX),
//         Math.round(region.y1 * scaleY),
//         Math.round(region.x2 * scaleX),
//         Math.round(region.y2 * scaleY)
//       );

//       console.log(
//         `makeRegion(\`${realRegion.name}\`, ${realRegion.x1}, ${realRegion.y1}, ${realRegion.x2}, ${realRegion.y2}),`
//       );
//     }
//   };

//   const handleDoubleClick = () => {
//     setRegion(null);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div className="relative w-[350px] md:w-[500px]">
//         <img
//           ref={imgRef}
//           src={Frontfemale}
//           alt="body diagram"
//           className="w-full h-auto"
//         />

//         {/* Drawing Layer */}
//         <svg
//           ref={svgRef}
//           className="absolute top-0 left-0 w-full h-full"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//         >
//           {region && (
//             <g onDoubleClick={handleDoubleClick} style={{ cursor: "pointer" }}>
//               <rect
//                 x={region.x1}
//                 y={region.y1}
//                 width={region.x2 - region.x1}
//                 height={region.y2 - region.y1}
//                 fill="rgba(255,0,0,0.2)"
//                 stroke="red"
//                 strokeWidth={2}
//               />
//               <text
//                 x={region.x1 + 5}
//                 y={region.y1 + 15}
//                 fontSize="12"
//                 fill="black"
//               >
//                 {region.name}
//               </text>
//               <text
//                 x={region.x1 + 5}
//                 y={region.y1 + 30}
//                 fontSize="10"
//                 fill="gray"
//               >
//                 ({Math.round(region.x1)}, {Math.round(region.y1)}) - (
//                 {Math.round(region.x2)}, {Math.round(region.y2)})
//               </text>
//             </g>
//           )}
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default PainDiagram;
