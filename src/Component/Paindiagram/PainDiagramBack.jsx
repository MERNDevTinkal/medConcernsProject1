// import React, { useState } from "react";
// import DigramBack from "../../assets/images/digram-back.png";
// import DigramFront from "../../assets/images/digram-front.svg";
// import Refresh from "../../assets/images/refresh_17981405.png";

// const PainDiagramBack = () => {
//   const [painPoints, setPainPoints] = useState([]);
//   const [isfront, setIsFront] = useState(true);
//   const [xy, setXy] = useState({ xseries: "", yseries: "" })
//   const handlePainClick = (x, y) => {
//     setXy({ xseries: x, yseries: y })
//     setPainPoints([{ x, y }]);
//   };
//   const handleRefresh = () => {
//     setIsFront(pre => !pre)
//   };

//   const handleClick = (val) => {
//     console.log("===>val", val)
//   }

//   return (
//     <div>
//       <div className="flex justify-end mt-4">
//         <button
//           onClick={() => { handleRefresh() }}
//           className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
//         >
//           <img src={Refresh} alt="refresh" className="w-6 h-6" />
//         </button>
//       </div>
//       <div className="flex flex-col items-center mt-10">
//         <div className="relative w-[350px] md:w-[500px]">
//           <img
//             src={isfront ? DigramFront : DigramBack}
//             useMap="#image-map"
//             alt="diagram back"
//             className="w-full h-auto"
//             onClick={(e) => {
//               const rect = e.target.getBoundingClientRect();
//               const x = e.clientX - rect.left;
//               const y = e.clientY - rect.top;
//               handlePainClick(x, y);
//             }}
//           />
//           {painPoints.map((point, idx) => (
//             <div
//               key={idx}
//               className="absolute w-10 h-10 rounded-full bg-[#FF00004D] border-2 border-red-500 pointer-events-none"
//               style={{
//                 left: point.x - 32,
//                 top: point.y - 32,
//               }}
//             />
//           ))}
//         </div>
//       </div>
//       <map name="image-map">
//         <area
//           alt="head"
//           title="head"
//           shape="circle"
//           coords={`11,74,38,128`}
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             handleClick("Head");
//           }}
//         />
//         <area
//           alt="left eye"
//           title="left eye"
//           shape="circle"
//           coords={`48,81,58,98`}
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             handleClick("left eye");
//           }}
//         />

//       </map>
//     </div>
//   );
// };

// export default PainDiagramBack;


import React, { useState } from "react";
import DigramBack from "../../assets/images/digram-back.png";
import DigramFront from "../../assets/images/digram-front.svg";
import Refresh from "../../assets/images/refresh_17981405.png";

const PainDiagramBack = () => {
  const [painPoints, setPainPoints] = useState([]);
  const [isfront, setIsFront] = useState(true);
  const [selectedArea, setSelectedArea] = useState(null); // <-- stores clicked area name

  const handlePainClick = (x, y) => {
    setPainPoints([{ x, y }]);
    setSelectedArea(null); // clear area name if random click
  };

  const handleAreaClick = (name) => {
    setSelectedArea(name);
    setPainPoints([]); // clear markers if clicked on defined area
  };

  const handleRefresh = () => {
    setIsFront((prev) => !prev);
    setPainPoints([]);
    setSelectedArea(null);
  };

  return (
    <div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleRefresh}
          className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
        >
          <img src={Refresh} alt="refresh" className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center mt-10">
        <div className="relative w-[350px] md:w-[500px]">
          <img
            src={isfront ? DigramFront : DigramBack}
            useMap="#image-map"
            alt="diagram back"
            className="w-full h-auto"
            onClick={(e) => {
              const rect = e.target.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              // only add marker if not clicking on <area>
              if (!e.target.closest("area")) {
                handlePainClick(x, y);
              }
            }}
          />

          {/* Red pain marker */}
          {painPoints.map((point, idx) => (
            <div
              key={idx}
              className="absolute w-10 h-10 rounded-full bg-[#FF00004D] border-2 border-red-500 pointer-events-none"
              style={{
                left: point.x - 32,
                top: point.y - 32,
              }}
            />
          ))}

          {/* Show area name if clicked */}
          {selectedArea && (
            <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded shadow text-sm font-semibold">
              {selectedArea}
            </div>
          )}
        </div>
      </div>

      <map name="image-map">
        <area
          alt="head"
          title="head"
          shape="circle"
          coords="11,74,38,128"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleAreaClick("Head");
          }}
        />
        <area
          alt="left eye"
          title="left eye"
          shape="circle"
          coords="48,81,58,98"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleAreaClick("Left Eye");
          }}
        />
      </map>
    </div>
  );
};

export default PainDiagramBack;
