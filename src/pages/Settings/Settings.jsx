"use client";

import React, { useEffect, useState, useCallback } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

export default function Settings() {
  const navigate = useNavigate();
  const [selectedIconCount, setSelectedIconCount] = useState(3);
  const [selectedGender, setSelectedGender] = useState("Male");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [calendarOn, setCalendarOn] = useState(true);
  const [introductionOn, setIntroductionOn] = useState(true);
  const [loader, setLoader] = useState(true);

  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");
  const iconCounts = [1, 2, 3, 4, 6];

  useEffect(() => {
    getSetting(
      setSelectedIconCount,
      setSelectedGender,
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
    );
  }, []);

  // Debounced API call
  const saveSettings = useCallback(
    debounce(
      ({ number_of_icons, gender, language, calendar, introduction }) => {
        const payload = new FormData();
        payload.append("licenses_id", licenses_id);
        payload.append("number_of_icons", number_of_icons || 3);
        payload.append("gender", gender || "Male");
        payload.append("language", language || "English");
        payload.append("calendar", calendar || false);
        payload.append("introduction", introduction || false);

        api
          .post("saveSettings", payload, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(({ data }) => {
            if (!data.status) {
              toast.error(data.msg, { autoClose: 1500 });
            }
          })
          .catch((response) => {
            toast.error(response?.data?.message || response?.data?.msg, {
              autoClose: 1500,
            });
          });
      },
      500,
    ),
    [licenses_id, token],
  );
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
    setCalendarOn(newCalendar);
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
    navigate(newIntroduction ? "/concern" : "");
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
        className={`ml-2 text-sm font-medium ${
          checked ? "text-gray-500" : "text-blue-600"
        }`}
      >
        {labelOff}
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
        className={`text-sm font-medium ${
          checked ? "primary-text" : "text-gray-500"
        }`}
      >
        {labelOn}
      </span>
    </div>
  );

  const handleListRoute = (value) => {
    navigate(`/settingList/${value}`);
  };

  // ---------------- Translations ----------------
  const t = (key) => {
    const translations = {
      en: {
        settings: "Settings",
        selectIcons: "Select Number of icons",
        selectGender: "Select Gender",
        male: "Male",
        female: "Female",
        selectLanguage: "Select Language",
        english: "English",
        spanish: "Spanish",
        calendar: "Skip Calendar",
        introduction: "Skip Introduction",
        off: "NO",
        on: "YES",

        needsBoard: "Needs Board Settings",
        concerns: "Concerns Settings",
      },
      es: {
        settings: "Adjustes",
        selectIcons: "Seleccionar número de íconos",
        selectGender: "Seleccionar género",
        male: "Hombre",
        female: "Mujer",
        selectLanguage: "Seleccionar idioma",
        english: "Inglés",
        spanish: "Español",
        calendar: "Saltar calendario",
        introduction: "Saltar introducción",
        off: "NO",
        on: "SÍ",
        needsBoard: "Configuración del tablero de necesidades",
        concerns: "Configuración de preocupaciones",
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
          <Header
            selectedLanguage={selectedLanguage}
            introductionOn={introductionOn}
            calendarOn={calendarOn}
            name={t("settings")}
          />

          <div className="main-wrapper home-wrapper howoften-page setting-page pt-10">
            <div className="flex items-center justify-center p-4 setting-cards px-0">
              <div className="w-full bg-gradient-to-b from-blue-50 to-white rounded-lg overflow-hidden">
                <div className="p-3 px-0 sm:p-4 md:p-6">
                  {/* Number of Icons */}
                  <div className="flex items-center justify-between py-4 border-b border-white">
                    <span className="text-lg text-black-800">
                      {t("selectIcons")}
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
                    <span className="text-lg text-black-800">
                      {t("selectGender")}
                    </span>
                    <div className="flex space-x-6">
                      <CustomRadioButton
                        value="Male"
                        checked={selectedGender === "Male"}
                        onChange={handleGenderChange}
                        label={t("male")}
                      />
                      <CustomRadioButton
                        value="Female"
                        checked={selectedGender === "Female"}
                        onChange={handleGenderChange}
                        label={t("female")}
                      />
                    </div>
                  </div>

                  {/* Language */}
                  <div className="flex items-center justify-between py-4 border-b border-white">
                    <span className="text-lg text-black-800">
                      {t("selectLanguage")}
                    </span>
                    <div className="flex space-x-6">
                      <CustomRadioButton
                        value="English"
                        checked={selectedLanguage === "English"}
                        onChange={handleLanguageChange}
                        label={t("english")}
                      />
                      <CustomRadioButton
                        value="Spanish"
                        checked={selectedLanguage === "Spanish"}
                        onChange={handleLanguageChange}
                        label={t("spanish")}
                      />
                    </div>
                  </div>

                  {/* Calendar */}
                  <div className="flex items-center justify-between py-4 border-b border-white">
                    <span className="text-lg text-black-800">
                      {t("calendar")}
                    </span>
                    <CustomToggleSwitch
                      checked={calendarOn}
                      onChange={() => handleCalendarToggle(!calendarOn)}
                      labelOff={t("off")}
                      labelOn={t("on")}
                    />
                  </div>

                  {/* Introduction */}
                  <div className="flex items-center justify-between py-4">
                    <span className="text-lg text-black-900">
                      {t("introduction")}
                    </span>
                    <CustomToggleSwitch
                      checked={introductionOn}
                      onChange={() => handleIntroductionToggle(!introductionOn)}
                      labelOff={t("off")}
                      labelOn={t("on")}
                    />
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="p-3 sm:p-4 md:p-6 flex justify-center space-x-4 pt-8 calendar-bttm">
                  <button
                    className="bg-blue-theme hover:bg-blue-theme text-white px-6 py-3 rounded-md shadow-md"
                    onClick={() => handleListRoute("Needsboard")}
                  >
                    {t("needsBoard")}
                  </button>
                  <button
                    className="bg-blue-theme hover:bg-blue-theme text-white px-6 py-3 rounded-md shadow-md"
                    onClick={() => handleListRoute("concerns")}
                  >
                    {t("concerns")}
                  </button>
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
