// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Footer from "../../Component/Layout/Footer/Footer";
// import Loader from "../../Component/webLoader/loader";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import api from "../../Component/apiCall/apiCall";
// import { toast } from "react-toastify";
// import getSetting from "../../Component/settingApi/settings";
// import BackArrow from "../../assets/images/back-arrow.svg";
// import Topicboard from "../../Component/settingApi/topic-board.js"
// // // ---------------- Concerns List ----------------
// export const concernsList = [
//   { name: "Pain", label: { en: "Pain", es: "Dolor" } },
//   {
//     name: "Breathing / Coughing",
//     label: { en: "Breathing / Coughing", es: "Respiración / Tos" },
//   },
//   { name: "Swallowing", label: { en: "Swallowing", es: "Deglución" } },
//   { name: "Nausea", label: { en: "Nausea", es: "Náuseas" } },
//   { name: "Bowels", label: { en: "Bowels", es: "Intestinos" } },
//   { name: "Urination", label: { en: "Urination", es: "Orinación" } },
//   { name: "Fatigue", label: { en: "Fatigue", es: "Fatiga" } },
//   {
//     name: "Eating / Drinking",
//     label: { en: "Eating / Drinking", es: "Comer / Beber" },
//   },
//   { name: "Medication", label: { en: "Medication", es: "Medicamentos" } },
//   {
//     name: "Emotions / Feelings",
//     label: { en: "Emotions / Feelings", es: "Emociones / Sentimientos" },
//   },
//   { name: "Movement", label: { en: "Movement", es: "Movimiento" } },
//   {
//     name: "Communication / Thinking",
//     label: { en: "Communication / Thinking", es: "Comunicación / Pensamiento" },
//   },
//   { name: "Vision", label: { en: "Vision", es: "Visión" } },
//   { name: "Hearing", label: { en: "Hearing", es: "Audición" } },
//   { name: "Illness", label: { en: "Illness", es: "Enfermedad" } },
//   {
//     name: "Something Happened",
//     label: { en: "Something Happened", es: "Pasó Algo" },
//   },
//   {
//     name: "Wound / Incision",
//     label: { en: "Wound / Incision", es: "Herida / Incisión" },
//   },
//   {
//     name: "Mucus / Secretions",
//     label: { en: "Mucus / Secretions", es: "Moco / Secreciones" },
//   },
//   {
//     name: "Feeding Tube",
//     label: { en: "Feeding Tube", es: "Sonda de Alimentación" },
//   },
//   { name: "Trach", label: { en: "Trach", es: "Traqueostomía" } },
//   { name: "Something Else", label: { en: "Something Else", es: "Algo Más" } },
//   {
//     name: "No Concerns",
//     label: { en: "No Concerns", es: "Sin Preocupaciones" },
//   },
// ];

// // ---------------- Needs Board List ----------------
// export const needsBoardList = [
//   { name: "Bathroom", label: { en: "Bathroom", es: "Baño" } },
//   { name: "Bed", label: { en: "Bed", es: "Cama" } },
//   { name: "Food", label: { en: "Food", es: "Comida" } },
//   { name: "Drink", label: { en: "Drink", es: "Bebida" } },

//   {
//     name: "Pain Meds",
//     label: { en: "Pain Meds", es: "Medicamentos para el Dolor" },
//   },
//   { name: "Medication", label: { en: "Medication", es: "Medicamentos" } },
//   { name: "Need Changed", label: { en: "Need Changed", es: "Necesita Cambio" } },
//   { name: "Reposition", label: { en: "Reposition", es: "Recolocar" } },
//   { name: "Ice", label: { en: "Ice", es: "Hielo" } },
//   { name: "Ice Pack", label: { en: "Ice Pack", es: "Compresa de Hielo" } },

