// import React, { useState, useRef } from "react";
// import DigramBack from "../../assets/images/digram-back.png";
// import DigramFront from "../../assets/images/digram-front.svg";
// import Refresh from "../../assets/images/refresh_17981405.png";
// import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech"

// const PainDiagram = () => {
//   const [croppedParts, setCroppedParts] = useState([]);
//   const [markers, setMarkers] = useState([]);
//   const [isfront, setIsfront] = useState(false);
//   const canvasRef = useRef(null);
//   const cropSize = 100;
//   const handleImageClick = (e) => {
//     const img = e.target;
//     const rect = img.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;
//     const scaleX = img.naturalWidth / img.width;
//     const scaleY = img.naturalHeight / img.height;
//     const realX = clickX * scaleX;
//     const realY = clickY * scaleY;
//     const imageObj = new Image();
//     imageObj.src = isfront ? DigramBack : DigramFront;
//     imageObj.onload = () => {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       let startX = realX - cropSize / 2;
//       let startY = realY - cropSize / 2;
//       if (startX < 0) startX = 0;
//       if (startY < 0) startY = 0;
//       if (startX + cropSize > imageObj.naturalWidth)
//         startX = imageObj.naturalWidth - cropSize;
//       if (startY + cropSize > imageObj.naturalHeight)
//         startY = imageObj.naturalHeight - cropSize;
//       canvas.width = cropSize;
//       canvas.height = cropSize;
//       ctx.drawImage(
//         imageObj,
//         startX,
//         startY,
//         cropSize,
//         cropSize,
//         0,
//         0,
//         cropSize,
//         cropSize
//       );
//       const croppedData = canvas.toDataURL("image/png");
//       setCroppedParts((prev) => [...prev, croppedData]);
//       setMarkers((prev) => [...prev, { x: clickX, y: clickY }]);
//     };
//   };

//   const handleRefresh = () => {
//     setIsfront(pre => !pre)
//     setCroppedParts([]);
//     setMarkers([]);
//   }

//   return (
//     <>      <div className="flex justify-end mt-4">
//       <button
//         onClick={() => { handleRefresh() }}
//         className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
//       >
//         <img src={Refresh} alt="refresh" className="w-6 h-6" />
//       </button>
//     </div>
//       <div className="flex flex-col items-center">

//         <div className="relative w-[350px] md:w-[500px]">
//           <img
//             usemap="#image-body"
//             src={isfront ? DigramBack : DigramFront}
//             alt="body diagram"
//             className="w-full h-auto"
//             onClick={handleImageClick}
//           />
//           {markers.map((m, idx) => (
//             <div
//               key={idx}
//               className="absolute w-4 h-4 rounded-full bg-red-500 border-2 border-white"
//               style={{
//                 left: m.x - 8,
//                 top: m.y - 8,
//               }}
//             />
//           ))}
//         </div>
//         <canvas ref={canvasRef} style={{ display: "none" }} />
//         <div className="grid grid-cols-3 gap-4 mt-6">
//           {croppedParts.map((part, idx) => (
//             <div key={idx} className="p-2 border rounded shadow">
//               <img src={part} alt={`Cropped ${idx}`} className="w-24 h-24 object-contain" />
//             </div>
//           ))}
//         </div>
//       </div>
//       <map name="workmap">
//         <area target="" alt="" title="Face" href="" coords="95,71,10,131" shape="rect" />
//         <area target="" alt="" title="Neck" href="" coords="113,71,88,130" shape="rect" />
//         <area target="" alt="" title="Left shoulder" href="" coords="181,22,111,52" shape="rect" />
//         <area target="" alt="" title="Left arm" href="" coords="345,7,115,51" shape="rect" />
//         <area target="" alt="" title="Chest" href="" coords="173,55,118,152" shape="rect" />
//         <area target="" alt="" title="Right shoulder" href="" coords="151,140,110,172" shape="rect" />
//         <area target="" alt="" title="Right arm" href="" coords="347,198,157,155" shape="rect" />
//         <area target="" alt="" title="Stomach" href="" coords="285,142,209,59" shape="rect" />
//         <area target="" alt="" title="left thigh" href="" coords="398,96,306,44" shape="rect" />
//         <area target="" alt="" title="Leg" href="" coords="565,95,437,52" shape="rect" />
//         <area target="" alt="" title="Left foot" href="" coords="607,94,566,59" shape="rect" />
//         <area target="" alt="" title="Right foot" href="" coords="608,149,567,106" shape="rect" />
//         <area target="" alt="" title="Leg" href="" coords="560,147,434,107" shape="rect" />
//         <area target="" alt="" title="Right thigh" href="" coords="396,157,289,110" shape="rect" />

//       </map>
//     </>
//   );
// };

// export default PainDiagram;

// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom"; // navigation
// import DigramBack from "../../assets/images/digram-back.png";
// import DigramFront from "../../assets/images/digram-front.svg";
// import Refresh from "../../assets/images/refresh_17981405.png";
// import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";

