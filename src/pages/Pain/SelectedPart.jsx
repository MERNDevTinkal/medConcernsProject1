// SelectedPart.jsx
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const SelectedPart = () => {
  const { partId } = useParams();
  const svgRef = useRef();

  useEffect(() => {
    if (svgRef.current) {
      const part = svgRef.current.querySelector(`#${partId}`);
      if (part) {
        const bbox = part.getBBox();
        const padding = 100;

        svgRef.current.setAttribute(
          "viewBox",
          `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`
        );

        svgRef.current.querySelectorAll("path").forEach((p) => {
          if (p.id !== partId) {
            p.style.display = "none";
          }
        });
      }
    }
  }, [partId]);

  return (
    <div>
      <h2>Selected Part: {partId}</h2>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 1000"
        style={{ width: "400px" }}
      >
        <path
          id="head"
          d="M220,50 C210,20 260,20 250,50 Z"
          fill="#f2c9b5"
        />
        <path
          id="left-arm"
          d="M150,150 L130,300 L150,300 L170,150 Z"
          fill="#f2c9b5"
        />
        <path
          id="torso"
          d="M200,150 L300,150 L280,400 L220,400 Z"
          fill="#f2c9b5"
        />
      </svg>
    </div>
  );
};

export default SelectedPart;
