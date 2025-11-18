import { useState, useRef, useContext, useEffect } from "react";
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
import appetite from "../../../assets/images/no_appetite.png";
import IllnessImg from "../../../assets/images/Illness.png";
import hearingImg from "../../../assets/images/hearing.png";
import thickmucusImg from "../../../assets/images/thick-mucus.png";
import PEGImg from "../../../assets/images/PEG-pain.png";
import somethinghappenedImg from "../../../assets/images/something-happened.png";
import woundImg from "../../../assets/images/wound.png";
import logoutImg from "../../../assets/images/logout.png";
import EmotionsImg2 from "../../../assets/images/emotion-img-02.png";
import { GlobalContext } from "../../../context/DiseaseContext";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutPopup from "../../../Component/logoutPop/logoutPop";
import icon03 from "../../../assets/images/link-icon-03.svg";
import gifLoader from "../../../assets/loaderGif/Spinner.gif"
const Header = ({ selectedLanguage, introductionOn, calendarOn, name }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
console.log("===>",)
  const { resetDiseases } = useContext(GlobalContext);
  const location = useLocation();
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleSummary = () => resetDiseases();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("license_key");
    window.location.href = "/";
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [name]);
  const menuItems = [
    { icon: MenuIcon1 ? MenuIcon1 : gifLoader, path: "/settings", en: "Settings", es: "Configuración", fun: () => toggleSidebar },
    {
      icon: MenuIcon2 ? MenuIcon2 : gifLoader,
      path: "/patient-education",
      en: "Patient Education",
      es: "Educación del paciente",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon3 ? MenuIcon3 : gifLoader,
      path: "/introduction",
      en: "Introduction",
      es: "Introducción",
      // hide: introductionOn,
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon4 ? MenuIcon4 : gifLoader,
      path: "/how-are-you",
      en: "How are you?",
      es: "¿Cómo estás?",
      // hide: introductionOn,
      fun: () => toggleSidebar
    },
    { icon: icon03 ? icon03 : gifLoader, path: "/concern", en: "Concerns", es: "Preocupaciones", fun: () => toggleSidebar },
    {
      icon: MenuIcon6 ? MenuIcon6 : gifLoader,
      path: "/whiteboard",
      en: "White Board",
      es: "Pizarra blanca",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon7 ? MenuIcon7 : gifLoader,
      path: "/yes-no-concerns",
      en: "Yes / No / ? Board",
      es: "Sí / No / ? Pizarra",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon8 ? MenuIcon8 : gifLoader,
      path: "/board",
      en: "Needs Board",
      es: "Pizarra de necesidades",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon9 ? MenuIcon9 : gifLoader,
      path: "/topic-board",
      en: "Topic Board",
      es: "Pizarra de temas",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon10 ? MenuIcon10 : gifLoader, path: "/when", en: "When?", es: "¿Cuándo?",
      fun: () => toggleSidebar
      // hide: calendarOn, 
    },
    {
      icon: MenuIcon11 ? MenuIcon11 : gifLoader,
      path: "/howoften",
      en: "Calendar",
      es: "Calendario",
      fun: () => toggleSidebar
      // hide: calendarOn,
    },
    {
      icon: appetite ? appetite : gifLoader,
      path: "/noappetite-problem",
      en: "Appetite",
      es: "Apetito",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon13 ? MenuIcon13 : gifLoader,
      path: "/bowels-problem",
      en: "Bowel",
      es: "Intestinos",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon5 ? MenuIcon5 : gifLoader,
      path: "/breathing-problem",
      en: "Breathing / Coughing",
      es: "Respiración / Tos",
      fun: () => toggleSidebar
    },
    {
      icon: EmotionsImg2 ? EmotionsImg2 : gifLoader,
      path: "/emotions",
      en: "Emotions / Feelings",
      es: "Emociones / Sentimientos",
      fun: () => toggleSidebar
    },
    { icon: MenuIcon15 ? MenuIcon15 : gifLoader, path: "/fatigue-problem", en: "Fatigue", es: "Fatiga", fun: () => toggleSidebar },
    {
      icon: IllnessImg ? IllnessImg : gifLoader,
      path: "/illness-problem",
      en: "Illness",
      es: "Enfermedad",
      fun: () => toggleSidebar
    },
    {
      icon: hearingImg ? hearingImg : gifLoader,
      path: "/hearing-problem",
      en: "Hearing",
      es: "Audición",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon16 ? MenuIcon16 : gifLoader,
      path: "/medication-problem",
      en: "Medication",
      es: "Medicamentos",
      fun: () => toggleSidebar
    },
    {
      icon: thickmucusImg ? thickmucusImg : gifLoader,
      path: "/illnessMucus-problem",
      en: "Mucus/Secretions",
      es: "Moco/Secreciones",
      fun: () => toggleSidebar
    },
    { icon: MenuIcon17 ? MenuIcon17 : gifLoader, path: "/nausea-problem", en: "Nausea", es: "Náuseas" },
    {
      icon: MenuIcon18 ? MenuIcon18 : gifLoader,
      path: "/pain-feel",
      en: "Pain Description",
      es: "Descripción del dolor",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon19 ? MenuIcon19 : gifLoader,
      path: "/feeling",
      en: "Pain Scale",
      es: "Escala del dolor",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon20 ? MenuIcon20 : gifLoader,
      path: "/pain-concern",
      en: "Pain Location",
      es: "Ubicación del dolor",
      fun: () => toggleSidebar
    },
    {
      icon: PEGImg ? PEGImg : gifLoader,
      path: "/feeding-problem",
      en: "Feeding Tube",
      es: "Alimentación por sonda",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon21 ? MenuIcon21 : gifLoader,
      path: "/swallowing-problem",
      en: "Swallowing",
      es: "Deglución",
      fun: () => toggleSidebar
    },
    {
      icon: somethinghappenedImg ? somethinghappenedImg : gifLoader,
      path: "/something-problem",
      en: "Something Happened",
      es: "Algo pasó",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon22 ? MenuIcon22 : gifLoader,
      path: "/trach-problem",
      en: "Trach",
      es: "Traqueotomía",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon23 ? MenuIcon23 : gifLoader,
      path: "/urination-problem",
      en: "Urination",
      es: "Orinación",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon24 ? MenuIcon24 : gifLoader,
      path: "/vision-problem",
      en: "Vision Problems",
      es: "Problemas de visión",
      fun: () => toggleSidebar
    },
    {
      icon: woundImg ? woundImg : gifLoader,
      path: "/wound-problem",
      en: "Wound/Incision",
      es: "Herida/Incisión",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon25 ? MenuIcon25 : gifLoader,
      path: "/contact-us",
      en: "Contact Us",
      es: "Contáctenos",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon6 ? MenuIcon6 : gifLoader,
      path: "/white-board-list",
      en: "Saved Whiteboard",
      es: "Pizarra guardada",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon26 ? MenuIcon26 : gifLoader,
      path: "/summary-list",
      en: "Saved Summary",
      es: "Resumen guardado",
      fun: () => toggleSidebar
    },
    {
      icon: MenuIcon27 ? MenuIcon27 : gifLoader,
      path: "/about-us",
      en: "About Us",
      es: "Sobre nosotros",
      fun: () => toggleSidebar
    },
    {
      icon: logoutImg ? logoutImg : gifLoader,
      path: "#",
      en: "Logout",
      es: "Cerrar sesión",
      fun: () => setOpenPopup(true),
    },
  ];
  return (
    <>
      <LogoutPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
        onConfirm={handleLogout}
      />
      <div className="main-header-top bg-[#dceaf7] fixed left-0 right-0 top-0 z-10">
        <header className="px-4 py-3  main-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {location.pathname !== "/introduction" && (
                <img
                  onClick={() => {
                    navigate(-1);
                  }}
                  src={BackArrow}
                  alt="back"
                />
              )}

              <button type="button" onClick={toggleSidebar}>
                <img src={hamburger} alt="menu" />
              </button>
            </div>
            <h2 className="Header-text text-[25px] font-normal text-black">
              {name ??
                (selectedLanguage === "Spanish"
                  ? "Preocupaciones"
                  : "Concerns")}
            </h2>
            <div style={{ cursor: "pointer" }}>
              {(location.pathname === "/introduction" ||
                location.pathname === "/howoften" ||
                location.pathname === "/new-problem" || location.pathname === "/emotions" || location.pathname === "/feeling-body") && (
                  <div className="flex items-center gap-2 justify-end cursor-pointer">
                    <h6>Skip</h6>
                    <img
                      src={NextArrow}
                      alt="next"
                      onClick={() => {
                        navigate(
                          location.pathname === "/feeling-body" ? "/summary" :
                            location.pathname === "/emotions" ? "/feelOptions/1" :
                              location.pathname === "/howoften"
                                ? "/new-problem"
                                : location.pathname === "/new-problem"
                                  ? "/summary"
                                  : introductionOn ? "/concern" : "/how-are-you"
                        );
                      }}
                    />
                  </div>


                )}
            </div>
          </div>

          {/* Sidebar */}
          <aside
            className={`sidebar fixed top-0 left-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 overflow-y-auto min-h-screen ${isSidebarOpen
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
                      onClick={handleSummary}
                      className={`text-[20px] font-normal flex items-center space-x-3 p-2 rounded-lg cursor-pointer
            ${location.pathname === item.path
                          ? "bg-blue-100 text-blue-600 font-semibold" // Active styles
                          : "text-black hover:bg-gray-100"
                        }`}
                    >
                      <img className="header-img" src={item.icon} alt="" />
                      <Link to={item.path} onClick={item.fun}>
                        {selectedLanguage === "Spanish" ? item.es : item.en}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </aside>
        </header>
      </div>
    </>
  );
};

export default Header;
