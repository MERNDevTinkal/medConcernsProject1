import React, { useState, useContext, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
import { IdontknowImg } from "../../Component/DiseasesData/images";
import MenuIcon11 from "../../assets/images/sidebar-icon-11.svg";
import {
  WeekEnglishMale,
  AbrilAprilSpanishMale,
  AgostoAugustSpanishMale,
  DiciembreDecemberSpanishMale,
  DomingoSundaySpanishMale,
  EneroJanuarySpanishMale,
  FebreroFebruarySpanishMale,
  HoyTodaySpanishMale,
  JuevesThursdaySpanishMale,
  JulioJulySpanishMale,
  JunioJuneSpanishMale,
  LunesMondaySpanishMale,
  MartesTuesdaySpanishMale,
  MarzoMarchSpanishMale,
  MayoMaySpanishMale,
  MiercolesSpanishMale,
  MonthEnglishMale,
  NocheTempranoEveningMale,
  NoviembreSpanishMale,
  NowSpanishMale,
  OctubreSpanishMale,
  SabadoSaturdaySpanishMale,
  SeptiembreSeptemberSpanishMale,
  TardeAfternoonSpanishMale,
  TodayEnglishMale,
  ViernesFridaySpanishMale,
  MorningMale,
  AfternoonMale,
  AprilMale,
  AugustMale,
  DecemberMale,
  EveningMale,
  FebruaryMale,
  FridayMale,
  JanuaryMale,
  JulyMale,
  JuneMale,
  MarchMale,
  MayMale,
  MondayMale,
  NovemberMale,
  NowMale,
  OctoberMale,
  SaturdayMale,
  SeptemberMale,
  SundayMale,
  ThursdayMale,
  TodayMale,
  TuesdayMale,
  WednesdayMale,
  WeekMale,
  EveningFemale,
  AfternoonFemale,
  AprilFemale,
  AugustFemale,
  DecemberFemale,
  FebruaryFemale,
  FridayFemale,
  JanuaryFemale,
  JulyFemale,
  JuneFemale,
  MarchFemale,
  MayFemale,
  MondayFemale,
  MonthFemale,
  MorningFemale,
  NovemberFemale,
  NowFemale,
  OctoberFemale,
  SaturdayFemale,
  SeptemberFemale,
  SundayFemale,
  ThursdayFemale,
  TodayFemale,
  TuesdayFemale,
  WednesdayFemale,
  WeekFemale,
  AbrilAprilSpanishFemale,
  AgostoAugustSpanishFemale,
  AhoraNowSpanishFemale,
  DiciembreDecemberSpanishFemale,
  DomingoSundaySpanishFemale,
  EneroJanuarySpanishFemale,
  FebreroFebruarySpanishFemale,
  HoyTodaySpanishFemale,
  JuevesThursdaySpanishFemale,
  JulioJulySpanishFemale,
  JunioJuneSpanishFemale,
  LunesMondaySpanishFemale,
  MananaMorningSpanishFemale,
  MartesTuesdaySpanishFemale,
  MarzoMarchSpanishFemale,
  MayoMaySpanishFemale,
  MesMonthSpanishFemale,
  MiercolesSpanishFemale,
  NocheTempranoEveningSpanishFemale,
  NoviembreSpanishFemale,
  OctubreSpanishFemale,
  SabadoSaturdaySpanishFemale,
  SemanaWeekSpanishFemale,
  SeptiembreSeptemberSpanishFemale,
  TardeAfternoonSpanishFemale,
  ViernesFridaySpanishFemale,
  iDontKnowFemale,
  IDontKnowMale,
  NoSeSpanishMale,
  NoSeIDontKnowSpanishFemale,
} from "../../Component/DiseasesData/audio";

function Howoften({ monthName, isSelected }) {
  const iconColor = isSelected ? "#0088dc" : "currentColor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="127"
      height="127"
      viewBox="0 0 24 24"
      fill="none"
      stroke={iconColor}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-calendar-days"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="5"
        strokeWidth="0.6"
      >
        {monthName}
      </text>
    </svg>
  );
}