//   {
//     name: "Heating Pad",
//     label: { en: "Heating Pad", es: "Almohadilla Eléctrica" },
//   },
//   {
//     name: "Blanket / Pillow",
//     label: { en: "Blanket / Pillow", es: "Manta / Almohada" },
//   },
//   {
//     name: "Room Temperature",
//     label: { en: "Room Temperature", es: "Temperatura de la Habitación" },
//   },
//   { name: "Tissue", label: { en: "Tissue", es: "Pañuelo" } },
//   { name: "Lights", label: { en: "Lights", es: "Luces" } },
//   { name: "TV", label: { en: "TV", es: "Televisión" } },
//   { name: "Music", label: { en: "Music", es: "Música" } },

//   { name: "Need Straw", label: { en: "Need Straw", es: "Necesito Popote" } },
//   { name: "Glasses", label: { en: "Glasses", es: "Gafas" } },


//   { name: "Hearing Aids", label: { en: "Hearing Aids", es: "Audífonos" } },
//   { name: "Dentures", label: { en: "Dentures", es: "Dentadura" } },
//   {
//     name: "Change Clothes",
//     label: { en: "Change Clothes", es: "Cambiar Ropa" },
//   },
//   {
//     name: "Adjust Clothes",
//     label: { en: "Adjust Clothes", es: "Ajustar Ropa" },
//   },

//   {
//     name: "Change Underwear",
//     label: { en: "Change Underwear", es: "Cambiar Ropa Interior" },
//   },
//   { name: "Need Socks", label: { en: "Need Socks", es: "Necesito Calcetines" } },

//   { name: "Call Light", label: { en: "Call Light", es: "Luz de Llamada" } },
//   { name: "Door", label: { en: "Door", es: "Puerta" } },
//   {
//     name: "Call Family",
//     label: { en: "Call Family", es: "Llamar a la Familia" },
//   },
//   { name: "Please Leave", label: { en: "Please Leave", es: "Por Favor Salga" } },

//   { name: "Open for Me", label: { en: "Open for Me", es: "Ábreme" } },

//   {
//     name: "Phone / Tablet",
//     label: { en: "Phone / Tablet", es: "Teléfono / Tableta" },
//   },

//   {
//     name: "Plug in Phone / Tablet",
//     label: { en: "Plug in Phone / Tablet", es: "Cargar Teléfono / Tableta" },
//   },

//   { name: "Charge Hearing Aids", label: { en: "Charge Hearing Aids", es: "Cargar Audífonos" } },


//   {
//     name: "Inhaler / Breathing Treatment",
//     label: {
//       en: "Inhaler / Breathing Treatment",
//       es: "Inhalador / Tratamiento Respiratorio",
//     },
//   },

//   { name: "Suction", label: { en: "Suction", es: "Succión" } },
//   { name: "Catheter", label: { en: "Catheter", es: "Catéter" } },
//   { name: "Ostomy / Colostomy Bag", label: { en: "Ostomy / Colostomy Bag", es: "Bolsa de Ostomía / Colostomía" } },

//   { name: "Blood Sugar", label: { en: "Blood Sugar", es: "Azúcar en Sangre" } },
//   { name: "Blood Pressure", label: { en: "Blood Pressure", es: "Presión Arterial" } },

//   { name: "Trach", label: { en: "Trach", es: "Traqueostomía" } },



//   { name: "Feeding Tube", label: { en: "Feeding Tube", es: "Tubo de Alimentación" } },
//   { name: "Helmet", label: { en: "Helmet", es: "Casco" } },



//   {
//     name: "Cervical Collar",
//     label: { en: "Cervical Collar", es: "Collarín Cervical" },
//   },
//   { name: "Nurse", label: { en: "Nurse", es: "Enfermera" } },
//   { name: "Doctor", label: { en: "Doctor", es: "Doctor" } },


//   {
//     name: "Nursing Aide",
//     label: { en: "Nursing Aide", es: "Asistente de Enfermería" },
//   },
//   {
//     name: "Speech Therapist",
//     label: { en: "Speech Therapist", es: "Terapeuta del Habla" },
//   },

//   {
//     name: "Occupational / Physical Therapist",
//     label: {
//       en: "Occupational / Physical Therapist",
//       es: "Terapeuta Ocupacional / Físico",
//     },
//   },


//   {
//     name: "Respiratory Therapist",
//     label: { en: "Respiratory Therapist", es: "Terapeuta Respiratorio" },
//   },

