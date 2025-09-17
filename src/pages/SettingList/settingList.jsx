"use client";

import React, { useState, useEffect } from "react";
import Footer from "../../Component/Layout/Footer/Footer";
import Loader from "../../Component/webLoader/loader";
import { useParams } from "react-router-dom";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import getSetting from "../../Component/settingApi/settings";
import BackArrow from "../../assets/images/back-arrow.svg";
import { useNavigate } from "react-router-dom";

// ---------------- Concerns List ----------------
export const concernsList = [
  { key: "Pain", label: { en: "Pain", es: "Dolor" } },
  {
    key: "Breathing/Coughing",
    label: { en: "Breathing/Coughing", es: "Respiración/Tos" },
  },
  { key: "Swallowing", label: { en: "Swallowing", es: "Deglución" } },
  { key: "Nausea", label: { en: "Nausea", es: "Náuseas" } },
  { key: "Bowels", label: { en: "Bowels", es: "Intestinos" } },
  { key: "Urination", label: { en: "Urination", es: "Orinación" } },
  { key: "Fatigue", label: { en: "Fatigue", es: "Fatiga" } },
  {
    key: "Eating/Drinking",
    label: { en: "Eating/Drinking", es: "Comer/Beber" },
  },
  { key: "Medication", label: { en: "Medication", es: "Medicamentos" } },
  {
    key: "Emotions/Feelings",
    label: { en: "Emotions/Feelings", es: "Emociones/Sentimientos" },
  },
  { key: "Movement", label: { en: "Movement", es: "Movimiento" } },
  {
    key: "Communication/Thinking",
    label: { en: "Communication/Thinking", es: "Comunicación/Pensamiento" },
  },
  { key: "Vision", label: { en: "Vision", es: "Visión" } },
  { key: "Hearing", label: { en: "Hearing", es: "Audición" } },
  { key: "Illness", label: { en: "Illness", es: "Enfermedad" } },
  {
    key: "Something Happened",
    label: { en: "Something Happened", es: "Pasó Algo" },
  },
  {
    key: "Wound/Incision",
    label: { en: "Wound/Incision", es: "Herida/Incisión" },
  },
  {
    key: "Mucus/Secretions",
    label: { en: "Mucus/Secretions", es: "Moco/Secreciones" },
  },
  {
    key: "Feeding Tube",
    label: { en: "Feeding Tube", es: "Sonda de Alimentación" },
  },
  { key: "Trach", label: { en: "Trach", es: "Traqueostomía" } },
  { key: "Something Else", label: { en: "Something Else", es: "Algo Más" } },
  {
    key: "No Concerns",
    label: { en: "No Concerns", es: "Sin Preocupaciones" },
  },
];

// ---------------- Needs Board List ----------------
export const needsBoardList = [
  { key: "Bathroom", label: { en: "Bathroom", es: "Baño" } },
  { key: "Bed", label: { en: "Bed", es: "Cama" } },
  { key: "Food", label: { en: "Food", es: "Comida" } },
  { key: "Drink", label: { en: "Drink", es: "Bebida" } },
  { key: "Glasses", label: { en: "Glasses", es: "Gafas" } },
  { key: "Medication", label: { en: "Medication", es: "Medicamentos" } },
  { key: "Hearing Aids", label: { en: "Hearing Aids", es: "Audífonos" } },
  { key: "Dentures", label: { en: "Dentures", es: "Dentadura" } },
  { key: "Tissue", label: { en: "Tissue", es: "Pañuelo" } },
  { key: "Call Light", label: { en: "Call Light", es: "Luz de Llamada" } },
  {
    key: "Blanket/Pillow",
    label: { en: "Blanket/Pillow", es: "Manta/Almohada" },
  },
  {
    key: "Room Temperature",
    label: { en: "Room Temperature", es: "Temperatura de la Habitación" },
  },
  { key: "Open for Me", label: { en: "Open for Me", es: "Ábreme" } },
  { key: "TV", label: { en: "TV", es: "Televisión" } },
  { key: "Music", label: { en: "Music", es: "Música" } },
  {
    key: "Call Family",
    label: { en: "Call Family", es: "Llamar a la Familia" },
  },
  {
    key: "Change Clothes",
    label: { en: "Change Clothes", es: "Cambiar Ropa" },
  },
  { key: "Need Socks", label: { en: "Need Socks", es: "Necesito Calcetines" } },
  {
    key: "Cervical Collar",
    label: { en: "Cervical Collar", es: "Collarín Cervical" },
  },
  { key: "Helmet", label: { en: "Helmet", es: "Casco" } },
  {
    key: "Adjust Clothes",
    label: { en: "Adjust Clothes", es: "Ajustar Ropa" },
  },
  {
    key: "Change Underwear",
    label: { en: "Change Underwear", es: "Cambiar Ropa Interior" },
  },
  { key: "Light", label: { en: "Light", es: "Luz" } },
  { key: "Please Leave", label: { en: "Please Leave", es: "Por Favor Salga" } },
  { key: "Reposition", label: { en: "Reposition", es: "Recolocar" } },
  { key: "Suction", label: { en: "Suction", es: "Succión" } },
  { key: "Catheter", label: { en: "Catheter", es: "Catéter" } },
  { key: "Soiled", label: { en: "Soiled", es: "Sucio" } },
  {
    key: "Pain Meds",
    label: { en: "Pain Meds", es: "Medicamentos para el Dolor" },
  },
  { key: "Ice", label: { en: "Ice", es: "Hielo" } },
  { key: "Door", label: { en: "Door", es: "Puerta" } },
  { key: "Ice Pack", label: { en: "Ice Pack", es: "Compresa de Hielo" } },
  {
    key: "Heating Pad",
    label: { en: "Heating Pad", es: "Almohadilla Eléctrica" },
  },
  {
    key: "Phone/Tablet",
    label: { en: "Phone/Tablet", es: "Teléfono/Tableta" },
  },
  {
    key: "Inhaler/Breathing Treatment",
    label: {
      en: "Inhaler/Breathing Treatment",
      es: "Inhalador/Tratamiento Respiratorio",
    },
  },
  { key: "Need Straw", label: { en: "Need Straw", es: "Necesito Popote" } },
  {
    key: "Plug in Phone/Tablet",
    label: { en: "Plug in Phone/Tablet", es: "Cargar Teléfono/Tableta" },
  },
  { key: "PEG", label: { en: "PEG", es: "PEG" } },
  { key: "Trach", label: { en: "Trach", es: "Traqueostomía" } },
  {
    key: "Respiratory Therapist",
    label: { en: "Respiratory Therapist", es: "Terapeuta Respiratorio" },
  },
  { key: "Doctor", label: { en: "Doctor", es: "Doctor" } },
  { key: "Nurse", label: { en: "Nurse", es: "Enfermera" } },
  {
    key: "Nursing Aide",
    label: { en: "Nursing Aide", es: "Asistente de Enfermería" },
  },
  {
    key: "Occupational/Physical Therapist",
    label: {
      en: "Occupational/Physical Therapist",
      es: "Terapeuta Ocupacional/Físico",
    },
  },
  {
    key: "Speech Therapist",
    label: { en: "Speech Therapist", es: "Terapeuta del Habla" },
  },
];

