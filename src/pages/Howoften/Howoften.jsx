import React, { useState, useContext, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/DiseaseContext";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";

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
      strokeWidth="2"
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
  const location = useLocation();
  const pathprimary = location.pathname;
  const navigate = useNavigate();
  const { updateDisease } = useContext(GlobalContext);

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
      () => {},
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader
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

  const handleDaySelect = async (item) => {
    setSelectedDayItem(item);
    const text =
      selectedLanguage === "Spanish"
        ? item === "morning"
          ? "mañana"
          : item === "afternoon"
          ? "tarde"
          : "noche"
        : item;
    await getTextToSpeech(text, selectedLanguage === "Spanish" ? "es-ES" : "");
    updateDisease(pathprimary.replace("/", ""), { type: "day", value: text });
    navigate("/new-problem");
  };

  const handleWeekSelect = async (index) => {
    setSelectedWeekDay(index);
    const text = currentWeekDays[index];
    await getTextToSpeech(text, selectedLanguage === "Spanish" ? "es-ES" : "");
    updateDisease(pathprimary.replace("/", ""), {
      type: "week",
      value: text,
    });
    navigate("/new-problem");
  };

  const handleMonthSelect = async (index) => {
    setSelectedMonth(index);
    const text = currentMonths[index];
    await getTextToSpeech(text, selectedLanguage === "Spanish" ? "es-ES" : "");
    updateDisease(pathprimary.replace("/", ""), {
      type: "month",
      value: text,
    });
    navigate("/new-problem");
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper howoften-page ">
          <div className="w-full flex justify-center items-center p-4 sm:p-6 calendar-main">
            <div className="w-full bg-white rounded-xl overflow-hidden">
              {/* Tabs */}
              <div className="flex items-center justify-end p-4 sm:p-6 calendar-buttons">
                <button className="px-4 py-2 mr-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
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
                    }}
                    role="tab"
                    aria-selected={activeTab === "day"}
                  >
                    {selectedLanguage === "Spanish" ? "HOY" : "TODAY"}
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
                    }}
                    role="tab"
                    aria-selected={activeTab === "month"}
                  >
                    {selectedLanguage === "Spanish" ? "MES" : "MONTH"}
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 pt-0">
                {/* Day Tab */}
                {activeTab === "day" && (
                  <div className="grid gap-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
                      {selectedLanguage === "Spanish" ? "HOY" : "TODAY"}
                    </h3>
                    <div className="grid grid-cols-3 border-t border-l border-gray-200 rounded-lg overflow-hidden">
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
                          className={`flex items-center justify-center p-4 sm:p-6 border-b border-r border-gray-200 cursor-pointer transition-all duration-200
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
                            <Check className="w-15 h-15 text-green-500 check-mark" />
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
      )}
      <Footer />
    </>
  );
}