//   { name: "Something Else", label: { en: "Something Else", es: "Algo Más" } }
// ];
// // ---------------- Checkbox Component ----------------
// const CustomRoundCheckbox = ({ value, checked, onChange, label }) => (
//   <div
//     className="flex items-center cursor-pointer space-x-2"
//     onClick={() => onChange(value)}
//   >
//     <div
//       className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${checked ? "bg-blue-theme border-blue-theme" : "border-gray-400 bg-white"
//         }`}
//     >
//       {checked && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
//     </div>
//     <span className="text-black">{label}</span>
//   </div>
// );
// export default function ConcernsSettings() {
//   const navigate = useNavigate();
//   const { name } = useParams();
//   const [selectedConcerns, setSelectedConcerns] = useState([]);
//   const [selectedLanguage, setSelectedLanguage] = useState("English");
//   const [apiData, setApiData] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [concerns, setConcerns] = useState(null);
//   const [needboard, setNeedboard] = useState(null);
//   const [uncheckNeedBoard, setUncheckNeedBoard] = useState("");
//   const [UncheckConcerns, setUncheckConcerns] = useState("");
//   const token = localStorage.getItem("token");
//   const licenses_id = localStorage.getItem("license_key");
//   const currentList = name === "Needsboard" ? [...needsBoardList, ...apiData] : concernsList;
//   const allKeys = name === "Needsboard" ? [...apiData.map((c) => c.name), ...currentList.map((c) => c.name)] : currentList.map((c) => c.name);
//   const [unCheckedValue, setUncheckedValue] = useState([]);
//   const initializedRef = useRef({
//     needsboard: false,
//     concerns: false
//   });

//   const saveSettings = (checkedItems, uncheckedItems, isSaveClick = "") => {
//     const payload = new FormData();
//     payload.append("licenses_id", licenses_id);
//     const isNeeds = name === "Needsboard";
//     const value = isNeeds ? "need_board" : "concerns";
//     const unCheckedKey = isNeeds ? "uncheck_need_board" : "uncheck_concerns";
//     const concernsString = checkedItems.length > 0 ? checkedItems.join(",") : null;
//     const uncheckedString = uncheckedItems.length > 0 ? uncheckedItems.join(",") : null;
//     payload.append(value, concernsString);
//     payload.append(unCheckedKey, uncheckedString);
//     const oppositeKey = isNeeds ? "concerns" : "need_board";
//     const oppositeUncheckKey = isNeeds ? "uncheck_concerns" : "uncheck_need_board";
//     const oppositeData = isNeeds ? concerns : needboard;
//     const oppositeUncheckData = isNeeds ? UncheckConcerns : uncheckNeedBoard;
//     const oppositeDataString = oppositeData && oppositeData.length > 0 ? oppositeData : null;
//     const oppositeUncheckDataString = oppositeUncheckData && oppositeUncheckData.length > 0 ? oppositeUncheckData : null;
//     payload.append(oppositeKey, oppositeDataString || "");
//     payload.append(oppositeUncheckKey, oppositeUncheckDataString || "");
//     api
//       .post("saveSettings", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(({ data }) => {
//         if (!data.status) {
//           toast.error(data.msg, { autoClose: 1500 });
//         }
//         if (isSaveClick === "Save") {
//           toast.success("Saved successfully! ", { autoClose: 1500 });
//         }
//       })
//       .catch(() => toast.error("Something went wrong", { autoClose: 1500 }));
//   };
//   const handleConcernToggle = (key) => {
//     setSelectedConcerns(prev => {
//       let updatedConcerns;
//       if (prev.includes(key)) {
//         updatedConcerns = prev.filter((c) => c !== key);
//       } else {
//         updatedConcerns = [...prev, key];
//       }
//       const updatedUnchecked = allKeys.filter(item => !updatedConcerns.includes(item));
//       setUncheckedValue(updatedUnchecked);
//       return updatedConcerns;
//     });
//   };

//   const handleSelectAll = () => {
//     setSelectedConcerns(allKeys);
//     setUncheckedValue([]);
//     toast.info("All items selected", { autoClose: 1500 });
//   };

