"use client";
import React, { useState, useEffect } from "react";
import Footer from "../../Component/Layout/Footer/Footer";
import Loader from "../../Component/webLoader/loader";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import getSetting from "../../Component/settingApi/settings";
import BackArrow from "../../assets/images/back-arrow.svg";

// ---------------- Concerns List ----------------
export const concernsList = [
  { key: "Pain", label: { en: "Pain", es: "Dolor" } },
  {
    key: "Breathing / Coughing",
    label: { en: "Breathing / Coughing", es: "Respiración / Tos" },
  },
  { key: "Swallowing", label: { en: "Swallowing", es: "Deglución" } },
  { key: "Nausea", label: { en: "Nausea", es: "Náuseas" } },
  { key: "Bowels", label: { en: "Bowels", es: "Intestinos" } },
  { key: "Urination", label: { en: "Urination", es: "Orinación" } },
  { key: "Fatigue", label: { en: "Fatigue", es: "Fatiga" } },
  {
    key: "Eating / Drinking",
    label: { en: "Eating / Drinking", es: "Comer / Beber" },
  },
  { key: "Medication", label: { en: "Medication", es: "Medicamentos" } },
  {
    key: "Emotions / Feelings",
    label: { en: "Emotions / Feelings", es: "Emociones / Sentimientos" },
  },
  { key: "Movement", label: { en: "Movement", es: "Movimiento" } },
  {
    key: "Communication / Thinking",
    label: { en: "Communication / Thinking", es: "Comunicación / Pensamiento" },
  },
  { key: "Vision", label: { en: "Vision", es: "Visión" } },
  { key: "Hearing", label: { en: "Hearing", es: "Audición" } },
  { key: "Illness", label: { en: "Illness", es: "Enfermedad" } },
  {
    key: "Something Happened",
    label: { en: "Something Happened", es: "Pasó Algo" },
  },
  {
    key: "Wound / Incision",
    label: { en: "Wound / Incision", es: "Herida / Incisión" },
  },
  {
    key: "Mucus / Secretions",
    label: { en: "Mucus / Secretions", es: "Moco / Secreciones" },
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
    key: "Blanket / Pillow",
    label: { en: "Blanket / Pillow", es: "Manta / Almohada" },
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
  // { key: "Light", label: { en: "Light", es: "Luz" } },
  { key: "Please Leave", label: { en: "Please Leave", es: "Por Favor Salga" } },
  { key: "Reposition", label: { en: "Reposition", es: "Recolocar" } },
  { key: "Suction", label: { en: "Suction", es: "Succión" } },
  { key: "Catheter", label: { en: "Catheter", es: "Catéter" } },
  // { key: "Soiled", label: { en: "Soiled", es: "Sucio" } },
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
    key: "Phone / Tablet",
    label: { en: "Phone / Tablet", es: "Teléfono / Tableta" },
  },
  {
    key: "Inhaler / Breathing Treatment",
    label: {
      en: "Inhaler / Breathing Treatment",
      es: "Inhalador / Tratamiento Respiratorio",
    },
  },
  { key: "Need Straw", label: { en: "Need Straw", es: "Necesito Popote" } },
  {
    key: "Plug in Phone / Tablet",
    label: { en: "Plug in Phone / Tablet", es: "Cargar Teléfono / Tableta" },
  },
  // { key: "PEG", label: { en: "PEG", es: "PEG" } },
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
    key: "Occupational / Physical Therapist",
    label: {
      en: "Occupational / Physical Therapist",
      es: "Terapeuta Ocupacional / Físico",
    },
  },
  {
    key: "Speech Therapist",
    label: { en: "Speech Therapist", es: "Terapeuta del Habla" },
  },
  // Missing items from needBoard array
  { key: "Need Changed", label: { en: "Need Changed", es: "Necesita Cambio" } },
  { key: "Lights", label: { en: "Lights", es: "Luces" } },
  { key: "Charge Hearing Aids", label: { en: "Charge Hearing Aids", es: "Cargar Audífonos" } },
  { key: "Ostomy / Colostomy Bag", label: { en: "Ostomy / Colostomy Bag", es: "Bolsa de Ostomía / Colostomía" } },
  { key: "Blood Sugar", label: { en: "Blood Sugar", es: "Azúcar en Sangre" } },
  { key: "Blood Pressure", label: { en: "Blood Pressure", es: "Presión Arterial" } },
  { key: "Feeding Tube", label: { en: "Feeding Tube", es: "Tubo de Alimentación" } },
  { key: "Something Else", label: { en: "Something Else", es: "Algo Más" } }
];