// const PainDiagram = () => {
//   const [croppedParts, setCroppedParts] = useState([]);
//   const [markers, setMarkers] = useState([]);
//   const [isfront, setIsfront] = useState(false);
//   const canvasRef = useRef(null);
//   const cropSize = 100;
//   const navigate = useNavigate();

//   // 🔹 helper function to crop given coords
//   const cropArea = (coords, imgSrc, partName) => {
//     const [x1, y1, x2, y2] = coords.map(Number);
//     const width = x2 - x1;
//     const height = y2 - y1;

//     const imageObj = new Image();
//     imageObj.src = imgSrc;

//     imageObj.onload = () => {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       canvas.width = width;
//       canvas.height = height;

//       ctx.drawImage(
//         imageObj,
//         x1,
//         y1,
//         width,
//         height,
//         0,
//         0,
//         width,
//         height
//       );

//       const croppedData = canvas.toDataURL("image/png");

//       // store in state
//       setCroppedParts((prev) => [...prev, croppedData]);
//       console.log("===>partName", partName)
//       // 🔹 navigate to next page with partName + image
//       // navigate("/nextpage", { state: { partName, croppedData } });

//       // 🔹 speak unless it's face
//       if (partName.toLowerCase() !== "face") {
//         getTextToSpeech(partName);
//       }
//     };
//   };

//   const handleAreaClick = (e, coords, partName) => {
//     console.log("====>partName", partName)
//     e.preventDefault();
//     const imgSrc = isfront ? DigramBack : DigramFront;
//     cropArea(coords, imgSrc, partName);
//   };

//   const handleRefresh = () => {
//     setIsfront((pre) => !pre);
//     setCroppedParts([]);
//     setMarkers([]);
//   };

//   return (
//     <>
//       <div className="flex justify-end mt-4">
//         <button
//           onClick={handleRefresh}
//           className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
//         >
//           <img src={Refresh} alt="refresh" className="w-6 h-6" />
//         </button>
//       </div>

//       <div className="flex flex-col items-center">
//         <div className="relative w-[500px] h-[169px]"> {/* fixed size */}
//           <img
//             src={isfront ? DigramBack : DigramFront}
//             alt="body diagram"
//             className="w-full h-full object-contain"
//             useMap="#body-map"
//           />
//         </div>

//         <canvas ref={canvasRef} style={{ display: "none" }} />

//         <div className="grid grid-cols-3 gap-4 mt-6">
//           {croppedParts.map((part, idx) => (
//             <div key={idx} className="p-2 border rounded shadow">
//               <img src={part} alt={`Cropped ${idx}`} className="w-24 h-24 object-contain" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 🔹 clickable body areas */}
//       <map name="body-map">
//         <area
//           alt="Face"
//           title="Face"
//           shape="rect"
//           coords="10,71,95,131"
//           href="#"
//           onClick={(e) => handleAreaClick(e, [10, 71, 95, 131], "Face")}
//         />
//         <area
//           alt="Neck"
//           title="Neck"
//           shape="rect"
//           coords="113,71,88,130"
//           href="#"
//           onClick={(e) => handleAreaClick(e, [113,81,88,130], "Neck")}
//         />
//         <area
//           alt="Left shoulder"
//           title="Left shoulder"
//           shape="rect"
//           coords="181,22,111,52"
//           href="#"
//           onClick={(e) =>
//             handleAreaClick(e, [181,22,111,52], "Left shoulder")
//           }
//         />

//         {/* <area target="" alt="" title="Face" href="" coords="95,71,10,131" shape="rect" />
//         <area target="" alt="" title="Neck" href="" coords="113,71,88,130" shape="rect" />
//         <area target="" alt="" title="Left shoulder" href="" coords="181,22,111,52" shape="rect" />
//         <area target="" alt="" title="Left arm" href="" coords="345,7,115,51" shape="rect" />
//         <area target="" alt="" title="Chest" href="" coords="173,55,118,152" shape="rect" />
//         <area target="" alt="" title="Right shoulder" href="" coords="151,140,110,172" shape="rect" />
//         <area target="" alt="" title="Right arm" href="" coords="347,198,157,155" shape="rect" />
//         <area target="" alt="" title="Stomach" href="" coords="285,142,209,59" shape="rect" />
//         <area target="" alt="" title="left thigh" href="" coords="398,96,306,44" shape="rect" />
//         <area target="" alt="" title="Leg" href="" coords="565,95,437,52" shape="rect" />
//         <area target="" alt="" title="Left foot" href="" coords="607,94,566,59" shape="rect" />
//         <area target="" alt="" title="Right foot" href="" coords="608,149,567,106" shape="rect" />
//         <area target="" alt="" title="Leg" href="" coords="560,147,434,107" shape="rect" />
//         <area target="" alt="" title="Right thigh" href="" coords="396,157,289,110" shape="rect" /> */}

//       </map>
//     </>
//   );
// };