//   const handleDeselectAll = () => {
//     setSelectedConcerns([]);
//     setUncheckedValue(allKeys);
//     toast.info("All items deselected", { autoClose: 1500 });
//   };

//   const handleSaveSettings = () => {
//     console.log("--->",[selectedConcerns,unCheckedValue])
//     saveSettings(selectedConcerns, unCheckedValue, "Save");
//   };

//   // ---------------- Load settings ----------------
//   useEffect(() => {
//     getSetting(
//       () => { },
//       () => { },
//       setSelectedLanguage,
//       () => { },
//       () => { },
//       setLoader,
//       setConcerns,
//       setNeedboard,
//       setUncheckNeedBoard,
//       setUncheckConcerns
//     );
//     Topicboard(setApiData);
//   }, [licenses_id, token]);

//   // Reset state when page type changes
//   useEffect(() => {
//     setSelectedConcerns([]);
//     setUncheckedValue([]);
//   }, [name]);
//   // Initialize state when API data is loaded and page type is determined
//   useEffect(() => {
//     if (loader) return;
//     const isNeeds = name === "Needsboard";
//     const pageKey = isNeeds ? "needsboard" : "concerns";
//     if (!initializedRef.current[pageKey]) {
//       const checkedData = isNeeds ? needboard : concerns;
//       const uncheckedData = isNeeds ? uncheckNeedBoard : UncheckConcerns;
//       let checkedFromAPI = [];
//       let uncheckedFromAPI = [];
//       if (uncheckedData && uncheckedData.trim() !== "") {
//         uncheckedFromAPI = uncheckedData.split(",").filter(Boolean);
//         checkedFromAPI = allKeys.filter(name => !uncheckedFromAPI.includes(name));
//       }
//       else if (checkedData && checkedData.trim() !== "") {
//         checkedFromAPI = checkedData.split(",").filter(Boolean);
//         uncheckedFromAPI = allKeys.filter(name => !checkedFromAPI.includes(name));
//       }
//       else {
//         checkedFromAPI = allKeys;
//         uncheckedFromAPI = [];
//       }
//       setSelectedConcerns(checkedFromAPI);
//       setUncheckedValue(uncheckedFromAPI);
//       initializedRef.current[pageKey] = true;
//     }
//   }, [loader, concerns, needboard, uncheckNeedBoard, UncheckConcerns, name, allKeys]);

//   const t = (key) => {
//     const translations = {
//       en: {
//         save: "Save",
//         icon: "Add Icon",
//         selectAll: "Select All",
//         deselectAll: "Deselect All",
//       },
//       es: {
//         save: "Guardar",
//         icon: "Agregar icono",
//         selectAll: "Seleccionar Todo",
//         deselectAll: "Deseleccionar Todo",
//       },
//     };
//     return selectedLanguage === "Spanish"
//       ? translations.es[key]
//       : translations.en[key];
//   };