// ---------------- Checkbox Component ----------------
const CustomRoundCheckbox = ({ value, checked, onChange, label }) => (
  <div
    className="flex items-center cursor-pointer space-x-2"
    onClick={() => onChange(value)}
  >
    <div
      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${checked ? "bg-blue-theme border-blue-theme" : "border-gray-400 bg-white"
        }`}
    >
      {checked && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
    </div>
    <span className="text-black">{label}</span>
  </div>
);

export default function ConcernsSettings() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [loader, setLoader] = useState(true);
  const [concerns, setConcerns] = useState(null);
  const [needboard, setNeedboard] = useState(null);
  const [uncheckNeedBoard, setUncheckNeedBoard] = useState([]);
  const [UncheckConcerns, setUncheckConcerns] = useState([]);
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");
  const [isSticky, setIsSticky] = useState(false);
  const currentList = name === "Needsboard" ? needsBoardList : concernsList;
  const allKeys = currentList.map((c) => c.key);
  const [unCheckedValue, setUncheckedValue] = useState([]);
  const saveSettings = (updatedConcerns, updatedUnchecked) => {
    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    const value = name === "Needsboard" ? "need_board" : "concerns";
    const unChecked =
      name === "Needsboard" ? "uncheck_need_board" : "uncheck_concerns";
    payload.append(value, updatedConcerns);
    payload.append(unChecked, updatedUnchecked);
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

  // ---------------- Handle toggle ----------------
  const handleConcernToggle = (key) => {
    let updatedConcerns = [...selectedConcerns];
    let updatedUnchecked = [...unCheckedValue];
    if (updatedConcerns.includes(key)) {
      updatedConcerns = updatedConcerns.filter((c) => c !== key);
      if (!updatedUnchecked.includes(key)) {
        updatedUnchecked.push(key);
      }
    } else {
      updatedConcerns.push(key);
      updatedUnchecked = updatedUnchecked.filter((item) => item !== key);
    }
    setSelectedConcerns(updatedConcerns);
    setUncheckedValue(updatedUnchecked);
    // saveSettings(updatedConcerns, updatedUnchecked);
  };
  const handleSelectAll = () => {
    setSelectedConcerns(allKeys);
    setUncheckedValue([]);
    toast.info("All items selected", { autoClose: 1500 });
  };

  const handleDeselectAll = () => {
    setSelectedConcerns([]);
    setUncheckedValue(allKeys);
    toast.info("All items deselected", { autoClose: 1500 });
  };

  const handleSaveSettings = () => {
    saveSettings(selectedConcerns, unCheckedValue);
  };
  // ---------------- Load settings ----------------
  useEffect(() => {
    getSetting(
      () => { },
      () => { },
      setSelectedLanguage,
      () => { },
      () => { },
      setLoader,
      setConcerns,
      setNeedboard,
      setUncheckNeedBoard,
      setUncheckConcerns
    );
  }, [licenses_id, token]);

  useEffect(() => {
    if (!uncheckNeedBoard) setUncheckNeedBoard([]);
    if (!UncheckConcerns) setUncheckConcerns([]);

    if (name === "Needsboard" && needboard !== null) {
      console.log("===>dgdfgdgdfgdfg")
      setSelectedConcerns(
        typeof needboard === "string"
          ? needboard.split(",").filter(Boolean)
          : allKeys
      );
    } else if (name !== "Needsboard" && concerns !== null) {
      setSelectedConcerns(
        typeof concerns === "string"
          ? concerns.split(",").filter(Boolean)
          : allKeys
      );
    } else {
      setSelectedConcerns(allKeys);
    }
  }, [concerns, needboard, name, uncheckNeedBoard, UncheckConcerns]);
  const t = (key) => {
    const translations = {
      en: {
        save: "Save",
        selectAll: "Select All",
        deselectAll: "Deselect All",
      },
      es: {
        save: "Guardar",
        selectAll: "Seleccionar Todo",
        deselectAll: "Deseleccionar Todo",
      },
    };
    return selectedLanguage === "Spanish"
      ? translations.es[key]
      : translations.en[key];
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header z-40">
            <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
              <img src={BackArrow} />
            </div>
            <h2 className="text-[25px] font-normal text-black text-center">
              {selectedLanguage === "Spanish" ? `${name === "Needsboard" ? "Necesita Configuración De Tablero" : "Configuración De Preocupaciones"}` : `${name === "Needsboard" ? "Needs Board Settings" : "Concern Settings"}`}
            </h2>
            <button></button>
          </div>

          <div className="main-wrapper home-wrapper howoften-page">
            <div className="flex items-center justify-center p-4 setting-cards">
              <div className="w-full bg-gradient-to-b from-blue-50 to-white rounded-lg overflow-hidden">
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="flex justify-between align-center">
                    <h1 className="text-xs text-gray-500 mb-0">
                      {selectedLanguage === "Spanish"
                        ? "Configuración"
                        : "Settings"}
                    </h1>
                    <div className="flex justify-between ">
                      <button
                        className="bg-[#00acdcc4]
 text-white px-4 py-2 rounded-md text-sm transition-colors border-b-2 "
                        onClick={handleSelectAll}
                      >
                        {t("selectAll")}
                      </button>
                      <button
                        className="bg-[#00acdcc4]  text-white px-4 py-2 rounded-md text-sm transition-colors border-b-2 "
                        onClick={handleDeselectAll}
                      >
                        {t("deselectAll")}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 py-6 px-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {currentList.map((c) => {
                        return (
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
                        )
                      })}
                    </div>
                  </div>

                  <div className="">
                    <div className="flex justify-center">
                      <button
                        className="bg-[#00acdcc4]
 text-white px-4 py-2 rounded-md text-sm transition-colors border-b-2"
                        onClick={handleSaveSettings}
                      >

                        {t("save")}
                      </button>
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