// export default PainDiagram;
// import React, { useRef, useState } from "react";
// import DigramFront from "../../assets/images/digram-front.svg";

// const CoordinatePicker = () => {
//   const imgRef = useRef(null);
//   const [coords, setCoords] = useState(null);
//   const [dragStart, setDragStart] = useState(null);

//   // Start dragging (first corner)
//   const handleMouseDown = (e) => {
//     const rect = imgRef.current.getBoundingClientRect();
//     const x = Math.round(e.clientX - rect.left);
//     const y = Math.round(e.clientY - rect.top);
//     setDragStart({ x, y });
//   };

//   // End dragging (second corner)
//   const handleMouseUp = (e) => {
//     if (!dragStart) return;
//     const rect = imgRef.current.getBoundingClientRect();
//     const x2 = Math.round(e.clientX - rect.left);
//     const y2 = Math.round(e.clientY - rect.top);

//     // coords = x1,y1,x2,y2
//     const x1 = Math.min(dragStart.x, x2);
//     const y1 = Math.min(dragStart.y, y2);
//     const w = Math.abs(x2 - dragStart.x);
//     const h = Math.abs(y2 - dragStart.y);

//     setCoords({ x1, y1, x2, y2, w, h });
//     setDragStart(null);

//     console.log(`coords="${x1},${y1},${x2},${y2}"`);
//   };

//   return (
//     <div className="flex flex-col items-center mt-10">
//       <div className="relative">
//         <img
//           ref={imgRef}
//           src={DigramFront}
//           alt="body diagram"
//           className="w-[500px] h-auto border"
//           onMouseDown={handleMouseDown}
//           onMouseUp={handleMouseUp}
//         />

//         {/* Draw selection box */}
//         {coords && (
//           <div
//             className="absolute border-2 border-red-500 bg-red-200 bg-opacity-30"
//             style={{
//               left: coords.x1,
//               top: coords.y1,
//               width: coords.w,
//               height: coords.h,
//             }}
//           />
//         )}
//       </div>

//       {/* Show coords */}
//       {coords && (
//         <div className="mt-4 p-3 bg-gray-100 rounded shadow">
//           <p>
//             <b>coords:</b> {coords.x1},{coords.y1},{coords.x2},{coords.y2}
//           </p>
//           <p>
//             <b>width/height:</b> {coords.w} × {coords.h}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoordinatePicker;
// import React, { useState, useRef } from "react";
// import DigramBack from "../../assets/images/digram-back.png";
// import DigramFront from "../../assets/images/digram-front.svg";
// import Refresh from "../../assets/images/refresh_17981405.png";
// import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";

// function makeRegion(name, x1, y1, x2, y2) {
//   return {
//     name,
//     x1: Math.min(x1, x2),
//     y1: Math.min(y1, y2),
//     x2: Math.max(x1, x2),
//     y2: Math.max(y1, y2),
//   };
// }

// const regions = [
//   makeRegion("Forehead", 14, 72, 32, 92),
//   makeRegion("Left Eye", 35, 65, 50, 75),
//   makeRegion("Right Eye", 35, 88, 55, 98),
//   makeRegion("Nose", 45, 76, 55, 86),
//   makeRegion("Mouth", 57, 78, 70, 90),
//   makeRegion("Neck", 72, 75, 95, 95),
//   makeRegion("Left Shoulder", 100, 20, 125, 45),
//   makeRegion("Right Shoulder", 95, 115, 120, 140),
//   makeRegion("Right Arm", 120, 140, 280, 160),
//   makeRegion("Left Arm", 120, 0, 280, 25),
//   makeRegion("Chest", 120, 40, 140, 120),
//   makeRegion("Stomach", 170, 75, 235, 90),
//   makeRegion("Pelvis / Genitals", 230, 75, 270, 90),
//   makeRegion("Right Hip", 220, 85, 260, 120),
//   makeRegion("Left Hip", 240, 30, 275, 80),
//   makeRegion("Right Thigh", 260, 100, 330, 120),
//   makeRegion("Left Thigh", 260, 50, 330, 70),
//   makeRegion("Left Lower Leg", 330, 60, 460, 80),
//   makeRegion("Right Lower Leg", 330, 100, 460, 120),
//   makeRegion("Right Foot / Toe", 460, 95, 495, 110),
//   makeRegion("Left Foot / Toe", 460, 50, 495, 70),
// ];

// const PADDING = 12;

// const PainDiagram = () => {
//   const [croppedParts, setCroppedParts] = useState([]);
//   const [markers, setMarkers] = useState([]);
//   const [isfront, setIsfront] = useState(false);
//   const canvasRef = useRef(null);
//   const cropSize = 100;

//   const handleImageClick = (e) => {
//     const img = e.target;
//     const rect = img.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     const scaleX = img.naturalWidth / img.width;
//     const scaleY = img.naturalHeight / img.height;
//     const realX = clickX * scaleX;
//     const realY = clickY * scaleY;

