// concernData.js
import ConcernImg1 from "../../assets/images/concern-img-01.png";
import ConcernImg2 from "../../assets/images/concern-img-02.png";
import ConcernImg3 from "../../assets/images/concern-img-03.png";
import ConcernImg4 from "../../assets/images/concern-img-04.png";
import ConcernImg5 from "../../assets/images/concern-img-05.png";
import ConcernImg6 from "../../assets/images/concern-img-06.png";
import ConcernImg7 from "../../assets/images/concern-img-07.png";
import ConcernImg8 from "../../assets/images/concern-img-08.png";
import ConcernImg9 from "../../assets/images/pain-medication.png";
import ConcernImg10 from "../../assets/images/vision.png";
import ConcernImg11 from "../../assets/images/hearing.png";
import ConcernImg12 from "../../assets/images/Illness.png";
import ConcernImg13 from "../../assets/images/something-happened.png";
import ConcernImg14 from "../../assets/images/wound.png";
import ConcernImg15 from "../../assets/images/mucus-color.png";
import ConcernImg17 from "../../assets/images/trach_img.png";
import ConcernImg18 from "../../assets/images/something-else.png";

export const concerns = [
  { id: 1, name: "Pain", image: ConcernImg1, path: "/concern/pain-yes-no/1" },
  {
    id: 2,
    name: "Breathing/Coughing",
    image: ConcernImg2,
    path: "/concern/breathing-coughing-yes-no/2",
  },
  {
    id: 3,
    name: "Swallowing",
    image: ConcernImg3,
    path: "/concern/swallowing-yes-no/3",
  },
  {
    id: 4,
    name: "Nausea",
    image: ConcernImg4,
    path: "/concern/nausea-yes-no/4",
  },
  {
    id: 5,
    name: "Bowels",
    image: ConcernImg5,
    path: "/concern/bowels-yes-no/5",
  },
  {
    id: 6,
    name: "Urination",
    image: ConcernImg6,
    path: "/concern/urination-yes-no/6",
  },
  {
    id: 7,
    name: "Fatigue",
    image: ConcernImg7,
    path: "/concern/fatigue-yes-no/7",
  },
  {
    id: 8,
    name: "Eating/Drinking",
    image: ConcernImg8,
    path: "/concern/eating-drinking-yes-no/8",
  },
  {
    id: 9,
    name: "Medication",
    image: ConcernImg9,
    path: "/concern/medication-yes-no/9",
  },
  {
    id: 10,
    name: "Emotions/Feelings",
    image: ConcernImg8,
    path: "/concern/emotions-feelings-yes-no/10",
    secPath: "/feel",
  },
  {
    id: 11,
    name: "Movement",
    image: ConcernImg8,
    path: "/concern/movement-yes-no/11",
  },
  {
    id: 12,
    name: "Communication/Thinking",
    image: ConcernImg8,
    path: "/concern/communication-thinking-yes-no/12",
  },
  {
    id: 13,
    name: "Vision",
    image: ConcernImg10,
    path: "/concern/vision-yes-no/13",
  },
  {
    id: 14,
    name: "Hearing",
    image: ConcernImg11,
    path: "/concern/hearing-yes-no/14",
  },
  {
    id: 15,
    name: "Illness",
    image: ConcernImg12,
    path: "/concern/illness-yes-no/15",
  },
  {
    id: 16,
    name: "Something Happened",
    image: ConcernImg13,
    path: "/concern/something-happened-yes-no/16",
  },
  {
    id: 17,
    name: "Wound/Incision",
    image: ConcernImg14,
    path: "/concern/wound-incision-yes-no/17",
  },
  {
    id: 18,
    name: "Mucus/Secretions",
    image: ConcernImg15,
    path: "/concern/mucus-secretions-yes-no/18",
  },
  {
    id: 19,
    name: "Feeding Tube",
    image: ConcernImg8,
    path: "/concern/feeding-tube-yes-no/19",
  },
  {
    id: 20,
    name: "Trach",
    image: ConcernImg17,
    path: "/concern/trach-yes-no/20",
  },
  { id: 21, name: "Something Else", image: ConcernImg18, path: "/Whiteboard" },
  { id: 22, name: "No Concerns", image: ConcernImg8, path: "/summary" },
];
export const topicBoard = [
  {
    id: 1,
    name: "What Happened to Me?",
    path: "/topicboard/WhatHappenedtoMe/1",
  },
  { id: 2, name: "Discharge", path: "/topicboard/discharge/2" },
  { id: 3, name: "Will I Get Better?", path: "/topicboard/willIGetBetter/3" },
  { id: 4, name: "Therapy", path: "/topicboard/therapy/4" },
  { id: 5, name: "Communication", path: "/topicboard/communication/5" },
  { id: 6, name: "Driving", path: "/topicboard/driving/6" },
  { id: 7, name: "Home Set-Up", path: "/topicboard/homeSet-Up/7" },
  { id: 8, name: "Stroke Prevention", path: "/topicboard/strokePrevention/8" },
  { id: 9, name: "Family Support", path: "/topicboard/familySupport/9" },
  {
    id: 10,
    name: "Feeding Tube",
    path: "/topicboard/feedingTube/10",
    secPath: "/feel",
  },
  { id: 11, name: "Trach", path: "/topicboard/trach/11" },
  { id: 12, name: "Money", path: "/topicboard/money/12" },
  {
    id: 13,
    name: "Follow Up Appointment",
    path: "/topicboard/followUpappointment/13",
  },
  {
    id: 14,
    name: "Household Activity",
    path: "/topicboard/householdActivity/14",
  },
  {
    id: 15,
    name: "Community Activity",
    path: "/topicboard/Communityactivity/15",
  },
  { id: 16, name: "Work", path: "/topicboard/Work/16" },
  { id: 17, name: "Sex", path: "/topicboard/Sex/17" },
  { id: 18, name: "Family", path: "/topicboard/family/18" },
  { id: 19, name: "Raising Children", path: "/topicboard/raisingChildren/19" },
  { id: 20, name: "Food", path: "/topicboard/food/20" },
  { id: 21, name: "Alcohol", path: "/Whiteboard" },
];
