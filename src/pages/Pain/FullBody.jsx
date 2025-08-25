// FullBody.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const FullBody = () => {
  const navigate = useNavigate();

  const handlePartClick = (partId) => {
    navigate(`/part/${partId}`);
  };

  return (
    <div>
      <h2>Full Body</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 1000"
        style={{ width: "400px", cursor: "pointer" }}
      >
        <path
          id="head"
          d="M220,50 C210,20 260,20 250,50 Z"
          fill="#f2c9b5"
          onClick={() => handlePartClick("head")}
        />
        <path
          id="left-arm"
          d="M150,150 L130,300 L150,300 L170,150 Z"
          fill="#f2c9b5"
          onClick={() => handlePartClick("left-arm")}
        />
        <path
          id="torso"
          d="M200,150 L300,150 L280,400 L220,400 Z"
          fill="#f2c9b5"
          onClick={() => handlePartClick("torso")}
        />
      </svg>
    </div>
  );
};

export default FullBody;