//     // ✅ First try to find inside a region with padding
//     let clickedRegion = regions.find(
//       (r) =>
//         realX >= r.x1 - PADDING &&
//         realX <= r.x2 + PADDING &&
//         realY >= r.y1 - PADDING &&
//         realY <= r.y2 + PADDING
//     );

//     // ✅ If not found, find nearest region by distance
//     if (!clickedRegion) {
//       let minDist = Infinity;
//       regions.forEach((r) => {
//         const centerX = (r.x1 + r.x2) / 2;
//         const centerY = (r.y1 + r.y2) / 2;
//         const dist = Math.sqrt((realX - centerX) ** 2 + (realY - centerY) ** 2);
//         if (dist < minDist) {
//           minDist = dist;
//           clickedRegion = r;
//         }
//       });
//     }

//     // ✅ Always speak correct region name
//     getTextToSpeech(clickedRegion.name);

//     // ✅ Crop Image
//     const imageObj = new Image();
//     imageObj.src = isfront ? DigramBack : DigramFront;
//     imageObj.onload = () => {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       let startX = realX - cropSize / 2;
//       let startY = realY - cropSize / 2;

//       if (startX < 0) startX = 0;
//       if (startY < 0) startY = 0;
//       if (startX + cropSize > imageObj.naturalWidth)
//         startX = imageObj.naturalWidth - cropSize;
//       if (startY + cropSize > imageObj.naturalHeight)
//         startY = imageObj.naturalHeight - cropSize;

//       canvas.width = cropSize;
//       canvas.height = cropSize;
//       ctx.drawImage(
//         imageObj,
//         startX,
//         startY,
//         cropSize,
//         cropSize,
//         0,
//         0,
//         cropSize,
//         cropSize
//       );

//       const croppedData = canvas.toDataURL("image/png");
//       setCroppedParts((prev) => [...prev, croppedData]);
//       setMarkers((prev) => [...prev, { x: clickX, y: clickY }]);
//     };
//   };

//   const handleRefresh = () => {
//     setIsfront((pre) => !pre);
//     setCroppedParts([]);
//     setMarkers([]);
//   };

//   return (
//     <>
//       <div className="flex justify-end mt-4">
//         <button
//           onClick={handleRefresh}
//           className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
//         >
//           <img src={Refresh} alt="refresh" className="w-6 h-6" />
//         </button>
//       </div>

//       <div className="flex flex-col items-center">
//         <div className="relative w-[350px] md:w-[500px]">
//           <img
//             src={isfront ? DigramBack : DigramFront}
//             alt="body diagram"
//             className="w-full h-auto"
//             onClick={handleImageClick}
//           />
//           {markers.map((m, idx) => (
//             <div
//               key={idx}
//               className="absolute w-10 h-10 rounded-full bg-[#FF00004D] border-2 border-red-500 pointer-events-none"
//               style={{ left: m.x - 8, top: m.y - 8 }}
//             />
//           ))}
//         </div>

//         <canvas ref={canvasRef} style={{ display: "none" }} />

//         <div className="grid grid-cols-3 gap-4 mt-6">
//           {croppedParts.map((part, idx) => (
//             <div key={idx} className="p-2 border rounded shadow">
//               <img
//                 src={part}
//                 alt={`Cropped ${idx}`}
//                 className="w-24 h-24 object-contain"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PainDiagram;

// new
// import React, { useState, useRef, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import DigramBack from "../../assets/images/digram-back.png";
// import DigramFront from "../../assets/images/digram-front.svg";
// import Refresh from "../../assets/images/refresh_17981405.png";
// import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";

// import { GlobalContext } from "../../context/DiseaseContext";
// import { concerns } from "../DiseasesData/concernData";
// function makeRegion(name, x1, y1, x2, y2) {
//   return {
//     name,
//     x1: Math.min(x1, x2),
//     y1: Math.min(y1, y2),
//     x2: Math.max(x1, x2),
//     y2: Math.max(y1, y2),
//   };
// }

// const regions = [
//   makeRegion("Forehead", 14, 72, 32, 92),
//   makeRegion("Left Eye", 35, 65, 50, 75),
//   makeRegion("Right Eye", 35, 88, 55, 98),
//   makeRegion("Nose", 45, 76, 55, 86),
//   makeRegion("Mouth", 57, 78, 70, 90),
//   makeRegion("Neck", 72, 75, 95, 95),
//   makeRegion("Left Shoulder", 100, 20, 125, 45),
//   makeRegion("Right Shoulder", 95, 115, 120, 140),
//   makeRegion("Right Arm", 120, 140, 280, 160),
//   makeRegion("Left Arm", 120, 0, 280, 25),
//   makeRegion("Chest", 120, 40, 140, 120),
//   makeRegion("Stomach", 170, 75, 235, 90),
//   makeRegion("Pelvis / Genitals", 230, 75, 270, 90),
//   makeRegion("Right Hip", 220, 85, 260, 120),
//   makeRegion("Left Hip", 240, 30, 275, 80),
//   makeRegion("Right Thigh", 260, 100, 330, 120),
//   makeRegion("Left Thigh", 260, 50, 330, 70),
//   makeRegion("Left Lower Leg", 330, 60, 460, 80),
//   makeRegion("Right Lower Leg", 330, 100, 460, 120),
//   makeRegion("Right Foot / Toe", 460, 95, 495, 110),
//   makeRegion("Left Foot / Toe", 460, 50, 495, 70),
// ];

