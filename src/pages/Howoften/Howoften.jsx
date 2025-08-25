import React, { useState, useEffect, useContext } from "react";
import { ArrowLeft, Check } from "lucide-react"; // Removed Calendar icon as we'll use a custom SVG
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate } from "react-router-dom"
import { GlobalContext } from "../../context/DiseaseContext";

// Custom Calendar Icon with Month Name inside
function Howoften({ monthName, isSelected }) {
  const iconColor = isSelected ? "#0088dc" : "currentColor"; // currentColor will pick up text-gray-800
  const textColor = isSelected ? "#0088dc" : "black";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="127" // Increased size to better fit text
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
        y="16" // Adjust Y to center vertically
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="5" // Adjust font size to fit
        strokeWidth="0.6"
      >
        {monthName}
      </text>
    </svg>
  );
}

export default function TabsCalendar() {
  const [activeTab, setActiveTab] = useState("day"); // 'day', 'week', 'month'
  const [selectedDayItem, setSelectedDayItem] = useState("morning"); // 'morning', 'afternoon', 'evening'
  const [selectedWeekDay, setSelectedWeekDay] = useState(1); // 0-6 for S-S, 1 for Monday as per image
  const [selectedMonth, setSelectedMonth] = useState(0); // 0-11 for JAN-DEC, 0 for January as per image

  const daysOfWeek = ["S", "M", "T", "W", "TH", "F", "S"];
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

  const navigate = useNavigate();
  const { updateDisease } = useContext(GlobalContext);
  useEffect(() => {
    let payload = null;
    if (activeTab === "day") {
      payload = { type: "day", value: selectedDayItem };
    } else if (activeTab === "week") {
      payload = { type: "week", value: selectedWeekDay };
    } else if (activeTab === "month") {
      payload = { type: "month", value: selectedMonth };
    }
    if (payload) {
      updateDisease("Howoften", payload);
    }
  }, [activeTab, selectedDayItem, selectedWeekDay, selectedMonth])

  return (
    <>

      <div className="main-wrapper home-wrapper howoften-page ">
        <div className="w-full flex justify-center items-center p-4 sm:p-6 calendar-main">
          <div
            className="w-full  bg-white rounded-xl  overflow-hidden
                    "
          >
            {/* Tabs */}
            <div className="flex items-center justify-end p-4 sm:p-6 calendar-buttons">
              <button className="px-4 py-2 mr-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Now
              </button>
              <div className="flex rounded-full bg-gray-100 p-1" role="tablist">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                        ${activeTab === "day"
                      ? "bg-blue-theme text-white"
                      : "text-gray-700 hover:bg-gray-200"
                    }
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  onClick={() => setActiveTab("day")}
                  role="tab"
                  aria-selected={activeTab === "day"}
                >
                  TODAY
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                        ${activeTab === "week"
                      ? "bg-blue-theme text-white"
                      : "text-gray-700 hover:bg-gray-200"
                    }
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  onClick={() => setActiveTab("week")}
                  role="tab"
                  aria-selected={activeTab === "week"}
                >
                  WEEK
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                        ${activeTab === "month"
                      ? "bg-blue-theme text-white"
                      : "text-gray-700 hover:bg-gray-200"
                    }
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  onClick={() => setActiveTab("month")}
                  role="tab"
                  aria-selected={activeTab === "month"}
                >
                  MONTH
                </button>
              </div>
            </div>

            {/* Content based on active tab */}
            <div className="p-4 sm:p-6 pt-0">
              {activeTab === "day" && (
                <div className="grid gap-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
                    TODAY
                  </h3>
                  <div className="grid grid-cols-3 border-t border-l border-gray-200 rounded-lg overflow-hidden">
                    {/* Day Labels Row */}
                    {["MORNING", "AFTERNOON", "EVENING"].map((label) => (
                      <div
                        key={label}
                        className="flex items-center justify-center p-4 sm:p-6 border-b border-r border-gray-200 bg-white"
                      >
                        <span className="font-bold text-[40px] sm:text-xl text-gray-800">
                          {label}
                        </span>
                      </div>
                    ))}
                    {/* Checkmark Row */}
                    {["morning", "afternoon", "evening"].map((item) => (
                      <button
                        key={item}
                        className={`flex items-center justify-center p-4 sm:p-6 border-b border-r border-gray-200 cursor-pointer transition-all duration-200
                      ${selectedDayItem === item
                            ? "bg-blue-50"
                            : "bg-white hover:bg-gray-50"
                          }
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        onClick={() => setSelectedDayItem(item)}
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

              {activeTab === "week" && (
                <div className="grid gap-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
                    WEEK
                  </h3>
                  <div className="grid grid-cols-7 border-t border-l border-gray-200 rounded-lg overflow-hidden">
                    {/* Week Day Labels Row */}
                    {daysOfWeek.map((dayName) => (
                      <div
                        key={dayName}
                        className="flex items-center justify-center p-3 sm:p-4 border-b border-r border-gray-200 bg-white"
                      >
                        <span className="font-bold text-[24px]  text-gray-800">
                          {dayName}
                        </span>
                      </div>
                    ))}
                    {/* Checkmark Row */}
                    {daysOfWeek.map((dayName, index) => (
                      <button
                        key={dayName + "-check"}
                        className={`flex items-center justify-center p-3 sm:p-4 border-b border-r border-gray-200 cursor-pointer transition-all duration-200
                      ${selectedWeekDay === index
                            ? "bg-blue-50"
                            : "bg-white hover:bg-gray-50"
                          }
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        onClick={() => setSelectedWeekDay(index)}
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

              {activeTab === "month" && (
                <div className="grid gap-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
                    MONTH
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {monthsOfYear.map((month, index) => (
                      <button
                        key={month}
                        className={`flex flex-col items-center justify-center p-0 rounded-lg cursor-pointer transition-all duration-200
                      ${selectedMonth === index ? "text-blue" : ""}
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        onClick={() => setSelectedMonth(index)}
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
      <Footer />
    </>
  );
}
