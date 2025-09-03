import React, { useState } from "react";
import DigramBack from "../../assets/images/digram-back.png";
import DigramFront from "../../assets/images/digram-front.svg";
import Refresh from "../../assets/images/refresh_17981405.png";

const PainDiagramBack = () => {
  const [painPoints, setPainPoints] = useState([]);
  const [isfront, setIsFront] = useState(true);
  const handlePainClick = (x, y) => {
    setPainPoints([{ x, y }]);
  };

  const handleRefresh = () => {
    setIsFront(pre => !pre)
  };

  return (
    <div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => { handleRefresh() }}
          className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
        >
          <img src={Refresh} alt="refresh" className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center mt-10">
        <div className="relative w-[350px] md:w-[500px]">
          <img
            src={isfront ? DigramFront : DigramBack}
            alt="diagram back"
            className="w-full h-auto"
            onClick={(e) => {
              const rect = e.target.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              handlePainClick(x, y);
            }}
          />

          {/* Pain Point Marker */}
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
        </div>
      </div>
    </div>
  );
};

export default PainDiagramBack;
