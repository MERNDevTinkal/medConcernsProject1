"use client";

import React, { useState, useEffect } from "react";
import Footer from "../../Component/Layout/Footer/Footer";
import Loader from "../../Component/webLoader/loader";
import { useParams } from "react-router-dom";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import getSetting from "../../Component/settingApi/settings";
import BackArrow from "../../assets/images/back-arrow.svg";
import { useNavigate } from "react-router-dom";
export const concernsList = [
  { key: "Pain", label: "Pain" },
  { key: "Breathing/Coughing", label: "Breathing/Coughing" },
  { key: "Swallowing", label: "Swallowing" },
  { key: "Nausea", label: "Nausea" },
  { key: "Bowels", label: "Bowels" },
  { key: "Urination", label: "Urination" },
  { key: "Fatigue", label: "Fatigue" },
  { key: "Eating/Drinking", label: "Eating/Drinking" },
  { key: "Medication", label: "Medication" },
  { key: "Emotions/Feelings", label: "Emotions/Feelings" },
  { key: "Movement", label: "Movement" },
  { key: "Communication/Thinking", label: "Communication/Thinking" },
  { key: "Vision", label: "Vision" },
  { key: "Hearing", label: "Hearing" },
  { key: "Illness", label: "Illness" },
  { key: "Something Happened", label: "Something Happened" },
  { key: "Wound/Incision", label: "Wound/Incision" },
  { key: "Mucus/Secretions", label: "Mucus/Secretions" },
  { key: "Feeding Tube", label: "Feeding Tube" },
  { key: "Trach", label: "Trach" },
  { key: "Something Else", label: "Something Else" },
  { key: "No Concerns", label: "No Concerns" },
];

export const needsBoardList = [
  { key: "Bathroom", label: "Bathroom" },
  { key: "Bed", label: "Bed" },
  { key: "Food", label: "Food" },
  { key: "Drink", label: "Drink" },
  { key: "Glasses", label: "Glasses" },
  { key: "Medication", label: "Medication" },
  { key: "Hearing Aids", label: "Hearing Aids" },
  { key: "Dentures", label: "Dentures" },
  { key: "Tissue", label: "Tissue" },
  { key: "Call Light", label: "Call Light" },
  { key: "Blanket/Pillow", label: "Blanket/Pillow" },
  { key: "Room Temperature", label: "Room Temperature" },
  { key: "Open for Me", label: "Open for Me" },
  { key: "TV", label: "TV" },
  { key: "Music", label: "Music" },
  { key: "Call Family", label: "Call Family" },
  { key: "Change Clothes", label: "Change Clothes" },
  { key: "Need Socks", label: "Need Socks" },
  { key: "Cervical Collar", label: "Cervical Collar" },
  { key: "Helmet", label: "Helmet" },
  { key: "Adjust Clothes", label: "Adjust Clothes" },
  { key: "Change Underwear", label: "Change Underwear" },
  { key: "Light", label: "Light" },
  { key: "Please Leave", label: "Please Leave" },
  { key: "Reposition", label: "Reposition" },
  { key: "Suction", label: "Suction" },
  { key: "Catheter", label: "Catheter" },
  { key: "Soiled", label: "Soiled" },
  { key: "Pain Meds", label: "Pain Meds" },
  { key: "Ice", label: "Ice" },
  { key: "Door", label: "Door" },
  { key: "Ice Pack", label: "Ice Pack" },
  { key: "Heating Pad", label: "Heating Pad" },
  { key: "Phone/Tablet", label: "Phone/Tablet" },
  {
    key: "Inhaler/Breathing Treatment",
    label: "Inhaler/Breathing Treatment",
  },
  { key: "Need Straw", label: "Need Straw" },
  { key: "Plug in Phone/Tablet", label: "Plug in Phone/Tablet" },
  { key: "PEG", label: "PEG" },
  { key: "Trach", label: "Trach" },
  { key: "Respiratory Therapist", label: "Respiratory Therapist" },
  { key: "Doctor", label: "Doctor" },
  { key: "Nurse", label: "Nurse" },
  { key: "Nursing Aide", label: "Nursing Aide" },
  {
    key: "Occupational/Physical Therapist",
    label: "Occupational/Physical Therapist",
  },
  { key: "Speech Therapist", label: "Speech Therapist" },
];

const CustomRoundCheckbox = ({ value, checked, onChange, label }) => (
  <div
    className="flex items-center cursor-pointer space-x-2"
    onClick={() => onChange(value)}
  >
    <div
      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
        checked ? "bg-blue-theme border-blue-theme" : "border-gray-400 bg-white"
      }`}
    >
      {checked && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
    </div>
    <span className="text-black">{label}</span>
  </div>
);

export default function ConcernsSettings() {
  const navigate = useNavigate();
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [loader, setLoader] = useState(true);
  const [concerns, setConcerns] = useState(null);
  const [needboard, setNeedboard] = useState(null);
  const { name } = useParams();
  const handleConcernToggle = (key) => {
    let updatedConcerns = [...selectedConcerns];
    if (updatedConcerns.includes(key)) {
      updatedConcerns = updatedConcerns.filter((c) => c !== key);
    } else {
      updatedConcerns.push(key);
    }
    saveSettings(updatedConcerns);
    setSelectedConcerns(updatedConcerns);
  };
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");
  const saveSettings = (updatedConcerns) => {
    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    const value = name === "Needsboard" ? "need_board" : "concerns";
    payload.append(value, updatedConcerns);
    api
      .post("saveSettings", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        if (data.status) {
          //   toast.success("", { autoClose: 1500 });
        } else {
          toast.error(data.msg, { autoClose: 1500 });
        }
      })
      .catch(() => toast.error("Something went wrong", { autoClose: 1500 }));
  };

  useEffect(() => {
    getSetting(
      () => {},
      () => {},
      () => {},
      () => {},
      () => {},
      setLoader,
      setConcerns,
      setNeedboard
    );
  }, [licenses_id, token]);

  useEffect(() => {
    if (name === "Needsboard" && needboard !== null) {
      setSelectedConcerns(
        typeof needboard === "string"
          ? needboard.split(",").filter(Boolean)
          : []
      );
    } else if (name !== "Needsboard" && concerns !== null) {
      setSelectedConcerns(
        typeof concerns === "string" ? concerns.split(",").filter(Boolean) : []
      );
    }
  }, [concerns, needboard, name]);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={BackArrow} />
        </div>
        <h2 className="text-[25px] font-normal text-black text-center">
          {"Settings"}
        </h2>
        <button></button>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper howoften-page">
          <div className="flex items-center justify-center p-4 setting-cards">
            <div className="w-full bg-gradient-to-b from-blue-50 to-white rounded-lg overflow-hidden">
              <div className="p-3 sm:p-4 md:p-6">
                <h1 className="text-xs text-gray-500 mb-6">Settings</h1>

                {/* Concerns List */}
                <div className="flex flex-col gap-3 py-6 px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {(name === "Needsboard"
                      ? needsBoardList
                      : concernsList
                    ).map((c) => (
                      <CustomRoundCheckbox
                        key={c.key}
                        value={c.key}
                        checked={selectedConcerns.includes(c.key)}
                        onChange={handleConcernToggle}
                        label={c.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
