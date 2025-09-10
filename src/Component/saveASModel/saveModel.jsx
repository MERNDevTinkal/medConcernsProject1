import React, { useState } from "react";

const SaveModel = ({ saveData, setSaveAs, setShowSaveModal }) => {
  const [error, setError] = useState(false);

  const handleSaveClick = () => {
    const inputEl = document.getElementById("drawingName");
    const value = inputEl.value.trim();
    if (!value) {
      setError(true);
      return;
    }
    setError(false);
    saveData();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveClick();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-[800px] rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-4">
          <h2 className="text-[32px] font-semibold">Save As</h2>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-3">
            <input
              onChange={(e) => {
                setSaveAs(e.target.value);
                setError(false); // remove error when user starts typing
              }}
              onKeyDown={handleKeyDown}
              id="drawingName"
              type="text"
              className={`col-span-5 h-12 w-full rounded-md border ${
                error ? "border-red-500" : "border-gray-300"
              } px-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 ${
                error ? "focus:ring-red-500" : "focus:ring-blue-700"
              }`}
              placeholder="Enter a name"
            />
            {error && (
              <p className="col-span-5 text-red-500 text-sm mt-1">
                This field is required.
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2">
          <button
            onClick={() => setShowSaveModal(false)}
            className="border border-gray-400 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button onClick={handleSaveClick} className="thm-btn">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveModel;