// const PADDING = 12;

// const PainDiagram = () => {
//   const [marker, setMarker] = useState(null);
//   const [croppedPart, setCroppedPart] = useState(null);
//   const [isfront, setIsfront] = useState(false);
//   const canvasRef = useRef(null);
//   const cropSize = 100;
//   const navigate = useNavigate();
//   const location = useLocation();
//   const path = location.pathname;
//   const { updateDisease } = useContext(GlobalContext);
//   const handleImageClick = (e) => {
//     const img = e.target;
//     const rect = img.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     const scaleX = img.naturalWidth / img.width;
//     const scaleY = img.naturalHeight / img.height;
//     const realX = clickX * scaleX;
//     const realY = clickY * scaleY;
//     let clickedRegion = regions.find(
//       (r) =>
//         realX >= r.x1 - PADDING &&
//         realX <= r.x2 + PADDING &&
//         realY >= r.y1 - PADDING &&
//         realY <= r.y2 + PADDING
//     );

//     if (!clickedRegion) {
//       let minDist = Infinity;
//       regions.forEach((r) => {
//         const centerX = (r.x1 + r.x2) / 2;
//         const centerY = (r.y1 + r.y2) / 2;
//         const dist = Math.sqrt((realX - centerX) ** 2 + (realY - centerY) ** 2);
//         if (dist < minDist) {
//           minDist = dist;
//           clickedRegion = r;
//         }
//       });
//     }

//     getTextToSpeech(clickedRegion.name);

//     // ✅ Crop Image
//     const imageObj = new Image();
//     imageObj.src = isfront ? DigramBack : DigramFront;
//     imageObj.onload = () => {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       let startX = realX - cropSize / 2;
//       let startY = realY - cropSize / 2;

//       if (startX < 0) startX = 0;
//       if (startY < 0) startY = 0;
//       if (startX + cropSize > imageObj.naturalWidth)
//         startX = imageObj.naturalWidth - cropSize;
//       if (startY + cropSize > imageObj.naturalHeight)
//         startY = imageObj.naturalHeight - cropSize;

//       canvas.width = cropSize;
//       canvas.height = cropSize;
//       ctx.drawImage(
//         imageObj,
//         startX,
//         startY,
//         cropSize,
//         cropSize,
//         0,
//         0,
//         cropSize,
//         cropSize
//       );

//       const croppedData = canvas.toDataURL("image/png");
//       setMarker({ x: clickX, y: clickY });
//       setCroppedPart(croppedData);
//       updateDisease("summaryList", [{ "image": croppedData, name: clickedRegion.name }]);
//       navigate("/concern-pain", {
//         state: { partName: clickedRegion.name, image: croppedData },
//       });
//     };
//   };

//   const handleRefresh = () => {
//     setIsfront((pre) => !pre);
//     setCroppedPart(null);
//     setMarker(null);
//   };

//   return (
//     <>
//       <div className="flex justify-end mt-4">
//         <button
//           onClick={handleRefresh}
//           className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
//         >
//           <img src={Refresh} alt="refresh" className="w-6 h-6" />
//         </button>
//       </div>

//       <div className="flex flex-col items-center">
//         <div className="relative w-[350px] md:w-[500px]">
//           <img
//             src={isfront ? DigramBack : DigramFront}
//             alt="body diagram"
//             className="w-full h-auto"
//             onClick={handleImageClick}
//           />
//           {marker && (
//             <div
//               className="absolute w-10 h-10 rounded-full bg-[#FF00004D] border-2 border-red-500 pointer-events-none"
//               style={{ left: marker.x - 8, top: marker.y - 8 }}
//             />
//           )}
//         </div>

//         <canvas ref={canvasRef} style={{ display: "none" }} />

//         {croppedPart && (
//           <div className="p-2 border rounded shadow mt-6">
//             <img
//               src={croppedPart}
//               alt="Selected Part"
//               className="w-24 h-24 object-contain"
//             />
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default PainDiagram;

// import React, { useRef, useState } from "react";
// import DigramFront from "../../assets/images/digram-front.svg";
// // import DigramFront from "../../assets/images/digram-back.png";
// const CoordinatePicker = () => {
//   const imgRef = useRef(null);
//   const [coords, setCoords] = useState(null);
//   const [dragStart, setDragStart] = useState(null);

//   // Start dragging (first corner)
//   const handleMouseDown = (e) => {
//     const rect = imgRef.current.getBoundingClientRect();
//     const x = Math.round(e.clientX - rect.left);
//     const y = Math.round(e.clientY - rect.top);
//     setDragStart({ x, y });
//   };