//   return (
//     <>
//       {loader ? (
//         <Loader />
//       ) : (
//         <>
//           <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header z-40">
//             <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
//               <img src={BackArrow} />
//             </div>
//             <h2 className="text-[25px] font-normal text-black text-center">
//               {selectedLanguage === "Spanish"
//                 ? `${name === "Needsboard" ? "Necesita Configuración De Tablero" : "Configuración De Preocupaciones"}`
//                 : `${name === "Needsboard" ? "Needs Board Settings" : "Concern Settings"}`
//               }
//             </h2>
//             <button></button>
//           </div>
//           <div className="main-wrapper home-wrapper howoften-page">
//             <div className="flex items-center justify-center p-4 setting-cards">
//               <div className="w-full bg-gradient-to-b from-blue-50 to-white rounded-lg overflow-hidden">
//                 <div className="p-3 sm:p-4 md:p-6">
//                   <div className="flex justify-between align-center">
//                     <h1 className="text-xs text-gray-500 mb-0"></h1>
//                     <div className="flex justify-between gap-2">
//                       {name === "Needsboard" && (
//                         <Link to={"/icon-upload"}>
//                           <button
//                             className="bg-[#00acdcc4] text-white px-4 py-2 rounded-md text-sm transition-colors border-b-2"
//                           >
//                             {t("icon")}
//                           </button>
//                         </Link>
//                       )}
//                       <button
//                         className="bg-[#00acdcc4] text-white px-4 py-2 rounded-md text-sm transition-colors border-b-2"
//                         onClick={handleSelectAll}
//                       >
//                         {t("selectAll")}
//                       </button>
//                       <button
//                         className="bg-[#00acdcc4] text-white px-4 py-2 rounded-md text-sm transition-colors border-b-2"
//                         onClick={handleDeselectAll}
//                       >
//                         {t("deselectAll")}
//                       </button>
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-3 py-6 px-2">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//                       {currentList.map((c) => {
//                         return (
//                           <CustomRoundCheckbox
//                             key={c.name}
//                             value={c.name}
//                             checked={selectedConcerns.includes(c.name)}
//                             onChange={handleConcernToggle}
//                             label={
//                               selectedLanguage === "Spanish"
//                                 ? c?.label?.es
//                                 : c?.label?.en || c?.name
//                             }
//                           />
//                         )
//                       })}
//                     </div>
//                   </div>
//                   <div className="">
//                     <div className="flex justify-center">
//                       <button
//                         className="bg-[#00acdcc4] text-white px-4 py-2 rounded-md text-sm transition-colors border-b-2"
//                         onClick={handleSaveSettings}
//                       >
//                         {t("save")}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//       <Footer />
//     </>
//   );
// }


"use client";
import React, { useState, useEffect, useRef } from "react";
import Footer from "../../Component/Layout/Footer/Footer";
import Loader from "../../Component/webLoader/loader";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import getSetting from "../../Component/settingApi/settings";
import BackArrow from "../../assets/images/back-arrow.svg";
import Topicboard from "../../Component/settingApi/topic-board.js"
export const concernsList = [
  { name: "Pain", label: { en: "Pain", es: "Dolor" } },
  {
    name: "Breathing / Coughing",
    label: { en: "Breathing / Coughing", es: "Respiración / Tos" },
  },
  { name: "Swallowing", label: { en: "Swallowing", es: "Deglución" } },
  { name: "Nausea", label: { en: "Nausea", es: "Náuseas" } },
  { name: "Bowels", label: { en: "Bowels", es: "Intestinos" } },
  { name: "Urination", label: { en: "Urination", es: "Orinación" } },
  { name: "Fatigue", label: { en: "Fatigue", es: "Fatiga" } },
  {
    name: "Eating / Drinking",
    label: { en: "Eating / Drinking", es: "Comer / Beber" },
  },
  { name: "Medication", label: { en: "Medication", es: "Medicamentos" } },
  {
    name: "Emotions / Feelings",
    label: { en: "Emotions / Feelings", es: "Emociones / Sentimientos" },
  },
  { name: "Movement", label: { en: "Movement", es: "Movimiento" } },
  {
    name: "Communication / Thinking",
    label: { en: "Communication / Thinking", es: "Comunicación / Pensamiento" },
  },
  { name: "Vision", label: { en: "Vision", es: "Visión" } },
  { name: "Hearing", label: { en: "Hearing", es: "Audición" } },
  { name: "Illness", label: { en: "Illness", es: "Enfermedad" } },
  {
    name: "Something Happened",
    label: { en: "Something Happened", es: "Pasó Algo" },
  },
  {
    name: "Wound / Incision",
    label: { en: "Wound / Incision", es: "Herida / Incisión" },
  },
  {
    name: "Mucus / Secretions",
    label: { en: "Mucus / Secretions", es: "Moco / Secreciones" },
  },
  {
    name: "Feeding Tube",
    label: { en: "Feeding Tube", es: "Sonda de Alimentación" },
  },
  { name: "Trach", label: { en: "Trach", es: "Traqueostomía" } },
  { name: "Something Else", label: { en: "Something Else", es: "Algo Más" } },
  {
    name: "No Concerns",
    label: { en: "No Concerns", es: "Sin Preocupaciones" },
  },
];

