// concernData.js
import ConcernImg1 from "/assets/images/concern-img-01.png";
import ConcernImg2 from "/assets/images/concern-img-02.png";
import ConcernImg3 from "/assets/images/concern-img-03.png";
import ConcernImg4 from "/assets/images/concern-img-04.png";
import ConcernImg5 from "/assets/images/concern-img-05.png";
import ConcernImg6 from "/assets/images/concern-img-06.png";
import ConcernImg7 from "/assets/images/concern-img-07.png";
import ConcernImg8 from "/assets/images/concern-img-08.png";
import ConcernImg9 from "/assets/images/pain-medication.png";
import ConcernImg10 from "/assets/images/glasses.png";
import ConcernImg11 from "/assets/images/HearingConcernNew.png";
import ConcernImg12 from "/assets/images/Illness.png";
import ConcernImg13 from "/assets/images/something-happened.png";
import ConcernImg14 from "/assets/images/wound.png";
import ConcernImg17 from "/assets/images/trach_img.png";
import ConcernImg18 from "/assets/images/something-else.png";
import ConcernImg19 from "/assets/images/When-Eating-Drinking.png";
import WithTubeFeed from "/assets/images/Tube Feed (Feeding Tube).png";
import thickmucusImg from "/assets/images/thick-mucus.png";
import HowAreYouImg1 from "/assets/images/good.png";
import EmotionsImg2 from "/assets/images/emotion-img-02.png";
import MovementImg from "/assets/images/Movement.png";
import Communication_ThinkingImg from "/assets/images/Communication _ Thinking.png";
import BoardImg6 from "/assets/images/medicationConcern.png";
import withFoodFrinkWhenEating from "/assets/images/With food_drink & when eating_drinking.png";

export const concerns = [
  {
    id: 1,
    name: "Pain",
    nameEs: "Dolor",
    image: ConcernImg1,
    path: "/concern/pain-yes-no/1",
  },
  {
    id: 2,
    name: "Breathing/Coughing",
    nameEs: "Respiración/Tos",
    image: ConcernImg2,
    path: "/concern/breathing-coughing-yes-no/2",
  },
  {
    id: 3,
    name: "Swallowing",
    nameEs: "Deglución",
    image: ConcernImg3,
    path: "/concern/swallowing-yes-no/3",
  },
  {
    id: 4,
    name: "Nausea",
    nameEs: "Náusea",
    image: ConcernImg4,
    path: "/concern/nausea-yes-no/4",
  },
  {
    id: 5,
    name: "Bowels",
    nameEs: "Intestinos",
    image: ConcernImg5,
    path: "/concern/bowels-yes-no/5",
  },
  {
    id: 6,
    name: "Urination",
    nameEs: "Orina",
    image: ConcernImg6,
    path: "/concern/urination-yes-no/6",
  },
  {
    id: 7,
    name: "Fatigue",
    nameEs: "Fatiga",
    image: ConcernImg7,
    path: "/concern/fatigue-yes-no/7",
  },
  {
    id: 8,
    name: "Eating/Drinking",
    nameEs: "Alimentación/Beber",
    image: withFoodFrinkWhenEating,
    path: "/concern/eating-drinking-yes-no/8",
  },
  {
    id: 9,
    name: "Medication",
    nameEs: "Medicación",
    image: BoardImg6,
    path: "/concern/medication-yes-no/9",
  },
  {
    id: 10,
    name: "Emotions/Feelings",
    nameEs: "Emociones/Sentimientos",
    image: EmotionsImg2,
    path: "/concern/emotions-feelings-yes-no/10",
  },
  {
    id: 11,
    name: "Movement",
    nameEs: "Movimiento",
    image: MovementImg,
    path: "/concern/movement-yes-no/11",
  },
  {
    id: 12,
    name: "Communication/Thinking",
    nameEs: "Comunicación/Pensamiento",
    image: Communication_ThinkingImg,
    path: "/concern/communication-thinking-yes-no/12",
  },
  {
    id: 13,
    name: "Vision",
    nameEs: "Visión",
    image: ConcernImg10,
    path: "/concern/vision-yes-no/13",
  },
  {
    id: 14,
    name: "Hearing",
    nameEs: "Audición",
    image: ConcernImg11,
    path: "/concern/hearing-yes-no/14",
  },
  {
    id: 15,
    name: "Illness",
    nameEs: "Enfermedad",
    image: ConcernImg12,
    path: "/concern/illness-yes-no/15",
  },
  {
    id: 16,
    name: "Something Happened",
    nameEs: "Algo Pasó",
    image: ConcernImg13,
    path: "/concern/something-happened-yes-no/16",
  },
  {
    id: 17,
    name: "Wound / Incision",
    nameEs: "Herida / Incisión",
    image: ConcernImg14,
    path: "/concern/wound-incision-yes-no/17",
  },
  {
    id: 18,
    name: "Mucus/Secretions",
    nameEs: "Mucosidad/Secreciones",
    image: thickmucusImg,
    path: "/concern/mucus-secretions-yes-no/18",
  },
  {
    id: 19,
    name: "Feeding Tube",
    nameEs: "Sonda de Alimentación",
    image: WithTubeFeed,
    path: "/concern/feeding-tube-yes-no/19",
  },
  {
    id: 20,
    name: "Trach",
    nameEs: "Traqueotomía",
    image: ConcernImg17,
    path: "/concern/trach-yes-no/20",
  },
  {
    id: 21,
    name: "Something Else",
    nameEs: "Algo Más",
    image: ConcernImg18,
    path: "/Whiteboard",
  },
  {
    id: 22,
    name: "No Concerns",
    nameEs: "Sin Preocupaciones",
    image: HowAreYouImg1,
    path: "/summary",
  },
];