// ---------------- Checkbox Component ----------------
const CustomRoundCheckbox = ({ value, checked, onChange, label }) => (
  <div
    className="flex items-center cursor-pointer space-x-2"
    onClick={() => onChange(value)}
  >
    <div
      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
        checked ? "bg-blue-theme border-blue-theme" : "border-gray-400 bg-white"
      }`}
    >
      {checked && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
    </div>
    <span className="text-black">{label}</span>
  </div>
);

export default function ConcernsSettings() {
  const navigate = useNavigate();
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [loader, setLoader] = useState(true);
  const [concerns, setConcerns] = useState(null);
  const [needboard, setNeedboard] = useState(null);
  const { name } = useParams();

  const handleConcernToggle = (key) => {
    let updatedConcerns = [...selectedConcerns];
    if (updatedConcerns.includes(key)) {
      updatedConcerns = updatedConcerns.filter((c) => c !== key);
    } else {
      updatedConcerns.push(key);
    }
    saveSettings(updatedConcerns);
    setSelectedConcerns(updatedConcerns);
  };

  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");

  const saveSettings = (updatedConcerns) => {
    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    const value = name === "Needsboard" ? "need_board" : "concerns";
    payload.append(value, updatedConcerns);
    api
      .post("saveSettings", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        if (!data.status) {
          toast.error(data.msg, { autoClose: 1500 });
        }
      })
      .catch(() => toast.error("Something went wrong", { autoClose: 1500 }));
  };

  useEffect(() => {
    getSetting(
      () => {},
      () => {},
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader,
      setConcerns,
      setNeedboard
    );
  }, [licenses_id, token]);

  useEffect(() => {
    if (name === "Needsboard" && needboard !== null) {
      setSelectedConcerns(
        typeof needboard === "string"
          ? needboard.split(",").filter(Boolean)
          : []
      );
    } else if (name !== "Needsboard" && concerns !== null) {
      setSelectedConcerns(
        typeof concerns === "string" ? concerns.split(",").filter(Boolean) : []
      );
    }
  }, [concerns, needboard, name]);

  const currentList = name === "Needsboard" ? needsBoardList : concernsList;

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <img src={BackArrow} />
            </div>
            <h2 className="text-[25px] font-normal text-black text-center">
              {selectedLanguage === "Spanish" ? "Configuración" : "Settings"}
            </h2>
            <button></button>
          </div>

          <div className="main-wrapper home-wrapper howoften-page">
            <div className="flex items-center justify-center p-4 setting-cards">
              <div className="w-full bg-gradient-to-b from-blue-50 to-white rounded-lg overflow-hidden">
                <div className="p-3 sm:p-4 md:p-6">
                  <h1 className="text-xs text-gray-500 mb-6">
                    {selectedLanguage === "Spanish"
                      ? "Configuración"
                      : "Settings"}
                  </h1>

                  {/* Concerns List */}
                  <div className="flex flex-col gap-3 py-6 px-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {currentList.map((c) => (
                        <CustomRoundCheckbox
                          key={c.key}
                          value={c.key}
                          checked={selectedConcerns.includes(c.key)}
                          onChange={handleConcernToggle}
                          label={
                            selectedLanguage === "Spanish"
                              ? c.label.es
                              : c.label.en
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
