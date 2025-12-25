// SaveWarningPopup.jsx
import React from "react";

const SaveWarningPopup = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0  flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-3 text-red-600">
          Warning!
        </h2>
        <p className="text-gray-700 mb-6">
          You have unsaved summary data.<br />
          If you leave this page now, your changes will be lost.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => { onConfirm() }}
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Discard
          </button>

          <button
            onClick={() => { onCancel() }}
            className="px-5 py-2 rounded-lg bg-gray-300 text-black font-semibold hover:bg-gray-400 transition"
          >
            Save First
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveWarningPopup;