export const topicBoard = [
  {
    id: 1,
    name: "What Happened to Me?",
    nameEs: "¿Qué Me Pasó?",
    path: "/topicboard/WhatHappenedtoMe/1",
  },
  { id: 2, name: "Discharge", nameEs: "Alta", path: "/topicboard/discharge/2" },
  {
    id: 3,
    name: "Will I Get Better?",
    nameEs: "¿Me Recuperaré?",
    path: "/topicboard/willIGetBetter/3",
  },
  { id: 4, name: "Therapy", nameEs: "Terapia", path: "/topicboard/therapy/4" },
  {
    id: 5,
    name: "Communication",
    nameEs: "Comunicación",
    path: "/topicboard/communication/5",
  },
  { id: 6, name: "Driving", nameEs: "Conducir", path: "/topicboard/driving/6" },
  {
    id: 7,
    name: "Home Set-Up",
    nameEs: "Preparación del Hogar",
    path: "/topicboard/homeSet-Up/7",
  },
  {
    id: 8,
    name: "Stroke Prevention",
    nameEs: "Prevención de Accidentes Cerebrovasculares",
    path: "/topicboard/strokePrevention/8",
  },
  {
    id: 9,
    name: "Family Support",
    nameEs: " Apoyo de la Familia",
    path: "/topicboard/familySupport/9",
  },
  {
    id: 10,
    name: "Feeding Tube",
    nameEs: "Sonda de Alimentación",
    path: "/topicboard/feedingTube/10",
    secPath: "/feel-description",
  },
  {
    id: 11,
    name: "Trach",
    nameEs: "Traqueotomía",
    path: "/topicboard/trach/11",
  },
  { id: 12, name: "Money", nameEs: "Dinero", path: "/topicboard/money/12" },
  {
    id: 13,
    name: "Follow Up Appointment",
    nameEs: "Citas de Seguimiento",
    path: "/topicboard/followUpappointment/13",
  },
  {
    id: 14,
    name: "Household Activity",
    nameEs: "Actividad del Hogar",
    path: "/topicboard/householdActivity/14",
  },
  {
    id: 15,
    name: "Community Activity",
    nameEs: "Actividad de la Comunidad",
    path: "/topicboard/Communityactivity/15",
  },
  { id: 16, name: "Work", nameEs: "Trabajo", path: "/topicboard/Work/16" },
  { id: 17, name: "Sex", nameEs: "Sexo", path: "/topicboard/Sex/17" },
  { id: 18, name: "Family", nameEs: "Familia", path: "/topicboard/family/18" },
  {
    id: 19,
    name: "Raising Children",
    nameEs: "Criar a los Niños",
    path: "/topicboard/raisingChildren/19",
  },
  { id: 20, name: "Food", nameEs: "Comida", path: "/topicboard/food/20" },
  { id: 21, name: "Alcohol", nameEs: "Alcohol", path: "/Whiteboard" },
];
