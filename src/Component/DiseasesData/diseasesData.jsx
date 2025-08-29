import dashimg01 from "../../assets/images/Shortness-of-Breath.png";
import dashimg02 from "../../assets/images/coughing.png";
import dashimg03 from "../../assets/images/chest-pain.png";
import dashimg04 from "../../assets/images/concern-img-08.png";
import dashimg05 from "../../assets/images/thick-mucus.png";
import dashimg06 from "../../assets/images/Congested-or-Runny-Nose.png";
import dashimg07 from "../../assets/images/heavy-pain.png";
import dashimg08 from "../../assets/images/CPAP-BiPAP.png";
import dashimg09 from "../../assets/images/Breathing-Treatment.png";
import dashimg10 from "../../assets/images/trach.png";
import dashimg11 from "../../assets/images/something-else.png";


import swallowingimg01 from "../../assets/images/Shortness-of-Breath.png";
import swallowingimg02 from "../../assets/images/coughing.png";
import swallowingimg03 from "../../assets/images/chest-pain.png";
import swallowingimg04 from "../../assets/images/concern-img-08.png";
import swallowingimg05 from "../../assets/images/coughing.png";
import swallowingimg06 from "../../assets/images/reflux.png";
import swallowingimg07 from "../../assets/images/Nausea.png";
import swallowingimg08 from "../../assets/images/Pain-with-swallowing.png";
import swallowingimg09 from "../../assets/images/fear-of-swallowing.png";
import swallowingimg10 from "../../assets/images/dry_mouth.png";
import swallowingimg11 from "../../assets/images/too_much.png";
import swallowingimg12 from "../../assets/images/no_appetite.png";
import swallowingimg13 from "../../assets/images/trach.png";
import swallowingimg14 from "../../assets/images/something-else.png";


import nausea01 from "../../assets/images/Shortness-of-Breath.png";
import nausea02 from "../../assets/images/constipation.jpg";
import nausea03 from "../../assets/images/pain-stomach.jpeg";
import nausea04 from "../../assets/images/nausea.png";
import nausea05 from "../../assets/images/something-else.png";

import Emo1 from "../../assets/images/emo-01.svg";
import Emo2 from "../../assets/images/emo-02.svg";
import Emo3 from "../../assets/images/emo-03.svg";
import Emo4 from "../../assets/images/emo-04.svg";
import Emo5 from "../../assets/images/emo-05.svg";
import Emo6 from "../../assets/images/emo-06.svg";

const swallowingDesises = [
    { "id": "1", "name": "With Medication", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "2", "name": "With Food / Drinks", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "3", "name": "With Saliva", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "4", "name": "Just Swallowing", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "5", "name": "Something Else", "image": swallowingimg04, "secPath": "/Whiteboard", "path": "/howoften" },
]
const heartburnDesises = [
    { "id": "1", "name": "With Medication", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "2", "name": "With Food / Drinks", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "3", "name": "Just Swallowing", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "4", "name": "Something Else", "image": swallowingimg04, "secPath": "/Whiteboard", "path": "/howoften" },
]
const heartburnswallowingDesises = [
    { "id": "1", "name": "With Food", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "2", "name": "With Drinks", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "3", "name": "With Food & Drinks", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "4", "name": "With Medication", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "5", "name": "Just Swallowing", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "6", "name": "Something Else", "image": swallowingimg04, "secPath": "/Whiteboard", "path": "/howoften" },
]