// ---------------- Needs Board List ----------------
export const needsBoardList = [
  { name: "Bathroom", label: { en: "Bathroom", es: "Baño" } },
  { name: "Bed", label: { en: "Bed", es: "Cama" } },
  { name: "Food", label: { en: "Food", es: "Comida" } },
  { name: "Drink", label: { en: "Drink", es: "Bebida" } },

  {
    name: "Pain Meds",
    label: { en: "Pain Meds", es: "Medicamentos para el Dolor" },
  },
  { name: "Medication", label: { en: "Medication", es: "Medicamentos" } },
  { name: "Need Changed", label: { en: "Need Changed", es: "Necesita Cambio" } },
  { name: "Reposition", label: { en: "Reposition", es: "Recolocar" } },
  { name: "Ice", label: { en: "Ice", es: "Hielo" } },
  { name: "Ice Pack", label: { en: "Ice Pack", es: "Compresa de Hielo" } },

  {
    name: "Heating Pad",
    label: { en: "Heating Pad", es: "Almohadilla Eléctrica" },
  },
  {
    name: "Blanket / Pillow",
    label: { en: "Blanket / Pillow", es: "Manta / Almohada" },
  },
  {
    name: "Room Temperature",
    label: { en: "Room Temperature", es: "Temperatura de la Habitación" },
  },
  { name: "Tissue", label: { en: "Tissue", es: "Pañuelo" } },
  { name: "Lights", label: { en: "Lights", es: "Luces" } },
  { name: "TV", label: { en: "TV", es: "Televisión" } },
  { name: "Music", label: { en: "Music", es: "Música" } },

  { name: "Need Straw", label: { en: "Need Straw", es: "Necesito Popote" } },
  { name: "Glasses", label: { en: "Glasses", es: "Gafas" } },


  { name: "Hearing Aids", label: { en: "Hearing Aids", es: "Audífonos" } },
  { name: "Dentures", label: { en: "Dentures", es: "Dentadura" } },
  {
    name: "Change Clothes",
    label: { en: "Change Clothes", es: "Cambiar Ropa" },
  },
  {
    name: "Adjust Clothes",
    label: { en: "Adjust Clothes", es: "Ajustar Ropa" },
  },

  {
    name: "Change Underwear",
    label: { en: "Change Underwear", es: "Cambiar Ropa Interior" },
  },
  { name: "Need Socks", label: { en: "Need Socks", es: "Necesito Calcetines" } },

  { name: "Call Light", label: { en: "Call Light", es: "Luz de Llamada" } },
  { name: "Door", label: { en: "Door", es: "Puerta" } },
  {
    name: "Call Family",
    label: { en: "Call Family", es: "Llamar a la Familia" },
  },
  { name: "Please Leave", label: { en: "Please Leave", es: "Por Favor Salga" } },

  { name: "Open for Me", label: { en: "Open for Me", es: "Ábreme" } },

  {
    name: "Phone / Tablet",
    label: { en: "Phone / Tablet", es: "Teléfono / Tableta" },
  },

  {
    name: "Plug in Phone / Tablet",
    label: { en: "Plug in Phone / Tablet", es: "Cargar Teléfono / Tableta" },
  },

  { name: "Charge Hearing Aids", label: { en: "Charge Hearing Aids", es: "Cargar Audífonos" } },


  {
    name: "Inhaler / Breathing Treatment",
    label: {
      en: "Inhaler / Breathing Treatment",
      es: "Inhalador / Tratamiento Respiratorio",
    },
  },

  { name: "Suction", label: { en: "Suction", es: "Succión" } },
  { name: "Catheter", label: { en: "Catheter", es: "Catéter" } },
  { name: "Ostomy / Colostomy Bag", label: { en: "Ostomy / Colostomy Bag", es: "Bolsa de Ostomía / Colostomía" } },

  { name: "Blood Sugar", label: { en: "Blood Sugar", es: "Azúcar en Sangre" } },
  { name: "Blood Pressure", label: { en: "Blood Pressure", es: "Presión Arterial" } },

  { name: "Trach", label: { en: "Trach", es: "Traqueostomía" } },



  { name: "Feeding Tube", label: { en: "Feeding Tube", es: "Tubo de Alimentación" } },
  { name: "Helmet", label: { en: "Helmet", es: "Casco" } },



  {
    name: "Cervical Collar",
    label: { en: "Cervical Collar", es: "Collarín Cervical" },
  },
  { name: "Nurse", label: { en: "Nurse", es: "Enfermera" } },
  { name: "Doctor", label: { en: "Doctor", es: "Doctor" } },


  {
    name: "Nursing Aide",
    label: { en: "Nursing Aide", es: "Asistente de Enfermería" },
  },
  {
    name: "Speech Therapist",
    label: { en: "Speech Therapist", es: "Terapeuta del Habla" },
  },

  {
    name: "Occupational / Physical Therapist",
    label: {
      en: "Occupational / Physical Therapist",
      es: "Terapeuta Ocupacional / Físico",
    },
  },


  {
    name: "Respiratory Therapist",
    label: { en: "Respiratory Therapist", es: "Terapeuta Respiratorio" },
  },

  { name: "Something Else", label: { en: "Something Else", es: "Algo Más" } }
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
  const [apiData, setApiData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [concerns, setConcerns] = useState(null);
  const [needboard, setNeedboard] = useState(null);
  const [uncheckNeedBoard, setUncheckNeedBoard] = useState("");
  const [UncheckConcerns, setUncheckConcerns] = useState("");
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");

  const needsBoardAllItems = React.useMemo(() => {
    const combined = [...needsBoardList];

    apiData.forEach(apiItem => {
      if (!combined.some(item => item.name === apiItem.name)) {
        combined.push(apiItem);
      }
    });
    return combined;
  }, [apiData]);

  const currentList = name === "Needsboard" ? needsBoardAllItems : concernsList;
  const allKeys = currentList.map((c) => c.name);

  const [unCheckedValue, setUncheckedValue] = useState([]);
  const initializedRef = useRef({
    needsboard: false,
    concerns: false
  });

  const saveSettings = (checkedItems, uncheckedItems, isSaveClick = "") => {
    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    const isNeeds = name === "Needsboard";
    const value = isNeeds ? "need_board" : "concerns";
    const unCheckedKey = isNeeds ? "uncheck_need_board" : "uncheck_concerns";
    const concernsString = checkedItems.length > 0 ? checkedItems.join(",") : null;
    const uncheckedString = uncheckedItems.length > 0 ? uncheckedItems.join(",") : null;
    payload.append(value, concernsString);
    payload.append(unCheckedKey, uncheckedString);
    const oppositeKey = isNeeds ? "concerns" : "need_board";
    const oppositeUncheckKey = isNeeds ? "uncheck_concerns" : "uncheck_need_board";
    const oppositeData = isNeeds ? concerns : needboard;
    const oppositeUncheckData = isNeeds ? UncheckConcerns : uncheckNeedBoard;
    const oppositeDataString = oppositeData && oppositeData.length > 0 ? oppositeData : null;
    const oppositeUncheckDataString = oppositeUncheckData && oppositeUncheckData.length > 0 ? oppositeUncheckData : null;
    payload.append(oppositeKey, oppositeDataString || "");
    payload.append(oppositeUncheckKey, oppositeUncheckDataString || "");

    api
      .post("saveSettings", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        if (!data.status) {
          toast.error(data.msg, { autoClose: 1500 });
        }
        if (isSaveClick === "Save") {
          toast.success("Saved successfully! ", { autoClose: 1500 });
        }
      })
      .catch(() => toast.error("Something went wrong", { autoClose: 1500 }));
  };

  const handleConcernToggle = (key) => {
    setSelectedConcerns(prev => {
      let updatedConcerns;
      if (prev.includes(key)) {
        updatedConcerns = prev.filter((c) => c !== key);
      } else {
        updatedConcerns = [...prev, key];
      }

      const updatedUnchecked = allKeys.filter(item => !updatedConcerns.includes(item));
      setUncheckedValue(updatedUnchecked);
      return updatedConcerns;
    });
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
    saveSettings(selectedConcerns, unCheckedValue, "Save");
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
    Topicboard(setApiData);
  }, [licenses_id, token]);

  useEffect(() => {
    setSelectedConcerns([]);
    setUncheckedValue([]);
    initializedRef.current.needsboard = false;
    initializedRef.current.concerns = false;
  }, [name]);
  useEffect(() => {
    if (loader) return;

    const isNeeds = name === "Needsboard";
    const pageKey = isNeeds ? "needsboard" : "concerns";

    if (!initializedRef.current[pageKey]) {
      const checkedData = isNeeds ? needboard : concerns;
      const uncheckedData = isNeeds ? uncheckNeedBoard : UncheckConcerns;
      let checkedFromAPI = [];
      let uncheckedFromAPI = [];

      if (uncheckedData && uncheckedData.trim() !== "") {
        uncheckedFromAPI = uncheckedData.split(",").filter(Boolean);
        checkedFromAPI = allKeys.filter(name => !uncheckedFromAPI.includes(name));
      }
      else if (checkedData && checkedData.trim() !== "") {
        checkedFromAPI = checkedData.split(",").filter(Boolean);
        uncheckedFromAPI = allKeys.filter(name => !checkedFromAPI.includes(name));
      }
      else {
        checkedFromAPI = allKeys;
        uncheckedFromAPI = [];
      }

      setSelectedConcerns(checkedFromAPI);
      setUncheckedValue(uncheckedFromAPI);
      initializedRef.current[pageKey] = true;
    }
  }, [loader, concerns, needboard, uncheckNeedBoard, UncheckConcerns, name, allKeys]);

  const t = (key) => {
    const translations = {
      en: {
        save: "Save",
        icon: "Add Icon",
        selectAll: "Select All",
        deselectAll: "Deselect All",
      },
      es: {
        save: "Guardar",
        icon: "Agregar icono",
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
              <img src={BackArrow} alt="Back" />
            </div>
            <h2 className="text-[25px] font-normal text-black text-center">
              {selectedLanguage === "Spanish"
                ? `${name === "Needsboard" ? "Necesita Configuración De Tablero" : "Configuración De Preocupaciones"}`
                : `${name === "Needsboard" ? "Needs Board Settings" : "Concern Settings"}`
              }
            </h2>
            <button></button>
          </div>
          <div className="main-wrapper home-wrapper howoften-page">
            <div className="flex items-center justify-center p-4 setting-cards">
              <div className="w-full bg-gradient-to-b from-blue-50 to-white rounded-lg overflow-hidden">
                <div className="p-3 sm:p-4 md:p-6">
                  <div className="flex justify-between align-center">
                    <h1 className="text-xs text-gray-500 mb-0"></h1>
                    <div className="flex justify-between gap-2">
                      {name === "Needsboard" && (
                        <Link to={"/icon-upload"}>
                          <button
                            className="bg-[#00acdcc4] text-white px-4 py-2 rounded-md text-sm transition-colors border-b-2"
                          >
                            {t("icon")}
                          </button>
                        </Link>
                      )}
                      <button
                        className="bg-[#00acdcc4] text-white px-4 py-2 rounded-md text-sm transition-colors border-b-2"
                        onClick={handleSelectAll}
                      >
                        {t("selectAll")}
                      </button>
                      <button
                        className="bg-[#00acdcc4] text-white px-4 py-2 rounded-md text-sm transition-colors border-b-2"
                        onClick={handleDeselectAll}
                      >
                        {t("deselectAll")}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 py-6 px-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {currentList.map((c) => (
                        <CustomRoundCheckbox
                          key={`${c.name}-${c.id || ''}`} // Add unique key with id if available
                          value={c.name}
                          checked={selectedConcerns.includes(c.name)}
                          onChange={handleConcernToggle}
                          label={
                            selectedLanguage === "Spanish"
                              ? c?.label?.es || c?.name
                              : c?.label?.en || c?.name
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <div className="flex justify-center">
                      <button
                        className="bg-[#00acdcc4] text-white px-4 py-2 rounded-md text-sm transition-colors border-b-2"
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