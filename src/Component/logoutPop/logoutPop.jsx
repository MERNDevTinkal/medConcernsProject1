import React from "react";

const LogoutPopup = ({ selectedLanguage,isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 flex items-center justify-center   bg-opacity-40 z-50">
      <div className=" rounded-2xl shadow-lg w-[100%] max-w-sm p-6 text-center bg-[#87cefa]/80">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          {selectedLanguage === "Spanish" ? "Confirmar Cierre de Sesión" : "Confirm Logout"}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {selectedLanguage === "Spanish" ? "¿Estás seguro de que quieres cerrar sesión?" : "Are you sure you want to logout?"}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            {selectedLanguage === "Spanish" ? "Cancelar" : "Cancel"}
          </button>
          <button
            onClick={onConfirm}
            style={{ backgroundColor: "#3b86d1" }}
            className="px-4 py-2 rounded-xl  text-white  transition"
          >
            {selectedLanguage === "Spanish" ? "Cerrar Sesión" : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
