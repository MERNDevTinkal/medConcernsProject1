"use client";

import React from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";

export default function Settings() {
  const [selectedIconCount, setSelectedIconCount] = React.useState(3);
  const [selectedGender, setSelectedGender] = React.useState("female");
  const [selectedLanguage, setSelectedLanguage] = React.useState("spanish");
  const [calendarOn, setCalendarOn] = React.useState(true);
  const [introductionOn, setIntroductionOn] = React.useState(true);

  const handleIconCountChange = (count) => {
    setSelectedIconCount(count);
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleCalendarToggle = () => {
    setCalendarOn(!calendarOn);
  };

  const handleIntroductionToggle = () => {
    setIntroductionOn(!introductionOn);
  };

  const iconCounts = [1, 2, 3, 4, 6];

  // Custom Radio Button Component
  const CustomRadioButton = ({ id, name, value, checked, onChange, label }) => (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => onChange(value)}
    >
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500 ease-in-out
          ${
            checked
              ? "bg-blue-theme bg-blue-theme"
              : "border-gray-300  border-2 bg-white"
          }`}
      >
        {checked && (
          <div className="w-2.5 h-2.5 rounded-full bg-white transition-opacity duration-500 ease-in-out opacity-100"></div>
        )}
      </div>
      <span className="ml-2 text-gray-800">{label}</span>
    </div>
  );

  // Custom Toggle Switch Component
  const CustomToggleSwitch = ({ id, checked, onChange, labelOn, labelOff }) => (
    <div className="flex items-center gap-2">
      <span
        className={`text-sm font-medium ${
          checked ? "primary-text" : "text-gray-500"
        } transition-colors duration-500 ease-in-out`}
      >
        {labelOn}
      </span>
      <div
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked ? "bg-blue-theme" : "bg-gray-200"}`}
        onClick={onChange}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform duration-500 ease-in-out
            ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </div>
      <span
        className={`ml-2 text-sm font-medium ${
          checked ? "text-gray-500" : "text-blue-600"
        } transition-colors duration-500 ease-in-out`}
      >
        {labelOff}
      </span>
    </div>
  );

  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper howoften-page">
        <div className="flex items-center justify-center p-4  setting-cards">
          <div className="w-full  bg-gradient-to-b from-blue-50 to-white rounded-lg overflow-hidden">
            <div className="p-3 sm:p-4 md:p-6">
              <h1 className="text-xs text-gray-500 mb-6">Settings</h1>

              {/* Select Number of icons */}
              <div className="flex items-center justify-between py-4 border-b border-white">
                <span className="text-lg text-black-800">
                  Select Number of icons
                </span>
                <div className="flex space-x-2">
                  {iconCounts.map((count) => (
                    <button
                      key={count}
                      className={`w-10 h-10 rounded-md flex items-center justify-center text-lg font-medium transition-colors duration-200
                    ${
                      selectedIconCount === count
                        ? "bg-blue-theme text-white"
                        : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
                    }`}
                      onClick={() => handleIconCountChange(count)}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Gender */}
              <div className="flex items-center justify-between py-4 border-b border-white">
                <span className="text-lg text-black-800">Select Gender</span>
                <div className="flex space-x-6">
                  <CustomRadioButton
                    id="gender-male"
                    name="gender"
                    value="male"
                    checked={selectedGender === "male"}
                    onChange={handleGenderChange}
                    label="Male"
                  />
                  <CustomRadioButton
                    id="gender-female"
                    name="gender"
                    value="female"
                    checked={selectedGender === "female"}
                    onChange={handleGenderChange}
                    label="Female"
                  />
                </div>
              </div>

              {/* Select Language */}
              <div className="flex items-center justify-between py-4 border-b border-white">
                <span className="text-lg text-black-800">Select Language</span>
                <div className="flex space-x-6">
                  <CustomRadioButton
                    id="lang-english"
                    name="language"
                    value="english"
                    checked={selectedLanguage === "english"}
                    onChange={handleLanguageChange}
                    label="English"
                  />
                  <CustomRadioButton
                    id="lang-spanish"
                    name="language"
                    value="spanish"
                    checked={selectedLanguage === "spanish"}
                    onChange={handleLanguageChange}
                    label="Spanish"
                  />
                </div>
              </div>

              {/* Calendar Toggle */}
              <div className="flex items-center justify-between py-4 border-b border-white">
                <span className="text-lg text-black-800">Calendar</span>
                <CustomToggleSwitch
                  id="calendar-toggle"
                  checked={calendarOn}
                  onChange={handleCalendarToggle}
                  labelOn="ON"
                  labelOff="OFF"
                />
              </div>

              {/* Introduction Toggle */}
              <div className="flex items-center justify-between py-4">
                <span className="text-lg text-black-900">Introduction</span>
                <CustomToggleSwitch
                  id="introduction-toggle"
                  checked={introductionOn}
                  onChange={handleIntroductionToggle}
                  labelOn="ON"
                  labelOff="OFF"
                />
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="p-3 sm:p-4 md:p-6 flex justify-center space-x-4 pt-8 calendar-bttm">
              <button className="bg-blue-theme hover:bg-blue-theme text-white px-6 py-3 rounded-md shadow-md">
                Needs board Settings
              </button>
              <button className="bg-blue-theme hover:bg-blue-theme text-white px-6 py-3 rounded-md shadow-md">
                Concerns Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