const painwithswallowingDesises = [
    { "id": "1", "name": "With Food", "image": swallowingimg04, "secPath": "/feeling-list-pain", "path": "/when" },
    { "id": "2", "name": "With Drinks", "image": swallowingimg04, "secPath": "/feeling-list-pain", "path": "/when" },
    { "id": "3", "name": "With Medication", "image": swallowingimg04, "secPath": "/feeling-list-pain", "path": "/when" },
    { "id": "4", "name": "With Food / Drinks", "image": swallowingimg04, "secPath": "/feeling-list-pain", "path": "/when" },
    { "id": "5", "name": "With Saliva", "image": swallowingimg04, "secPath": "/feeling-list-pain", "path": "/when" },
    { "id": "6", "name": "Just Swallowing", "image": swallowingimg04, "secPath": "/feeling-list-pain", "path": "/when" },
    { "id": "7", "name": "Something Else", "image": swallowingimg04, "secPath": "/Whiteboard", "path": "/when" },
]
const fearofswallowingDesises = [
    { "id": "1", "name": "With Food", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "2", "name": "With Drinks", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "3", "name": "With Medication", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "4", "name": "With Food / Drinks", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "5", "name": "With Saliva", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "6", "name": "Just Swallowing", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "7", "name": "Something Else", "image": swallowingimg04, "secPath": "/Whiteboard", "path": "/howoften" },
]
const drymouthDesises = [
    { "id": "1", "name": "With Food", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "2", "name": "With Drinks", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "3", "name": "With Medication", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "4", "name": "With Food / Drinks", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "5", "name": "With Saliva", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "6", "name": "Just Swallowing", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "7", "name": "Just Dry/Uncomfortable", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "8", "name": "Something Else", "image": swallowingimg04, "secPath": "/Whiteboard", "path": "/howoften" },
]