//   // End dragging (second corner)
//   const handleMouseUp = (e) => {
//     if (!dragStart) return;
//     const rect = imgRef.current.getBoundingClientRect();
//     const x2 = Math.round(e.clientX - rect.left);
//     const y2 = Math.round(e.clientY - rect.top);

//     // coords = x1,y1,x2,y2
//     const x1 = Math.min(dragStart.x, x2);
//     const y1 = Math.min(dragStart.y, y2);
//     const w = Math.abs(x2 - dragStart.x);
//     const h = Math.abs(y2 - dragStart.y);

//     setCoords({ x1, y1, x2, y2, w, h });
//     setDragStart(null);

//     console.log(`coords="${x1},${y1},${x2},${y2}"`);
//   };

//   return (
//     <div className="flex flex-col items-center mt-10">
//       <div className="relative">
//         <img
//           ref={imgRef}
//           src={DigramFront}
//           alt="body diagram"
//           className="w-[500px] h-auto border"
//           onMouseDown={handleMouseDown}
//           onMouseUp={handleMouseUp}
//         />

//         {/* Draw selection box */}
//         {coords && (
//           <div
//             className="absolute border-2 border-red-500 bg-red-200 bg-opacity-30"
//             style={{
//               left: coords.x1,
//               top: coords.y1,
//               width: coords.w,
//               height: coords.h,
//             }}
//           />
//         )}
//       </div>

//       {/* Show coords */}
//       {coords && (
//         <div className="mt-4 p-3 bg-gray-100 rounded shadow">
//           <p>
//             <b>coords:</b> {coords.x1},{coords.y1},{coords.x2},{coords.y2}
//           </p>
//           <p>
//             <b>width/height:</b> {coords.w} × {coords.h}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoordinatePicker;

// very new

// import React, { useState, useRef, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import DigramBack from "../../assets/images/digram-back.png";
// import DigramFront from "../../assets/images/digram-front.svg";
// import Refresh from "../../assets/images/refresh_17981405.png";
// import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
// import { GlobalContext } from "../../context/DiseaseContext";

// function makeRegion(name, x1, y1, x2, y2) {
//   return {
//     name,
//     x1: Math.min(x1, x2),
//     y1: Math.min(y1, y2),
//     x2: Math.max(x1, x2),
//     y2: Math.max(y1, y2),
//   };
// }

// const backRegions = [
//   makeRegion("Back Center", 91, 45, 208, 126),
//   makeRegion("Elbow", 177, 12, 193, 37),
//   makeRegion("Butt", 209, 41, 261, 133),
//   makeRegion("Left Lower Leg", 337, 50, 458, 76),
//   makeRegion("Right Lower Leg", 345, 92, 461, 121),
// ];

// const frontRegions = [
//   makeRegion("Forhead", 20, 80, 40, 128),
//   makeRegion("left Eye", 45, 80, 60, 100),
//   makeRegion("Right Eye", 45, 105, 60, 122),
//   makeRegion("Nose", 50, 95, 70, 105),
//   makeRegion("Mouth", 70, 112, 80, 90),
//   makeRegion("left Ear", 50, 70, 70, 80),
//   makeRegion("Right Ear", 50, 125, 70, 135),
//   makeRegion("Neck", 90, 80, 110, 120),
//   makeRegion("Chest & Breast", 120, 50, 185, 150),
//   makeRegion("Abdomen", 220, 145, 265, 60),
//   makeRegion("Pelvis / Genitals", 290, 88, 330, 110),
//   makeRegion("Left Hip", 280, 45, 320, 70),
//   makeRegion("Right Hip", 280, 160, 320, 135),
//   makeRegion("Right Thigh", 320, 115, 385, 160),
//   makeRegion("Left Thigh", 320, 45, 385, 90),
//   makeRegion("Left Knee", 400, 90, 440, 55),
//   makeRegion("Right Knee", 400, 110, 440, 145),
//   makeRegion("Left Lower Leg", 450, 58, 560, 90),
//   makeRegion("Right Lower Leg", 450, 107, 560, 140),
//   makeRegion("left Lower Leg", 570, 110, 610, 134),
//   makeRegion("Left Foot / Toe", 570, 65, 610, 90),
//   makeRegion("Right Shoulder", 180, 160, 117, 175),
//   makeRegion("Right Arm ", 126, 170, 290, 190),
//   makeRegion("Right Hand", 298, 178, 321, 200),
//   makeRegion("Right Finger", 330, 178, 340, 200),
//   makeRegion("Left Shoulder", 97, 19, 131, 41),
//   makeRegion("Left Arm", 137, 9, 300, 32),
//   makeRegion("Left Hand", 300, 8, 330, 20),
//   makeRegion("Left Finger", 330, 12, 340, 30),
// ];
// const PADDING = 0;