export default function TabsCalendar() {
  const [activeTab, setActiveTab] = useState("day"); // 'day', 'week', 'month'
  const [selectedDayItem, setSelectedDayItem] = useState("");
  const [selectedWeekDay, setSelectedWeekDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [loader, setLoader] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  const location = useLocation();
  const { pathValue } = location.state ?? {};
  const pathprimary = location.pathname;
  const navigate = useNavigate();
  const { updateDisease, addOrUpdateSummary } = useContext(GlobalContext);

  // Week abbreviations
  const daysOfWeek = ["S", "M", "T", "W", "TH", "F", "S"];
  const daysOfWeekSpanish = ["D", "L", "M", "X", "J", "V", "S"];

  // Full week names
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDaysSpanish = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  // Month abbreviations
  const monthsOfYear = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const monthsOfYearSpanish = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];

  // Full month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthsSpanish = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  useEffect(() => {
    getSetting(
      () => {},
      setSelectedGender,
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader,
      () => {},
      () => {},
      () => {},
      () => {}
    );
  }, []);

  // ✅ Language aware mappings
  const currentDaysOfWeek =
    selectedLanguage === "Spanish" ? daysOfWeekSpanish : daysOfWeek;
  const currentWeekDays =
    selectedLanguage === "Spanish" ? weekDaysSpanish : weekDays;
  const currentMonthsOfYear =
    selectedLanguage === "Spanish" ? monthsOfYearSpanish : monthsOfYear;
  const currentMonths = selectedLanguage === "Spanish" ? monthsSpanish : months;

  // Audio mappings with gender support
  const getDayAudio = (item) => {
    if (selectedLanguage === "Spanish") {
      if (selectedGender === "Female") {
        switch (item) {
          case "morning":
            return MananaMorningSpanishFemale;
          case "afternoon":
            return TardeAfternoonSpanishFemale;
          case "evening":
            return NocheTempranoEveningSpanishFemale;
          default:
            return null;
        }
      } else {
        switch (item) {
          case "morning":
            return MorningMale;
          case "afternoon":
            return TardeAfternoonSpanishMale;
          case "evening":
            return NocheTempranoEveningMale;
          default:
            return null;
        }
      }
    } else {
      if (selectedGender === "Female") {
        switch (item) {
          case "morning":
            return MorningFemale;
          case "afternoon":
            return AfternoonFemale;
          case "evening":
            return EveningFemale;
          default:
            return null;
        }
      } else {
        switch (item) {
          case "morning":
            return MorningMale;
          case "afternoon":
            return AfternoonMale;
          case "evening":
            return EveningMale;
          default:
            return null;
        }
      }
    }
  };

  const getWeekAudio = (index) => {
    if (selectedLanguage === "Spanish") {
      if (selectedGender === "Female") {
        const spanishWeekAudiosFemale = [
          DomingoSundaySpanishFemale,
          LunesMondaySpanishFemale,
          MartesTuesdaySpanishFemale,
          MiercolesSpanishFemale,
          JuevesThursdaySpanishFemale,
          ViernesFridaySpanishFemale,
          SabadoSaturdaySpanishFemale,
        ];
        return spanishWeekAudiosFemale[index];
      } else {
        const spanishWeekAudiosMale = [
          DomingoSundaySpanishMale,
          LunesMondaySpanishMale,
          MartesTuesdaySpanishMale,
          MiercolesSpanishMale,
          JuevesThursdaySpanishMale,
          ViernesFridaySpanishMale,
          SabadoSaturdaySpanishMale,
        ];
        return spanishWeekAudiosMale[index];
      }
    } else {
      if (selectedGender === "Female") {
        const englishWeekAudiosFemale = [
          SundayFemale,
          MondayFemale,
          TuesdayFemale,
          WednesdayFemale,
          ThursdayFemale,
          FridayFemale,
          SaturdayFemale,
        ];
        return englishWeekAudiosFemale[index];
      } else {
        const englishWeekAudiosMale = [
          SundayMale,
          MondayMale,
          TuesdayMale,
          WednesdayMale,
          ThursdayMale,
          FridayMale,
          SaturdayMale,
        ];
        return englishWeekAudiosMale[index];
      }
    }
  };

  const getMonthAudio = (index) => {
    if (selectedLanguage === "Spanish") {
      if (selectedGender === "Female") {
        const spanishMonthAudiosFemale = [
          EneroJanuarySpanishFemale,
          FebreroFebruarySpanishFemale,
          MarzoMarchSpanishFemale,
          AbrilAprilSpanishFemale,
          MayoMaySpanishFemale,
          JunioJuneSpanishFemale,
          JulioJulySpanishFemale,
          AgostoAugustSpanishFemale,
          SeptiembreSeptemberSpanishFemale,
          OctubreSpanishFemale,
          NoviembreSpanishFemale,
          DiciembreDecemberSpanishFemale,
        ];
        return spanishMonthAudiosFemale[index];
      } else {
        const spanishMonthAudiosMale = [
          EneroJanuarySpanishMale,
          FebreroFebruarySpanishMale,
          MarzoMarchSpanishMale,
          AbrilAprilSpanishMale,
          MayoMaySpanishMale,
          JunioJuneSpanishMale,
          JulioJulySpanishMale,
          AgostoAugustSpanishMale,
          SeptiembreSeptemberSpanishMale,
          OctubreSpanishMale,
          NoviembreSpanishMale,
          DiciembreDecemberSpanishMale,
        ];
        return spanishMonthAudiosMale[index];
      }
    } else {
      if (selectedGender === "Female") {
        const englishMonthAudiosFemale = [
          JanuaryFemale,
          FebruaryFemale,
          MarchFemale,
          AprilFemale,
          MayFemale,
          JuneFemale,
          JulyFemale,
          AugustFemale,
          SeptemberFemale,
          OctoberFemale,
          NovemberFemale,
          DecemberFemale,
        ];
        return englishMonthAudiosFemale[index];
      } else {
        const englishMonthAudiosMale = [
          JanuaryMale,
          FebruaryMale,
          MarchMale,
          AprilMale,
          MayMale,
          JuneMale,
          JulyMale,
          AugustMale,
          SeptemberMale,
          OctoberMale,
          NovemberMale,
          DecemberMale,
        ];
        return englishMonthAudiosMale[index];
      }
    }
  };

  const getTabAudio = (tabName) => {
    if (selectedLanguage === "Spanish") {
      if (selectedGender === "Female") {
        switch (tabName) {
          case "day":
            return HoyTodaySpanishFemale;
          case "week":
            return SemanaWeekSpanishFemale;
          case "month":
            return MesMonthSpanishFemale;
          case "now":
            return AhoraNowSpanishFemale;
          default:
            return null;
        }
      } else {
        switch (tabName) {
          case "day":
            return HoyTodaySpanishMale;
          case "week":
            return WeekEnglishMale;
          case "month":
            return MonthEnglishMale;
          case "now":
            return NowSpanishMale;
          default:
            return null;
        }
      }
    } else {
      if (selectedGender === "Female") {
        switch (tabName) {
          case "day":
            return TodayFemale;
          case "week":
            return WeekFemale;
          case "month":
            return MonthFemale;
          case "now":
            return NowFemale;
          default:
            return null;
        }
      } else {
        switch (tabName) {
          case "day":
            return TodayMale;
          case "week":
            return WeekMale;
          case "month":
            return MonthEnglishMale;
          case "now":
            return NowMale;
          default:
            return null;
        }
      }
    }
  };

  const handleNowSelect = async () => {
    const text = selectedLanguage === "Spanish" ? "Ahora" : "Now";
    const audioFile = getTabAudio("now");

    await getTextToSpeech(
      text,
      selectedLanguage === "Spanish" ? "es-ES" : "",
      audioFile
    );

    addOrUpdateSummary(pathprimary.replace("/", ""), [
      {
        image: MenuIcon11,
        type: "now",
        value: text,
        name: `${selectedLanguage === "Spanish" ? "Ahora" : "Now"}`,
      },
    ]);
    navigate(pathValue === "noNewProblem" ? "/summary" : "/new-problem");
  };

  const handleTabSelect = async (tabName) => {
    let text = "";
    switch (tabName) {
      case "day":
        text = selectedLanguage === "Spanish" ? "Hoy" : "Today";
        break;
      case "week":
        text = selectedLanguage === "Spanish" ? "Semana" : "Week";
        break;
      case "month":
        text = selectedLanguage === "Spanish" ? "Mes" : "Month";
        break;
      default:
        return;
    }

    const audioFile = getTabAudio(tabName);
    await getTextToSpeech(
      text,
      selectedLanguage === "Spanish" ? "es-ES" : "",
      audioFile
    );
  };

  const handleDaySelect = async (item) => {
    setSelectedDayItem(item);
    const text =
      selectedLanguage === "Spanish"
        ? item === "morning"
          ? "Mañana"
          : item === "afternoon"
          ? "Tarde"
          : "Noche Temprano"
        : item.charAt(0).toUpperCase() + item.slice(1);

    const audioFile = getDayAudio(item);
    await getTextToSpeech(
      text,
      selectedLanguage === "Spanish" ? "es-ES" : "",
      audioFile
    );
    addOrUpdateSummary(pathprimary.replace("/", ""), [
      {
        image: MenuIcon11,
        type: "day",
        value: text,
        name: `${selectedLanguage === "Spanish" ? "Día" : "Day"}: ${text}`,
      },
    ]);
    navigate(pathValue === "noNewProblem" ? "/summary" : "/new-problem");
  };

  const handleWeekSelect = async (index) => {
    setSelectedWeekDay(index);
    const text = currentWeekDays[index];
    const audioFile = getWeekAudio(index);
    await getTextToSpeech(
      text,
      selectedLanguage === "Spanish" ? "es-ES" : "",
      audioFile
    );
    addOrUpdateSummary(pathprimary.replace("/", ""), [
      {
        image: MenuIcon11,
        type: "week",
        value: text,
        name: `${selectedLanguage === "Spanish" ? "Semana" : "Week"}: ${text}`,
      },
    ]);
    navigate(pathValue === "noNewProblem" ? "/summary" : "/new-problem");
  };

  const handleMonthSelect = async (index) => {
    setSelectedMonth(index);
    const text = currentMonths[index];
    const audioFile = getMonthAudio(index);
    await getTextToSpeech(
      text,
      selectedLanguage === "Spanish" ? "es-ES" : "",
      audioFile
    );

    addOrUpdateSummary(pathprimary.replace("/", ""), [
      {
        image: MenuIcon11,
        type: "month",
        value: text,
        name: `${selectedLanguage === "Spanish" ? "Mes" : "Month"}: ${text}`,
      },
    ]);
    navigate(pathValue === "noNewProblem" ? "/summary" : "/new-problem");
  };

  // const getSkip = async (text) => {
  //   await getTextToSpeech(
  //     text,
  //     selectedLanguage === "Spanish" ? "es-ES" : "",
  //     selectedLanguage === "" && selectedGender === ""
  //       ? IDontKnowMale
  //       : selectedLanguage === "Spanish" && selectedGender === "Male"
  //       ? NoSeSpanishMale
  //       : selectedLanguage === "Spanish" && selectedGender === "Female"
  //       ? NoSeIDontKnowSpanishFemale
  //       : selectedLanguage === "" && selectedGender === "Female"
  //       ? iDontKnowFemale
  //       : selectedLanguage === "" && selectedGender === "Male"
  //       ? IDontKnowMale
  //       : selectedLanguage === "English" && selectedGender === "Male"
  //       ? IDontKnowMale
  //       : selectedLanguage === "English" && selectedGender === "Female"
  //       ? iDontKnowFemale
  //       : IDontKnowMale
  //   );

  //   navigate("/new-problem");
  // };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            name={
              selectedLanguage === "Spanish"
                ? "¿Cómo empezó?"
                : "When did it start?"
            }
          />
          <div className="main-wrapper home-wrapper howoften-page mt-6 ">
            <div className="w-full flex justify-center items-center p-4 sm:p-6 calendar-main">
              <div className="w-full bg-white rounded-xl overflow-hidden">
                {/* Tabs */}
                <div className="flex items-center justify-end p-4 sm:p-6 calendar-buttons">
                  <button
                    className="px-4 py-2 mr-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={handleNowSelect}
                  >
                    {selectedLanguage === "Spanish" ? "Ahora" : "Now"}
                  </button>
                  <div
                    className="flex rounded-full bg-gray-100 p-1"
                    role="tablist"
                  >
                    <button
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                        ${
                          activeTab === "day"
                            ? "bg-blue-theme text-white"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                      onClick={() => {
                        setActiveTab("day");
                        setSelectedWeekDay(null);
                        setSelectedMonth(null);
                        handleTabSelect("day");
                      }}
                      role="tab"
                      aria-selected={activeTab === "day"}
                    >
                      {selectedLanguage === "Spanish" ? "Hoy" : "TODAY"}
                    </button>
                    <button
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                        ${
                          activeTab === "week"
                            ? "bg-blue-theme text-white"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                      onClick={() => {
                        setActiveTab("week");
                        setSelectedDayItem(null);
                        setSelectedMonth(null);
                        handleTabSelect("week");
                      }}
                      role="tab"
                      aria-selected={activeTab === "week"}
                    >
                      {selectedLanguage === "Spanish" ? "SEMANA" : "WEEK"}
                    </button>
                    <button
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                        ${
                          activeTab === "month"
                            ? "bg-blue-theme text-white"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                      onClick={() => {
                        setActiveTab("month");
                        setSelectedDayItem(null);
                        setSelectedWeekDay(null);
                        handleTabSelect("month");
                      }}
                      role="tab"
                      aria-selected={activeTab === "month"}
                    >
                      {selectedLanguage === "Spanish" ? "MES" : "MONTH"}
                    </button>
                  </div>
                  {/* <div
                    className="mx-3 cursor-pointer"
                    onClick={() => {
                      getSkip("I Don't Know");
                    }}
                  >
                    {" "}
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={IdontknowImg}
                      alt="icon"
                    />
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 pt-0">
                  {/* Day Tab */}
                  {activeTab === "day" && (
                    <div className="grid gap-4 ">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
                        {selectedLanguage === "Spanish" ? "HOY" : "TODAY"}
                      </h3>
                      <div className="grid grid-cols-3 border border-gray-200 rounded-lg overflow-hidden ">
                        {(selectedLanguage === "Spanish"
                          ? ["MAÑANA", "TARDE", "NOCHE"]
                          : ["MORNING", "AFTERNOON", "EVENING"]
                        ).map((label) => (
                          <div
                            key={label}
                            className="flex items-center justify-center p-4 sm:p-6 border-b border-r border-gray-200 bg-white"
                          >
                            <span className="font-bold text-[40px] sm:text-xl text-gray-800">
                              {label}
                            </span>
                          </div>
                        ))}
                        {["morning", "afternoon", "evening"].map((item) => (
                          <button
                            key={item}
                            className={`flex items-center justify-center p-4 sm:p-6 border-r border-gray-200 cursor-pointer transition-all duration-200
                          ${
                            selectedDayItem === item
                              ? "bg-blue-50"
                              : "bg-white hover:bg-gray-50"
                          }`}
                            onClick={() => handleDaySelect(item)}
                            role="option"
                            aria-selected={selectedDayItem === item}
                          >
                            {selectedDayItem === item && (
                              <Check className="w-10 h-10 text-green-500 check-mark" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Week Tab */}
                  {activeTab === "week" && (
                    <div className="grid gap-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
                        {selectedLanguage === "Spanish" ? "SEMANA" : "WEEK"}
                      </h3>
                      <div className="grid grid-cols-7 border-t border-l border-gray-200 rounded-lg overflow-hidden">
                        {currentDaysOfWeek.map((dayName, index) => (
                          <div
                            key={dayName + index}
                            className="flex items-center justify-center p-3 sm:p-4 border-b border-r border-gray-200 bg-white"
                          >
                            <span className="font-bold text-[24px] text-gray-800">
                              {dayName}
                            </span>
                          </div>
                        ))}
                        {currentDaysOfWeek.map((dayName, index) => (
                          <button
                            key={dayName + index + "-check"}
                            className={`flex items-center justify-center p-3 sm:p-4 border-b border-r border-gray-200 cursor-pointer transition-all duration-200
                          ${
                            selectedWeekDay === index
                              ? "bg-blue-50"
                              : "bg-white hover:bg-gray-50"
                          }`}
                            onClick={() => handleWeekSelect(index)}
                            role="option"
                            aria-selected={selectedWeekDay === index}
                          >
                            {selectedWeekDay === index && (
                              <Check className="w-15 h-15 text-green-500 check-mark" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Month Tab */}
                  {activeTab === "month" && (
                    <div className="grid gap-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
                        {selectedLanguage === "Spanish" ? "MES" : "MONTH"}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {currentMonthsOfYear.map((month, index) => (
                          <button
                            key={month}
                            className={`flex flex-col items-center justify-center p-0 rounded-lg cursor-pointer transition-all duration-200
                          ${selectedMonth === index ? "text-blue" : ""}`}
                            onClick={() => handleMonthSelect(index)}
                            role="option"
                            aria-selected={selectedMonth === index}
                          >
                            <Howoften
                              monthName={month}
                              isSelected={selectedMonth === index}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
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
