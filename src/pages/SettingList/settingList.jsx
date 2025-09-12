"use client";

import React, { useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import Loader from "../../Component/webLoader/loader";
import { useParams } from "react-router-dom";
const concernsList = [
  { key: "pain", label: "Pain" },
  { key: "breathing", label: "Breathing / Coughing" },
  { key: "swallowing", label: "Swallowing" },
  { key: "nausea", label: "Nausea" },
  { key: "bowels", label: "Bowels" },
  { key: "urination", label: "Urination" },
  { key: "fatigue", label: "Fatigue" },
  { key: "eating", label: "Eating / Drinking" },
  { key: "medication", label: "Medication" },
  { key: "emotions", label: "Emotions / Feelings" },
  { key: "movement", label: "Movement" },
  { key: "communication", label: "Communication / Thinking" },
  { key: "vision", label: "Vision" },
  { key: "hearing", label: "Hearing" },
  { key: "illness", label: "Illness" },
  { key: "incident", label: "Something Happened" },
  { key: "wound", label: "Wound / Incision" },
  { key: "mucus", label: "Mucus / Secretions" },
  { key: "feeding_tube", label: "Feeding Tube" },
  { key: "trach", label: "Trach" },
  { key: "something_else", label: "Something Else" },
  { key: "no_concerns", label: "No Concerns" },
];

const needsBoardList = [
  { key: "bathroom", label: "Bathroom" },
  { key: "bed", label: "Bed" },
  { key: "food", label: "Food" },
  { key: "drink", label: "Drink" },
  { key: "glasses", label: "Glasses" },
  { key: "medication", label: "Medication" },
  { key: "hearing_aids", label: "Hearing Aids" },
  { key: "dentures", label: "Dentures" },
  { key: "tissue", label: "Tissue" },
  { key: "call_light", label: "Call Light" },
  { key: "blanket_pillow", label: "Blanket / Pillow" },
  { key: "room_temperature", label: "Room Temperature" },
  { key: "open_for_me", label: "Open for Me" },
  { key: "tv", label: "TV" },
  { key: "music", label: "Music" },
  { key: "call_family", label: "Call Family" },
  { key: "change_clothes", label: "Change Clothes" },
  { key: "need_socks", label: "Need Socks" },
  { key: "cervical_collar", label: "Cervical Collar" },
  { key: "helmet", label: "Helmet" },
  { key: "adjust_clothes", label: "Adjust Clothes" },
  { key: "change_underwear", label: "Change Underwear" },
  { key: "light", label: "Light" },
  { key: "please_leave", label: "Please Leave" },
  { key: "reposition", label: "Reposition" },
  { key: "suction", label: "Suction" },
  { key: "catheter", label: "Catheter" },
  { key: "soiled", label: "Soiled" },
  { key: "pain_meds", label: "Pain Meds" },
  { key: "ice", label: "Ice" },
  { key: "door", label: "Door" },
  { key: "ice_pack", label: "Ice Pack" },
  { key: "heating_pad", label: "Heating Pad" },
  { key: "phone_tablet", label: "Phone / Tablet" },
  { key: "inhaler_treatment", label: "Inhaler / Breathing Treatment" },
  { key: "need_straw", label: "Need Straw" },
  { key: "plug_in_device", label: "Plug in Phone / Tablet" },
  { key: "peg", label: "PEG" },
  { key: "trach", label: "Trach" },
  { key: "respiratory_therapist", label: "Respiratory Therapist" },
  { key: "doctor", label: "Doctor" },
  { key: "nurse", label: "Nurse" },
  { key: "nursing_aide", label: "Nursing Aide" },
  { key: "occupational_therapist", label: "Occupational / Physical Therapist" },
  { key: "speech_therapist", label: "Speech Therapist" },
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
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [loader, setLoader] = useState(false);
  const { name } = useParams();
  const handleConcernToggle = (key) => {
    let updatedConcerns = [...selectedConcerns];
    if (updatedConcerns.includes(key)) {
      updatedConcerns = updatedConcerns.filter((c) => c !== key);
    } else {
      updatedConcerns.push(key);
    }
    setSelectedConcerns(updatedConcerns);
  };
  console.log("======>selectedConcerns", selectedConcerns);
  return (
    <>
      <Header name={"Concerns"} />
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper howoften-page">
          <div className="flex items-center justify-center p-4 setting-cards">
            <div className="w-full bg-gradient-to-b from-blue-50 to-white rounded-lg overflow-hidden">
              <div className="p-3 sm:p-4 md:p-6">
                <h1 className="text-xs text-gray-500 mb-6">Concerns</h1>

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
