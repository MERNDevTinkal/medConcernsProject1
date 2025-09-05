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
import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DigramBack from "../../assets/images/digram-back.png";
import DigramFront from "../../assets/images/digram-front.svg";
import Refresh from "../../assets/images/refresh_17981405.png";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import { GlobalContext } from "../../context/DiseaseContext";

function makeRegion(name, x1, y1, x2, y2) {
  return {
    name,
    x1: Math.min(x1, x2),
    y1: Math.min(y1, y2),
    x2: Math.max(x1, x2),
    y2: Math.max(y1, y2),
  };
}

// Helper to build a region from your pairs:
// y-pair -> (xLeft, y) & (xRight, y)
// x-pair -> (x, yTop) & (x, yBottom)
function makeRegionFromPairs(name, yAx, yAy, yBx, yBy, xAx, xAy, xBx, xBy) {
  const x1 = Math.min(yAx, yBx);
  const x2 = Math.max(yAx, yBx);
  const y1 = Math.min(xAy, xBy);
  const y2 = Math.max(xAy, xBy);
  return makeRegion(name, x1, y1, x2, y2);
}

/* ===========================
   BACK VIEW (isfront === true)
   =========================== */
const backRegions = [
  // “y parallel” + “x horizontal”
  makeRegionFromPairs("Back Center", 91, 83, 208, 84, 162, 126, 168, 45),

  // Elbow (back)
  makeRegionFromPairs("Elbow", 177, 23, 193, 24, 186, 37, 183, 12),

  // Butt
  makeRegionFromPairs("Butt", 209, 82, 261, 85, 244, 133, 241, 41),

  // Lower legs (back)
  makeRegionFromPairs("Left Lower Leg", 337, 64, 458, 69, 405, 76, 408, 50),
  makeRegionFromPairs("Right Lower Leg", 345, 111, 461, 103, 385, 121, 397, 92),
];

/* ============================
   FRONT VIEW (isfront === false)
   ============================ */
const frontRegions = [
  makeRegionFromPairs("Forehead", 13, 82, 32, 81, 27, 101, 29, 64),

  makeRegionFromPairs("Left Eye", 34, 71, 47, 72, 43, 77, 40, 62),
  makeRegionFromPairs("Right Eye", 34, 94, 47, 94, 38, 99, 42, 84),

  makeRegionFromPairs("Nose", 41, 81, 55, 81, 51, 83, 51, 76),
  makeRegionFromPairs("Mouth", 58, 81, 63, 82, 61, 89, 60, 75),

  makeRegionFromPairs("Left Ear", 41, 60, 55, 63, 46, 62, 49, 57),
  makeRegionFromPairs("Right Ear", 41, 105, 57, 101, 47, 100, 47, 105),

  makeRegionFromPairs("Neck", 74, 81, 91, 81, 76, 95, 77, 65),

  makeRegionFromPairs("Chest & Breast", 95, 79, 165, 81, 133, 120, 126, 42),
  makeRegionFromPairs("Abdomen", 169, 81, 221, 81, 196, 116, 196, 46),
  makeRegionFromPairs("Pelvis / Genitals", 241, 81, 268, 80, 250, 92, 253, 71),

  makeRegionFromPairs("Left Hip", 213, 49, 267, 37, 262, 64, 260, 35),
  makeRegionFromPairs("Right Hip", 217, 109, 270, 109, 241, 129, 246, 105),

  makeRegionFromPairs("Right Thigh", 260, 105, 314, 101, 287, 128, 289, 89),
  makeRegionFromPairs("Left Thigh", 271, 53, 313, 57, 287, 76, 284, 36),

  makeRegionFromPairs("Left Knee", 325, 63, 356, 65, 337, 74, 338, 45),
  makeRegionFromPairs("Right Knee", 321, 107, 361, 104, 346, 117, 353, 91),
  makeRegionFromPairs("Left Knee (Alt)", 331, 57, 364, 60, 349, 71, 349, 46),

  makeRegionFromPairs("Left Lower Leg", 359, 61, 457, 67, 401, 72, 403, 45),
  makeRegionFromPairs("Right Lower Leg", 361, 105, 456, 102, 397, 116, 401, 89),

  makeRegionFromPairs("Right Foot / Toe", 460, 100, 490, 107, 477, 111, 476, 89),
  makeRegionFromPairs("Left Foot / Toe", 457, 65, 489, 58, 469, 74, 477, 53),

  makeRegionFromPairs("Right Shoulder", 90, 125, 117, 132, 94, 134, 100, 119),
  makeRegionFromPairs("Right Arm (Upper)", 126, 128, 232, 151, 165, 153, 177, 130),
  makeRegionFromPairs("Right Arm (Lower)", 240, 152, 261, 154, 253, 158, 257, 143),
  makeRegionFromPairs("Right Fingers", 265, 153, 277, 151, 264, 160, 263, 148),

  makeRegionFromPairs("Left Shoulder", 97, 32, 128, 30, 131, 41, 125, 19),
  makeRegionFromPairs("Left Arm", 137, 32, 234, 15, 169, 32, 169, 9),
  makeRegionFromPairs("Left Hand", 240, 16, 263, 8, 253, 19, 257, 4),
  makeRegionFromPairs("Left Fingers", 264, 8, 277, 10, 270, 14, 265, 4),
];

const PADDING = 0;

const PainDiagram = () => {
  const [marker, setMarker] = useState(null);
  const [croppedPart, setCroppedPart] = useState(null);
  // NOTE: true = BACK image (as you requested), false = FRONT image
  const [isfront, setIsfront] = useState(false);
  const canvasRef = useRef(null);
  const cropSize = 100;
  const navigate = useNavigate();
  const { updateDisease } = useContext(GlobalContext);

  const handleImageClick = (e) => {
    const img = e.target;
    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const realX = clickX * scaleX;
    const realY = clickY * scaleY;

    // Choose side-specific regions
    const activeRegions = isfront ? backRegions : frontRegions;

    // Try inside-with-padding first
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

      // push to global + navigate
      updateDisease("summaryList", [{ image: croppedData, name: clickedRegion.name }]);
      navigate("/concern-pain", {
        state: { partName: clickedRegion.name, image: croppedData },
      });
    };
  };

  const handleRefresh = () => {
    setIsfront((prev) => !prev); // toggle image (true = back, false = front)
    setCroppedPart(null);
    setMarker(null);
  };

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
            src={isfront ? DigramBack : DigramFront} // true = back, false = front
            alt="body diagram"
            className="w-full h-auto"
            onClick={handleImageClick}
          />
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