// const PainDiagram = () => {
//   const [marker, setMarker] = useState(null);
//   const [croppedPart, setCroppedPart] = useState(null);
//   // NOTE: true = BACK image (as you requested), false = FRONT image
//   const [isfront, setIsfront] = useState(false);
//   const canvasRef = useRef(null);
//   const cropSize = 100;
//   const navigate = useNavigate();
//   const { updateDisease } = useContext(GlobalContext);

//   const handleImageClick = (e) => {
//     const img = e.target;
//     const rect = img.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     const scaleX = img.naturalWidth / img.width;
//     const scaleY = img.naturalHeight / img.height;
//     const realX = clickX * scaleX;
//     const realY = clickY * scaleY;

//     // Choose side-specific regions
//     const activeRegions = isfront ? backRegions : frontRegions;

//     // Try inside-with-padding first
//     let clickedRegion =
//       activeRegions.find(
//         (r) =>
//           realX >= r.x1 - PADDING &&
//           realX <= r.x2 + PADDING &&
//           realY >= r.y1 - PADDING &&
//           realY <= r.y2 + PADDING
//       ) || null;

//     // If not found, pick nearest region center (no "Body" fallback)
//     if (!clickedRegion) {
//       let minDist = Infinity;
//       activeRegions.forEach((r) => {
//         const cx = (r.x1 + r.x2) / 2;
//         const cy = (r.y1 + r.y2) / 2;
//         const d = Math.hypot(realX - cx, realY - cy);
//         if (d < minDist) {
//           minDist = d;
//           clickedRegion = r;
//         }
//       });
//     }

//     // Speak the selected name
//     getTextToSpeech(clickedRegion.name);

//     // Crop around the click point
//     const imageObj = new Image();
//     imageObj.src = isfront ? DigramBack : DigramFront; // true = back, false = front
//     imageObj.onload = () => {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       let startX = realX - cropSize / 2;
//       let startY = realY - cropSize / 2;

//       if (startX < 0) startX = 0;
//       if (startY < 0) startY = 0;
//       if (startX + cropSize > imageObj.naturalWidth)
//         startX = imageObj.naturalWidth - cropSize;
//       if (startY + cropSize > imageObj.naturalHeight)
//         startY = imageObj.naturalHeight - cropSize;

//       canvas.width = cropSize;
//       canvas.height = cropSize;
//       ctx.drawImage(
//         imageObj,
//         startX,
//         startY,
//         cropSize,
//         cropSize,
//         0,
//         0,
//         cropSize,
//         cropSize
//       );

//       const croppedData = canvas.toDataURL("image/png");
//       setMarker({ x: clickX, y: clickY });
//       setCroppedPart(croppedData);

//       // push to global + navigate
//       updateDisease("summaryList", [
//         { image: croppedData, name: clickedRegion.name },
//       ]);
//       navigate("/concern-pain", {
//         state: { partName: clickedRegion.name, image: croppedData },
//       });
//     };
//   };

//   const handleRefresh = () => {
//     setIsfront((prev) => !prev); // toggle image (true = back, false = front)
//     setCroppedPart(null);
//     setMarker(null);
//   };

//   return (
//     <>
//       <div className="flex justify-end mt-4">
//         <button
//           onClick={handleRefresh}
//           className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
//         >
//           <img src={Refresh} alt="refresh" className="w-6 h-6" />
//         </button>
//       </div>

//       <div className="flex flex-col items-center">
//         <div className="relative w-[350px] md:w-[500px]">
//           <img
//             src={isfront ? DigramBack : DigramFront} // true = back, false = front
//             alt="body diagram"
//             className="w-full h-auto"
//             onClick={handleImageClick}
//           />
//           {marker && (
//             <div
//               className="absolute w-10 h-10 rounded-full bg-[#FF00004D] border-2 border-red-500 pointer-events-none"
//               style={{ left: marker.x - 8, top: marker.y - 8 }}
//             />
//           )}
//         </div>

//         <canvas ref={canvasRef} style={{ display: "none" }} />

//         {croppedPart && (
//           <div className="p-2 border rounded shadow mt-6">
//             <img
//               src={croppedPart}
//               alt="Selected Part"
//               className="w-24 h-24 object-contain"
//             />
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default PainDiagram;

import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DigramBack from "../../assets/images/digram-back.png";
import DigramFront from "../../assets/images/digram-front.svg";
import Refresh from "../../assets/images/refresh_17981405.png";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import { GlobalContext } from "../../context/DiseaseContext";

// Create region from 4 points
function makeRegion(name, x1, y1, x2, y2) {
  return {
    name,
    x1: Math.min(x1, x2),
    y1: Math.min(y1, y2),
    x2: Math.max(x1, x2),
    y2: Math.max(y1, y2),
  };
}

// Clearer naming

// Your original regions remain unchanged
const backRegions = [
  // makeRegion("Back Center", 110, 63, 260, 160),
  // makeRegion("Elbow", 220, 12, 250, 50),
  //  makeRegion("Butt", 260, 60, 340, 160),Left Lower Leg
  makeRegion("Left Lower Leg", 458, 60, 580, 100),
  makeRegion("Right Lower Leg", 458, 120, 580, 150),
];

