import React, { useState } from "react";
import FaceDigram from "../../assets/images/face-digram.svg";

const EarDiagram = () => {
  const [painPoints, setPainPoints] = useState([]);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPainPoints([{ x, y }]);
  };
  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <div
          className="relative w-[250px] md:w-[300px] cursor-crosshair"
          onClick={handleClick}
        >
          <img src={FaceDigram} alt="Face" className="w-full h-auto" />
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="absolute w-8 h-8 rounded-full bg-[#FF00004D] border border-red-500 pointer-events-none"
              style={{
                left: point.x - 32,
                top: point.y - 32,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EarDiagram;
