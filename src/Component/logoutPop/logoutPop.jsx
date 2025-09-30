import React from "react";

const LogoutPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-sm p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Confirm Logout
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to log out?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{ backgroundColor: "#3b86d1" }}
            className="px-4 py-2 rounded-xl  text-white  transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