// const frontRegions = [
//   makeRegion("Forhead", 20, 80, 40, 128),
//   makeRegion("left Eye", 45, 80, 60, 100),
//   makeRegion("Right Eye", 45, 105, 60, 122),
//   makeRegion("Nose", 50, 95, 70, 105),
//   makeRegion("Mouth", 70, 112, 80, 90),
//   makeRegion("left Ear", 50, 70, 70, 80),
//   makeRegion("Right Ear", 50, 125, 70, 135),
//   makeRegion("Neck", 90, 80, 110, 120),
//   makeRegion("Chest & Breast", 120, 50, 185, 150),
//   makeRegion("Abdomen", 220, 145, 265, 60),
//   makeRegion("Pelvis / Genitals", 290, 88, 330, 110),
//   makeRegion("Left Hip", 280, 45, 320, 70),
//   makeRegion("Right Hip", 280, 160, 320, 135),
//   makeRegion("Right Thigh", 320, 115, 385, 160),
//   makeRegion("Left Thigh", 320, 45, 385, 90),
//   makeRegion("Left Knee", 400, 90, 440, 55),
//   makeRegion("Right Knee", 400, 110, 440, 145),
//   makeRegion("Left Lower Leg", 450, 58, 560, 90),
//   makeRegion("Right Lower Leg", 450, 107, 560, 140),
//   makeRegion("left Lower Leg", 570, 110, 610, 134),
//   makeRegion("Left Foot / Toe", 570, 65, 610, 90),
//   makeRegion("Right Shoulder", 180, 160, 117, 175),
//   makeRegion("Right Arm ", 126, 170, 290, 190),
//   makeRegion("Right Hand", 298, 178, 321, 200),
//   makeRegion("Right Finger", 330, 178, 340, 200),
//   makeRegion("Left Shoulder", 97, 19, 131, 41),
//   makeRegion("Left Arm", 137, 9, 300, 32),
//   makeRegion("Left Hand", 300, 8, 330, 20),
//   makeRegion("Left Finger", 330, 12, 340, 30),
// ];

const PADDING = 0;

const PainDiagram = () => {
  const [marker, setMarker] = useState(null);
  const [croppedPart, setCroppedPart] = useState(null);
  const [isfront, setIsfront] = useState(true); // true = back
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const cropSize = 100;
  const navigate = useNavigate();
  const { updateDisease } = useContext(GlobalContext);

  const handleImageClick = (e) => {
    const img = imageRef.current;
    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const realX = clickX * scaleX;
    const realY = clickY * scaleY;

    console.log(
      `Clicked at (real): X=${realX.toFixed(2)}, Y=${realY.toFixed(2)}`
    );

    const activeRegions = isfront ? backRegions : frontRegions;

    let clickedRegion =
      activeRegions.find(
        (r) =>
          realX >= r.x1 - PADDING &&
          realX <= r.x2 + PADDING &&
          realY >= r.y1 - PADDING &&
          realY <= r.y2 + PADDING
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

    getTextToSpeech(clickedRegion.name);

    const imageObj = new Image();
    imageObj.src = isfront ? DigramBack : DigramFront;
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

      updateDisease("summaryList", [
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

  const imageWidth = 350;

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
          <img
            ref={imageRef}
            src={isfront ? DigramBack : DigramFront}
            alt="body diagram"
            className="w-full h-auto"
            onClick={handleImageClick}
          />

          {/* Marker for click */}
          {marker && (
            <div
              className="absolute w-10 h-10 rounded-full bg-[#FF00004D] border-2 border-red-500 pointer-events-none"
              style={{ left: marker.x - 8, top: marker.y - 8 }}
            />
          )}

          {/* Region Boxes (Debug Overlay) */}
          {/* Region labels and boxes */}
          {(isfront ? backRegions : frontRegions).map((region, i) => {
            const img = imageRef.current;
            if (!img) return null;

            const scale = img.clientWidth / img.naturalWidth;

            const left = region.x1 * scale;
            const top = region.y1 * scale;
            const width = (region.x2 - region.x1) * scale;
            const height = (region.y2 - region.y1) * scale;

            // Compute center of region to place label
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            return (
              <React.Fragment key={i}>
                {/* Optional: Thin border around region */}
                <div
                  className="absolute border border-blue-400 opacity-20 rounded"
                  style={{
                    left,
                    top,
                    width,
                    height,
                    pointerEvents: "none",
                  }}
                />

                {/* Label in center */}
                <div
                  className="absolute bg-white text-xs text-blue-800 font-semibold px-2 py-[2px] rounded-full shadow"
                  style={{
                    top: centerY - 10,
                    left: centerX - region.name.length * 2.5,
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                    opacity: 0.9,
                  }}
                >
                  {region.name}
                </div>
              </React.Fragment>
            );
          })}
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