const trachproblemDesises = [
    { "id": "1", "name": "Mucus/Secretions", "image": swallowingimg04, "secPath": "/mucussecretions-problem", "path": "/howoften" },
    { "id": "2", "name": "Suction", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/when" },
    { "id": "3", "name": "Cap", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/when" },
    { "id": "4", "name": "Speaking Valve ", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/when" },
    { "id": "5", "name": "Remove", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/when" },
    { "id": "6", "name": "Pain", "image": swallowingimg04, "secPath": "", "path": "/when" },
    { "id": "7", "name": "Tight", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/when" },
    { "id": "8", "name": "Itchy", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/when" },
    { "id": "9", "name": "Leaking", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "10", "name": "Something Else", "image": swallowingimg04, "secPath": "/Whiteboard", "path": "/howoften" },
]

const mucussecretionsDesises = [
    { "id": "1", "name": "Shortness of breath", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "2", "name": "Suction", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "3", "name": "Thick Mucus", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "4", "name": "Too Much", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
]
const feedingtubeDesises = [
    { "id": "1", "name": "Pain", "image": swallowingimg04, "secPath": "", "path": "" },
    { "id": "2", "name": "Remove", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "3", "name": "Too Much", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "4", "name": "Something Else", "image": swallowingimg04, "secPath": "/Whiteboard", "path": "/howoften" },
]



const trachproblemsubDesises = [
    { "id": "1", name: "Mucus/Secretions", "path": "", "image": swallowingimg04, "secPath": "/trachmucusSecretions-problem" },
    { "id": "2", name: "Suction", "path": "/when", "image": swallowingimg04, "secPath": "/confrm-step-yesno" },
    { "id": "3", name: "Cap", "path": "/when", "image": swallowingimg04, "secPath": "/confrm-step-yesno" },
    { "id": "4", name: "Speaking Valve", "path": "/when", "image": swallowingimg04, "secPath": "/confrm-step-yesno" },
    { "id": "5", name: "Remove", "path": "/when", "image": swallowingimg04, "secPath": "/confrm-step-yesno" },
    { "id": "6", name: "Pain", "path": "", "image": swallowingimg04, "secPath": "/confrm-step-yesno" },
    { "id": "7", name: "Tight", "path": "/howoften", "image": swallowingimg04, "secPath": "/confrm-step-yesno" },
    { "id": "8", name: "Itchy", "path": "/howoften", "image": swallowingimg04, "secPath": "/confrm-step-yesno" },
    { "id": "9", name: "Leaking", "path": "/howoften", "image": swallowingimg04, "secPath": "/confrm-step-yesno" },
    { "id": "10", name: "Swallowing", "path": "", "image": swallowingimg04, "secPath": "/trachswallowing-problem" },
    { "id": "11", name: "Something Else", "path": "/Whiteboard", "image": swallowingimg04, "secPath": "/confrm-step-yesno" }
];

const trachmucusSecretionsDesises = [
    { "id": "1", name: "Shortness of breath", image: swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "2", name: "Suction", image: swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "3", name: "Thick Mucus", image: swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "4", name: "Dry Mouth", image: swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "5", name: "Too Much", image: swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "6", name: "Color", "path": "/howoften", image: swallowingimg04, "secPath": "/color-problem-sub" }
];

const trachswallowingDesises = [
    { "id": "1", name: "With Medication", path: "/howoften", image: swallowingimg04, secPath: "/confrm-step-yesno" },
    { "id": "2", name: "With Food", path: "/howoften", image: swallowingimg04, secPath: "/confrm-step-yesno" },
    { "id": "3", name: "With Drinks", path: "/howoften", image: swallowingimg04, secPath: "/confrm-step-yesno" },
    { "id": "4", name: "With Food/Drinks", path: "/howoften", image: swallowingimg04, secPath: "/confrm-step-yesno" },
    { "id": "5", name: "With Saliva", path: "/howoften", image: swallowingimg04, secPath: "/confrm-step-yesno" },
    { "id": "6", name: "Just Swallowing", path: "/howoften", image: swallowingimg04, secPath: "/confrm-step-yesno" },
    { "id": "7", name: "Something Else", path: "/howoften", image: swallowingimg04, secPath: "/confrm-step-yesno" }
];

const colorDesies = [
    { "id": "1", "name": "Green", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "2", "name": "Yellow", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "3", "name": "Brown", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "4", "name": "White", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    { "id": "5", "name": "Blood ", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
]

const trachDesies = [
    { "id": "1", name: "Shortness of Breath", path: "/when", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "2", name: "Coughing", path: "/when", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "3", name: "Mucus/Secretions", path: "/when", image: dashimg04, secPath: "/maintrachmucussecretions-problem" },
    { "id": "4", name: "Suction", path: "/when", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "5", name: "Breathing Treatment", path: "/when", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "6", name: "Cap", path: "/when", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "7", name: "Speaking Valve", path: "/when", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "8", name: "Remove", path: "/when", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "9", name: "Pain", path: "/when", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "10", name: "Tight", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "11", name: "Itchy", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "12", name: "Leaking", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "13", name: "Swallowing", path: "/howoften", image: dashimg04, secPath: "/trachmainswallowing-problem" },
    { "id": "14", name: "Something Else", path: "/Whiteboard", image: dashimg04, secPath: "/confrm-step-yesno" }
];



const SwallowingTrachDesies = [
    { id: "1", name: "Mucus/Secretions", path: "", image: dashimg04, secPath: "/swallowingmucussecretions-problem" },
    { id: "2", name: "Suction", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "3", name: "Cap", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "4", name: "Speaking Valve", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "5", name: "Remove", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "6", name: "Breathing/Coughing", path: "", image: dashimg04, secPath: "/swallowingbreathingcoughing-problem" },
    { id: "7", name: "Pain", path: "", image: dashimg04, secPath: "/feeling-list-pain" },
    { id: "8", name: "Tight", path: "/when", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "9", name: "Itchy", path: "/when", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "10", name: "Leaking", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "11", name: "Swallowing", path: "", image: dashimg04, secPath: "/swallowingtrachswallowing-problem" },
    { id: "12", name: "Something Else", path: "/Whiteboard", image: dashimg04, secPath: "/confrm-step-yesno" }
];



const nauseaSwallowingDesies = [
    { "id": "1", "name": "Vomiting", "image": swallowingimg04, secPath: "/confrm-step-yesno", path: "/howoften" },
    { "id": "2", "name": "Diarrhea", "image": nausea02, secPath: "/confrm-step-yesno", path: "/howoften" },
    { "id": "3", "name": "Cramping", "image": nausea03, secPath: "/confrm-step-yesno", path: "/howoften" },
    { "id": "4", "name": "Constipation", "image": nausea02, secPath: "/confrm-step-yesno", path: "/howoften" },
    { "id": "5", "name": "With Medication", "image": nausea04, secPath: "/confrm-step-yesno", path: "/howoften" },
    { "id": "6", "name": "With Food/Drink", "image": nausea04, secPath: "/confrm-step-yesno", path: "/howoften" },
    { "id": "7", "name": "Something Else", "image": nausea05, secPath: "/confrm-step-yesno", path: "/howoften" }
]

const painEmoji = [
    { "id": "1", painFeel: "No Pain", "params": "0", "image": Emo1, secPath: "/confrm-step-yesno", path: "/when" },
    { "id": "2", painFeel: "Mild", "params": "1 - 2", "image": Emo2, secPath: "/confrm-step-yesno", path: "/when" },
    { "id": "3", painFeel: "Moderate", "params": "3 - 4", "image": Emo3, secPath: "/confrm-step-yesno", path: "/when" },
    { "id": "4", painFeel: "Severe", "params": "5- 6", "image": Emo4, secPath: "/confrm-step-yesno", path: "/when" },
    { "id": "5", painFeel: "Very Severe", "params": "7 - 8", "image": Emo5, secPath: "/confrm-step-yesno", path: "/when" },
    { "id": "6", painFeel: "Worst Pain Imaginable", "params": "9-10", "image": Emo6, secPath: "/confrm-step-yesno", path: "/when" },
]

const noappetiteDesies = [
    { "id": "1", name: "Don’t Want", "secPath": "/confrm-step-yesno", "path": "/howoften", image: dashimg04 },
    { "id": "2", name: "Taste Changes", "secPath": "/confrm-step-yesno", "path": "/howoften", image: dashimg04 },
    { "id": "3", name: "Nausea", "secPath": "/confrm-step-yesno", "path": "/howoften", image: dashimg04 },
    { "id": "4", name: "Feel Full", "secPath": "/confrm-step-yesno", "path": "/howoften", image: dashimg04 },
    { "id": "5", name: "Smell of Food", "secPath": "/confrm-step-yesno", "path": "/howoften", image: dashimg04 },
    { "id": "6", name: "Something Else", "secPath": "/confrm-step-yesno", "path": "/Whiteboard", image: dashimg04 }
];


const swallowingfeedingtube = [
    { "id": "1", name: "Pain", path: "", image: dashimg04, secPath: "Pain" },
    { "id": "2", name: "Remove", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "3", name: "Leaking", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "4", name: "Too Much", path: "/when", image: dashimg04, secPath: "/confrm-step-yesno" },
    { "id": "5", name: "Bowels", path: "", image: dashimg04, secPath: "/swallowingfeedingtubebowels-problem" },
    { "id": "6", name: "Something Else", path: "/Whiteboard", image: dashimg04, secPath: "/Whiteboard" }
];


const swallowingfeedingtubebowelsDesiese = [
    { id: "1", name: "Constipation", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "2", name: "Diarrhea", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "3", name: "Gas/Bloating", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "4", name: "Cramping", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "5", name: "Blood", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "6", name: "Need Changed", path: "/howoften", image: dashimg04, secPath: "/confrm-step-yesno" },
    { id: "7", name: "Something Else", path: "/Whiteboard", image: dashimg04, secPath: "/Whiteboard" }
];


export const diseasesData = {
    "/breathing-problem": [
        { "id": "1", "name": "Shortness of Breath", "image": dashimg01, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "2", "name": "Coughing", "image": dashimg02, "secPath": "/coughing-problem", "path": "" },
        { "id": "3", "name": "Chest Pain", "image": dashimg03, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "4", "name": "Choking", "image": dashimg04, "secPath": "/choking-problem", "path": "" },
        { "id": "5", "name": "Mucus / Secretions", "image": dashimg05, "secPath": "/mucus-problem", "path": "" },
        { "id": "6", "name": "Congested or Runny Nose", "image": dashimg06, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "7", "name": "Heavy / Thick", "image": dashimg07, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "8", "name": "CPAP / BiPAP", "image": dashimg08, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "9", "name": "Breathing Treatment", "image": dashimg09, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "10", "name": "Trach", "image": dashimg10, "secPath": "/trachmain-problem", "path": "" },
        { "id": "11", "name": "Something Else", "image": dashimg11, "secPath": "/Whiteboard", "path": "" }
    ],
    "/coughing-problem": [
        { "id": "1", "name": "Mucus / Secretions", "image": dashimg04, "secPath": "/mucus-problem-sub", "path": "/when" },
        { "id": "2", "name": "Tickle in My Throat", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "3", "name": "Swallowing", "image": dashimg04, "secPath": "/swallowing-problem-sub", "path": "/when" },
        { "id": "4", "name": "Shortness of Breath ", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "5", "name": "With Activity  ", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "6", "name": "Trach", "image": dashimg04, "secPath": "/trach-problem-sub", "path": "/when" },
        { "id": "7", "name": "Something Else", "image": dashimg04, "secPath": "/Whiteboard", "path": "/when" }
    ],
    "/mucus-problem-sub": [
        { "id": "1", "name": "Shortness of Breath", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "2", "name": "Suction", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "3", "name": "Thick Mucus", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "4", "name": "Dry Mouth", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "5", "name": "Too Much", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "6", "name": "Color", "image": dashimg04, "secPath": "/color-problem-sub", "path": "/howoften" },
        { "id": "7", "name": "Something Else", "image": dashimg04, "secPath": "/Whiteboard", "path": "/howoften" }
    ],
    "/color-problem-sub": [
        { "id": "1", "name": "Green", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "2", "name": "Yellow", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "3", "name": "Brown", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "4", "name": "White", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "5", "name": "Blood ", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    ],
    "/color-problem": colorDesies,
    "/mucus-problem": [
        { "id": "1", "name": "Shortness of Breath", "image": swallowingimg04, "path": "/howoften", "secPath": "/confrm-step-yesno" },
        { "id": "2", "name": "Suction", "image": swallowingimg04, "path": "/howoften", "secPath": "/confrm-step-yesno" },
        { "id": "3", "name": "Thick Mucus", "image": swallowingimg04, "path": "/howoften", "secPath": "/confrm-step-yesno" },
        { "id": "4", "name": "Dry Mouth", "image": swallowingimg04, "path": "/howoften", "secPath": "/confrm-step-yesno" },
        { "id": "5", "name": "Too Much", "image": swallowingimg04, "path": "/howoften", "secPath": "/confrm-step-yesno" },
        { "id": "6", "name": "Color", "image": swallowingimg04, "path": "/howoften", "secPath": "/confrm-step-yesno" }
    ],
    "/swallowing-problem": [
        { "id": "1", "name": "Choking", "image": swallowingimg04, "path": "/howoften", "secPath": "/swallowingwith-problem" },
        { "id": "2", "name": "Food Sticking", "image": swallowingimg04, "path": "/howoften", "secPath": "/swallowingwith-problem" },
        { "id": "3", "name": "Heartburn", "image": swallowingimg04, "path": "/howoften", "secPath": "/swallowingheartburn-problem" },
        { "id": "4", "name": "Coughing", "image": swallowingimg05, "path": "", "secPath": "/swallowingwith-problem" },
        { "id": "5", "name": "Reflux", "image": swallowingimg06, "path": "/howoften", "secPath": "/confrm-step-yesno" },
        { "id": "6", "name": "Nausea", "image": swallowingimg07, "path": "/howoften", "secPath": "/swallowingnausea-problem" },
        { "id": "7", "name": "Pain with Swallowing", "image": swallowingimg08, "path": "/howoften", "secPath": "/swallowingpain-problem" },
        { "id": "8", "name": "Fear of Swallowing", "image": swallowingimg09, "path": "/howoften", "secPath": "/swallowingfear-problem" },
        { "id": "9", "name": "Losing Weight Without Trying", "image": swallowingimg04, "path": "/howoften", "secPath": "/confrm-step-yesno" },
        { "id": "10", "name": "Dry Mouth", "image": swallowingimg10, "path": "/howoften", "secPath": "/swallowingdrymouth-problem" },
        { "id": "11", "name": "Too Much", "image": swallowingimg11, "path": "/howoften", "secPath": "/confrm-step-yesno" },
        { "id": "12", "name": "No Appetite", "image": swallowingimg12, "path": "/howoften", "secPath": "/noappetite-problem" },
        { "id": "13", "name": "Trach", "image": swallowingimg13, "path": "/howoften", "secPath": "/swallowingtrach-problem" },
        { "id": "14", "name": "Feeding Tube", "image": swallowingimg04, "path": "/howoften", "secPath": "/swallowingfeedingtube-problem" },
        // { "id": "15", "name": "Something Else", "image": swallowingimg14, "path": "/howoften", "secPath": "/confrm-step-yesno" }
    ],

    "/swallowing-problem-sub": [
        { "id": "1", "name": "Choking", "image": swallowingimg04, "secPath": "/choking-problem-sub", "path": "/howoften" },
        { "id": "2", "name": "Food Sticking", "image": swallowingimg04, "secPath": "/foodsticking-problem", "path": "/howoften" },
        { "id": "3", "name": "Heartburn", "image": swallowingimg04, "secPath": "/heartburn-problem", "path": "/howoften" },
        { "id": "4", "name": "Pain with Swallowing", "image": swallowingimg04, "secPath": "/painwithswallowing-problem", "path": "/howoften" },
        { "id": "5", "name": "Fear of Swallowing", "image": swallowingimg04, "secPath": "/fearofswallowing-problem", "path": "/howoften" },
        { "id": "6", "name": "Dry Mouth", "image": swallowingimg04, "secPath": "/drymouth-problem", "path": "/howoften" },
        { "id": "7", "name": "Too Much", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "8", "name": "Trach", "image": swallowingimg04, "secPath": "/trachswallowingsub-problem", "path": "/howoften" },
        { "id": "9", "name": "Feeding Tube", "image": swallowingimg04, "secPath": "/feeding-tube-problem-sub", "path": "/howoften" },
    ],

    "/choking-problem-sub": swallowingDesises,
    "/foodsticking-problem": swallowingDesises,
    "/heartburn-problem": heartburnDesises,
    "/painwithswallowing-problem": painwithswallowingDesises,
    "/fearofswallowing-problem": fearofswallowingDesises,
    "/drymouth-problem": drymouthDesises,
    "/trachswallowingsub-problem": trachproblemDesises,
    "/mucussecretions-problem": mucussecretionsDesises,
    "/feeding-tube-problem-sub": feedingtubeDesises,
    "/trach-problem-sub": trachproblemsubDesises,
    "/trachmucusSecretions-problem": trachmucusSecretionsDesises,
    "/trachswallowing-problem": trachswallowingDesises,
    "/choking-problem": trachswallowingDesises,
    "/trachmain-problem": trachDesies,
    "/maintrachmucussecretions-problem": trachmucusSecretionsDesises,
    "/trachmainswallowing-problem": trachswallowingDesises,
    "/swallowingwith-problem": trachswallowingDesises,
    "/swallowingheartburn-problem": heartburnswallowingDesises,
    "/swallowingnausea-problem": nauseaSwallowingDesies,
    "/swallowingpain-problem": painwithswallowingDesises,
    "/swallowingfear-problem": fearofswallowingDesises,
    "/feeling-list-pain": painEmoji,
    "/swallowingdrymouth-problem": drymouthDesises,
    "/noappetite-problem": noappetiteDesies,
    "/swallowingtrach-problem": SwallowingTrachDesies,
    "/swallowingmucussecretions-problem": trachmucusSecretionsDesises,
    "/swallowingbreathingcoughing-problem": fearofswallowingDesises,
    "/swallowingtrachswallowing-problem": fearofswallowingDesises,
    "/swallowingfeedingtube-problem": swallowingfeedingtube,
    "/swallowingfeedingtubebowels-problem": swallowingfeedingtubebowelsDesiese,
    "/nausea-problem": [
        { "id": "1", "name": "Vomiting", "image": swallowingimg04, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "2", "name": "Constipation", "image": nausea02, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "3", "name": "Diarrhea", "image": nausea02, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "4", "name": "Cramping", "image": nausea03, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "5", "name": "Just Nausea", "image": nausea04, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "6", "name": "Something Else", "image": nausea05, "secPath": "/Whiteboard", "path": "/when" }
    ],
    "/bowels-problem": [
        { "id": "1", "name": "Constipation", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Diarrhea", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Gas / Bloating", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Cramping", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Blood", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Bed Pan", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Toilet", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Colostomy / Ostomy Bag", "image": swallowingimg04, "path": "/" },
        { "id": "9", "name": "Need Changed", "image": swallowingimg04, "path": "/" },
        { "id": "10", "name": "Feeding Tube", "image": swallowingimg04, "path": "/" },
        { "id": "11", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],

    "/urination-problem": [
        { "id": "1", "name": "Burning", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Frequent", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Urgency", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Very Little / Infrequent", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Blood", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Need Changed", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Catheter", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Toilet/Urinal", "image": swallowingimg04, "path": "/" },
        { "id": "9", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],

    "/fatigue-problem": [
        { "id": "1", "name": "Wake up Tired", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Trouble Sleeping", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "More than Usual", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "With Activity", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "All Day", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "With Medication", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "After Procedure", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],

    "/eating-problem": [
        { "id": "1", "name": "No Appetite", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Hungry / Thirsty", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Food Allergy", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Don’t Eat This", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Need Help Eating", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Losing Weight Without Trying", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Swallowing", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Taste Changes", "image": swallowingimg04, "path": "/" },
        { "id": "9", "name": "Dry Mouth", "image": swallowingimg04, "path": "/" },
        { "id": "10", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],

    "/medication-problem": [
        { "id": "1", "name": "Side Effects", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Hard to Swallow", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Information", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Too Many", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Too Little", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Timing", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Whole / Crushed / Liquid", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Don’t Want", "image": swallowingimg04, "path": "/" },
        { "id": "9", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],

    "/movement-problem": [
        { "id": "1", "name": "Weakness", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Weak on One Side", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Clumsy / Off Balance", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Numbness / Tingling", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Dizzy", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Trouble Walking", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],

    "/communication-problem": [
        { "id": "1", "name": "Hard to understand you", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Can’t find my words", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Hard to talk", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "No Voice", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "I’m confused", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Wrong words come out", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Don’t know where I am", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Memory trouble", "image": swallowingimg04, "path": "/" },
        { "id": "9", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],

    "/vision-problem": [
        { "id": "1", "name": "Double Vision", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Blurry", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Can’t See Left", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Can’t See Right", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Glasses", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Dizzy", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Headache", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],

    "/hearing-problem": [
        { "id": "1", "name": "Hearing Aids", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Can’t Hear", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Ringing", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Ear Pain", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Plugged", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Dizzy", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Write it Down", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],

    "/illness-problem": [
        { "id": "1", "name": "Fever", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Chills", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Achy", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Sore Throat", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Coughing", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Nausea/Vomiting", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Diarrhea", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Congested or Runny Nose", "image": swallowingimg04, "path": "/" },
        { "id": "9", "name": "Mucus / Secretions", "image": swallowingimg04, "path": "/" },
        { "id": "10", "name": "Appetite", "image": swallowingimg04, "path": "/" },
        { "id": "11", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],

    "/something-problem": [
        { "id": "1", "name": "Stroke Symptoms", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Fall", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Argument", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Trouble Sleeping", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Bloodwork/X-ray", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Need Changed", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Bad Touch", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Waited Too Long", "image": swallowingimg04, "path": "/" },
        { "id": "9", "name": "Feeding Tube Removed", "image": swallowingimg04, "path": "/" },
        { "id": "10", "name": "Trach Removed", "image": swallowingimg04, "path": "/" },
        { "id": "11", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],

    "/wound-problem": [
        { "id": "1", "name": "Infection", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Stitches/Staples", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Pain", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Swelling", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Leaking", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Itchy", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Dressing Change", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Reposition", "image": swallowingimg04, "path": "/" },
        { "id": "9", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],



    "/feeding-problem": [
        { "id": "1", "name": "Pain", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Remove", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Leaking", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Feel Full", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Reflux", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Bowels", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Information", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ],

    "/trach-problem": [
        { "id": "1", "name": "Mucus/Secretions", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Suction", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Cap", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Speaking Valve", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Remove", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Breathing/Coughing", "image": swallowingimg04, "path": "/" },
        { "id": "7", "name": "Pain", "image": swallowingimg04, "path": "/" },
        { "id": "8", "name": "Tight", "image": swallowingimg04, "path": "/" },
        { "id": "9", "name": "Itchy", "image": swallowingimg04, "path": "/" },
        { "id": "10", "name": "Leaking", "image": swallowingimg04, "path": "/" },
        { "id": "11", "name": "Swallowing", "image": swallowingimg04, "path": "/" },
        { "id": "12", "name": "Something Else", "image": swallowingimg04, "path": "/" }
    ]
}
