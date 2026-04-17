// SaveWarningPopup.jsx
import React from "react";

const SaveWarningPopup = ({ selectedLanguage, open, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0  flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-3 text-red-600">
         {selectedLanguage === "Spanish" ? "¡Advertencia!" : "Warning!"}
        </h2>
        <p className="text-gray-700 mb-6">
          {selectedLanguage === "Spanish" ? "Tienes datos de resumen sin guardar." : "You have unsaved summary data."}<br />
          {selectedLanguage === "Spanish" ? "Si sales de esta página ahora, tus cambios se perderán." : "If you leave this page now, your changes will be lost."}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => { onConfirm() }}
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            {selectedLanguage === "Spanish" ? "Descartar" : "Discard"}
          </button>

          <button
            onClick={() => { onCancel() }}
            className="px-5 py-2 rounded-lg bg-gray-300 text-black font-semibold hover:bg-gray-400 transition"
          >
            {selectedLanguage === "Spanish" ? "Guardar Primero" : "Save First"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveWarningPopup;
