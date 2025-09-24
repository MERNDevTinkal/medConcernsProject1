import { useState, useContext } from "react";
import hamburger from "../../../assets/images/bar.svg";
import NextArrow from "../../../assets/images/next-arrow.svg";
import { Link } from "react-router-dom";
import MenuIcon1 from "../../../assets/images/sidebar-icon-01.svg";
import MenuIcon2 from "../../../assets/images/sidebar-icon-02.svg";
import MenuIcon3 from "../../../assets/images/sidebar-icon-03.svg";
import MenuIcon4 from "../../../assets/images/sidebar-icon-04.svg";
import MenuIcon5 from "../../../assets/images/sidebar-icon-05.svg";
import MenuIcon6 from "../../../assets/images/sidebar-icon-06.svg";
import MenuIcon7 from "../../../assets/images/sidebar-icon-07.svg";
import MenuIcon8 from "../../../assets/images/sidebar-icon-08.svg";
import MenuIcon9 from "../../../assets/images/sidebar-icon-09.svg";
import MenuIcon10 from "../../../assets/images/sidebar-icon-10.svg";
import MenuIcon11 from "../../../assets/images/sidebar-icon-11.svg";
import MenuIcon12 from "../../../assets/images/sidebar-icon-12.svg";
import MenuIcon13 from "../../../assets/images/sidebar-icon-13.svg";
import MenuIcon15 from "../../../assets/images/sidebar-icon-15.svg";
import MenuIcon16 from "../../../assets/images/sidebar-icon-18.svg";
import MenuIcon17 from "../../../assets/images/sidebar-icon-20.svg";
import MenuIcon18 from "../../../assets/images/sidebar-icon-21.svg";
import MenuIcon19 from "../../../assets/images/sidebar-icon-22.svg";
import MenuIcon20 from "../../../assets/images/sidebar-icon-23.svg";
import MenuIcon21 from "../../../assets/images/sidebar-icon-25.svg";
import MenuIcon22 from "../../../assets/images/sidebar-icon-26.svg";
import MenuIcon23 from "../../../assets/images/sidebar-icon-27.svg";
import MenuIcon24 from "../../../assets/images/sidebar-icon-28.svg";
import MenuIcon25 from "../../../assets/images/sidebar-icon-30.svg";
import MenuIcon26 from "../../../assets/images/sidebar-icon-32.svg";
import MenuIcon27 from "../../../assets/images/sidebar-icon-33.svg";
import CloseIcon from "../../../assets/images/close2.svg";
import BackArrow from "../../../assets/images/back-arrow.svg";
import { GlobalContext } from "../../../context/DiseaseContext";
import { useNavigate, useLocation } from "react-router-dom";
const Header = ({ selectedLanguage, introductionOn, calendarOn, name }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { resetDiseases } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleSummery = () => resetDiseases();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("license_key");
  };
  const menuItems = [
    { icon: MenuIcon1, path: "/settings", en: "Settings", es: "Configuración" },
    {
      icon: MenuIcon2,
      path: "/patient-education",
      en: "Patient Education",
      es: "Educación del paciente",
    },
    {
      icon: MenuIcon3,
      path: "/introduction",
      en: "Introduction",
      es: "Introducción",
      hide: introductionOn,
    },
    {
      icon: MenuIcon4,
      path: "/how-are-you",
      en: "How are you?",
      es: "¿Cómo estás?",
    },
    { icon: MenuIcon5, path: "/concern", en: "Concerns", es: "Preocupaciones" },
    {
      icon: MenuIcon6,
      path: "/whiteboard",
      en: "White Board",
      es: "Pizarra blanca",
    },
    {
      icon: MenuIcon7,
      path: "/yes-no-concerns",
      en: "Yes / No / ? Board",
      es: "Sí / No / ? Pizarra",
    },
    {
      icon: MenuIcon8,
      path: "/board",
      en: "Needs Board",
      es: "Pizarra de necesidades",
    },
    {
      icon: MenuIcon9,
      path: "/topic-board",
      en: "Topic Board",
      es: "Pizarra de temas",
    },
    { icon: MenuIcon10, path: "/when", en: "When?", es: "¿Cuándo?" },
    {
      icon: MenuIcon11,
      path: "/howoften",
      en: "Calendar",
      es: "Calendario",
      hide: calendarOn,
    },
    {
      icon: MenuIcon12,
      path: "/noappetite-problem",
      en: "Appetite",
      es: "Apetito",
    },
    {
      icon: MenuIcon13,
      path: "/bowels-problem",
      en: "Bowel",
      es: "Intestinos",
    },
    {
      icon: MenuIcon5,
      path: "/breathing-problem",
      en: "Breathing / Coughing",
      es: "Respiración / Tos",
    },
    {
      icon: MenuIcon12,
      path: "/emotions",
      en: "Emotions / Feelings",
      es: "Emociones / Sentimientos",
    },
    { icon: MenuIcon15, path: "/fatigue-problem", en: "Fatigue", es: "Fatiga" },
    {
      icon: MenuIcon12,
      path: "/illness-problem",
      en: "Illness",
      es: "Enfermedad",
    },
    {
      icon: MenuIcon12,
      path: "/hearing-problem",
      en: "Hearing",
      es: "Audición",
    },
    {
      icon: MenuIcon16,
      path: "/medication-problem",
      en: "Medication",
      es: "Medicamentos",
    },
    {
      icon: MenuIcon12,
      path: "/illnessMucus-problem",
      en: "Mucus/Secretions",
      es: "Moco/Secreciones",
    },
    { icon: MenuIcon17, path: "/nausea-problem", en: "Nausea", es: "Náuseas" },
    {
      icon: MenuIcon18,
      path: "/pain-feel",
      en: "Pain Description",
      es: "Descripción del dolor",
    },
    {
      icon: MenuIcon19,
      path: "/feeling",
      en: "Pain Scale",
      es: "Escala del dolor",
    },
    {
      icon: MenuIcon20,
      path: "/male-body",
      en: "Pain Location",
      es: "Ubicación del dolor",
    },
    {
      icon: MenuIcon12,
      path: "/feeding-problem",
      en: "PEG",
      es: "Alimentación por sonda",
    },
    {
      icon: MenuIcon21,
      path: "/swallowing-problem",
      en: "Swallowing",
      es: "Deglución",
    },
    {
      icon: MenuIcon12,
      path: "/something-problem",
      en: "Something Happened",
      es: "Algo pasó",
    },
    {
      icon: MenuIcon22,
      path: "/trach-problem",
      en: "Trach",
      es: "Traqueotomía",
    },
    {
      icon: MenuIcon23,
      path: "/urination-problem",
      en: "Urination",
      es: "Orinación",
    },
    {
      icon: MenuIcon24,
      path: "/vision-problem",
      en: "Vision Problems",
      es: "Problemas de visión",
    },
    {
      icon: MenuIcon12,
      path: "/wound-problem",
      en: "Wound/Incision",
      es: "Herida/Incisión",
    },
    {
      icon: MenuIcon25,
      path: "/contact-us",
      en: "Contact Us",
      es: "Contáctenos",
    },
    {
      icon: MenuIcon6,
      path: "/white-board-list",
      en: "Saved Whiteboard",
      es: "Pizarra guardada",
    },
    {
      icon: MenuIcon26,
      path: "/summary-list",
      en: "Saved Summary",
      es: "Resumen guardado",
    },
    {
      icon: MenuIcon27,
      path: "/about-us",
      en: "About Us",
      es: "Sobre nosotros",
    },
    {
      icon: MenuIcon12,
      path: "#",
      en: "Logout",
      es: "Cerrar sesión",
      fun: handleLogout,
    },
  ];

  return (
    <>
      <header className="px-4 py-3 fixed left-0 right-0 top-0 bg-white main-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              onClick={() => {
                navigate(-1);
              }}
              src={BackArrow}
              alt="back"
            />
            <button type="button" onClick={toggleSidebar}>
              <img src={hamburger} alt="menu" />
            </button>
          </div>
          <h2 className="text-[25px] font-normal text-black">
            {name ??
              (selectedLanguage === "Spanish" ? "Preocupaciones" : "Concerns")}
          </h2>
          <div style={{ cursor: "pointer" }}>
            {location.pathname === "/introduction" && (
              <img
                src={NextArrow}
                alt="next"
                onClick={() => {
                  navigate("/how-are-you");
                }}
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside
          className={`sidebar fixed top-0 left-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 overflow-y-auto min-h-screen ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full rounded-tr-[10px] rounded-br-[10px]"
          }`}
        >
          <button
            className="close-btn absolute top-5 right-5"
            onClick={() => setIsSidebarOpen(false)}
          >
            <img src={CloseIcon} alt="close" />
          </button>
          <ul className="space-y-3">
            {menuItems.map(
              (item, index) =>
                !item.hide && (
                  <li
                    key={index}
                    onClick={handleSummery}
                    className={`text-[20px] font-normal flex items-center space-x-3 p-2 rounded-lg cursor-pointer
            ${
              location.pathname === item.path
                ? "bg-blue-100 text-blue-600 font-semibold" // Active styles
                : "text-black hover:bg-gray-100"
            }`}
                  >
                    <img src={item.icon} alt="" />
                    <Link to={item.path} onClick={item.fun}>
                      {selectedLanguage === "Spanish" ? item.es : item.en}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </aside>
      </header>
    </>
  );
};

export default Header;
