import React from "react";

const FeelingPopUp = ({ handlePopupResponse }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
        <div className="bg-white w-[400px] h-[220px] rounded-2xl text-center shadow-xl flex flex-col justify-center p-6">
          <p className="text-xl font-semibold mb-6">
            Would you like to share another feeling?
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => handlePopupResponse("yes")}
              className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
            >
              Yes
            </button>
            <button
              onClick={() => handlePopupResponse("no")}
              className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default FeelingPopUp;
