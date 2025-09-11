"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
export default function Settings() {
  const [selectedIconCount, setSelectedIconCount] = React.useState(3);
  const [selectedGender, setSelectedGender] = React.useState("Female");
  const [selectedLanguage, setSelectedLanguage] = React.useState("Spanish");
  const [calendarOn, setCalendarOn] = React.useState(true);
  const [introductionOn, setIntroductionOn] = React.useState(true);
  const [loader, setLoader] = useState(true);
  const token = sessionStorage.getItem("token");
  const licenses_id = sessionStorage.getItem("license_key");
  const iconCounts = [1, 2, 3, 4, 6];

  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader
    );
  }, [
    licenses_id,
    token,
    selectedIconCount,
    selectedGender,
    selectedLanguage,
    calendarOn,
    introductionOn,
  ]);

  const saveSettings = ({
    number_of_icons,
    gender,
    language,
    calendar,
    introduction,
  }) => {
    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    payload.append("number_of_icons", number_of_icons);
    payload.append("gender", gender);
    payload.append("language", language);
    payload.append("calendar", calendar);
    payload.append("introduction", introduction);

    api
      .post("saveSettings", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        if (data.status) toast.success("", { autoClose: 1500 });
        else toast.error(data.msg, { autoClose: 1500 });
      })
      .catch(() => toast.error("Something went wrong", { autoClose: 1500 }));
  };

  // ---------------- Handlers ----------------
  const handleIconCountChange = (count) => {
    setSelectedIconCount(count);
    saveSettings({
      number_of_icons: count,
      gender: selectedGender,
      language: selectedLanguage,
      calendar: calendarOn,
      introduction: introductionOn,
    });
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    saveSettings({
      number_of_icons: selectedIconCount,
      gender,
      language: selectedLanguage,
      calendar: calendarOn,
      introduction: introductionOn,
    });
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    saveSettings({
      number_of_icons: selectedIconCount,
      gender: selectedGender,
      language,
      calendar: calendarOn,
      introduction: introductionOn,
    });
  };
  const handleCalendarToggle = (newCalendar) => {
    setCalendarOn(newCalendar); // update state
    saveSettings({
      number_of_icons: selectedIconCount,
      gender: selectedGender,
      language: selectedLanguage,
      calendar: newCalendar,
      introduction: introductionOn,
    });
  };

  const handleIntroductionToggle = (newIntroduction) => {
    setIntroductionOn(newIntroduction);
    saveSettings({
      number_of_icons: selectedIconCount,
      gender: selectedGender,
      language: selectedLanguage,
      calendar: calendarOn,
      introduction: newIntroduction,
    });
  };

  // ---------------- Custom Components ----------------
  const CustomRadioButton = ({ value, checked, onChange, label }) => (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => onChange(value)}
    >
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
          checked ? "bg-blue-theme" : "border-gray-300 border-2 bg-white"
        }`}
      >
        {checked && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
      </div>
      <span className="ml-2 text-gray-800">{label}</span>
    </div>
  );

  const CustomToggleSwitch = ({ checked, onChange, labelOn, labelOff }) => (
    <div className="flex items-center gap-2">
      <span
        className={`text-sm font-medium ${
          checked ? "primary-text" : "text-gray-500"
        }`}
      >
        {labelOn}
      </span>
      <div
        className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
          checked ? "bg-blue-theme" : "bg-gray-200"
        }`}
        onClick={onChange}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
      <span
        className={`ml-2 text-sm font-medium ${
          checked ? "text-gray-500" : "text-blue-600"
        }`}
      >
        {labelOff}
      </span>
    </div>
  );

  // ---------------- Render ----------------
  return (
    <>
      <Header name={"Settings"} />
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper howoften-page">
          <div className="flex items-center justify-center p-4 setting-cards">
            <div className="w-full bg-gradient-to-b from-blue-50 to-white rounded-lg overflow-hidden">
              <div className="p-3 sm:p-4 md:p-6">
                <h1 className="text-xs text-gray-500 mb-6">Settings</h1>

                {/* Number of Icons */}
                <div className="flex items-center justify-between py-4 border-b border-white">
                  <span className="text-lg text-black-800">
                    Select Number of icons
                  </span>
                  <div className="flex space-x-2">
                    {iconCounts.map((count) => (
                      <button
                        key={count}
                        className={`w-10 h-10 rounded-md flex items-center justify-center text-lg font-medium ${
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

                {/* Gender */}
                <div className="flex items-center justify-between py-4 border-b border-white">
                  <span className="text-lg text-black-800">Select Gender</span>
                  <div className="flex space-x-6">
                    <CustomRadioButton
                      value="Male"
                      checked={selectedGender === "Male"}
                      onChange={handleGenderChange}
                      label="Male"
                    />
                    <CustomRadioButton
                      value="Female"
                      checked={selectedGender === "Female"}
                      onChange={handleGenderChange}
                      label="Female"
                    />
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between py-4 border-b border-white">
                  <span className="text-lg text-black-800">
                    Select Language
                  </span>
                  <div className="flex space-x-6">
                    <CustomRadioButton
                      value="English"
                      checked={selectedLanguage === "English"}
                      onChange={handleLanguageChange}
                      label="English"
                    />
                    <CustomRadioButton
                      value="Spanish"
                      checked={selectedLanguage === "Spanish"}
                      onChange={handleLanguageChange}
                      label="Spanish"
                    />
                  </div>
                </div>

                {/* Calendar */}
                <div className="flex items-center justify-between py-4 border-b border-white">
                  <span className="text-lg text-black-800">Calendar</span>
                  <CustomToggleSwitch
                    checked={calendarOn}
                    onChange={() => {
                      handleCalendarToggle(!calendarOn);
                    }}
                    labelOn="ON"
                    labelOff="OFF"
                  />
                </div>

                {/* Introduction */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-lg text-black-900">Introduction</span>
                  <CustomToggleSwitch
                    checked={introductionOn}
                    onChange={() => {
                      handleIntroductionToggle(!introductionOn);
                    }}
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
      )}
      <Footer />
    </>
  );
}
