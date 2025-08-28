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

const painwithswallowingDesises = [
    { "id": "1", "name": "With Food", "image": swallowingimg04, "secPath": "", "path": "" },
    { "id": "2", "name": "With Drinks", "image": swallowingimg04, "secPath": "", "path": "" },
    { "id": "3", "name": "With Medication", "image": swallowingimg04, "secPath": "", "path": "" },
    { "id": "4", "name": "With Food / Drinks", "image": swallowingimg04, "secPath": "", "path": "" },
    { "id": "5", "name": "With Saliva", "image": swallowingimg04, "secPath": "", "path": "" },
    { "id": "6", "name": "Just Swallowing", "image": swallowingimg04, "secPath": "", "path": "" },
    { "id": "7", "name": "Something Else", "image": swallowingimg04, "secPath": "/Whiteboard", "path": "" },
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


export const diseasesData = {
    "/breathing-problem": [
        { "id": "1", "name": "Shortness of Breath", "image": dashimg01, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "2", "name": "Coughing", "image": dashimg02, "secPath": "/coughing-problem", "path": "" },
        { "id": "3", "name": "Chest Pain", "image": dashimg03, "secPath": "/chestpain-problem", "path": "" },
        { "id": "4", "name": "Choking", "image": dashimg04, "secPath": "/choking-problem", "path": "" },
        { "id": "5", "name": "Mucus / Secretions", "image": dashimg05, "secPath": "/mucus-problem", "path": "" },
        { "id": "6", "name": "Congested or Runny Nose", "image": dashimg06, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "7", "name": "Heavy / Thick", "image": dashimg07, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "8", "name": "CPAP / BiPAP", "image": dashimg08, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "9", "name": "Breathing Treatment", "image": dashimg09, "secPath": "/confrm-step-yesno", "path": "/when" },
        { "id": "10", "name": "Trach", "image": dashimg10, "secPath": "trach-problem", "path": "" },
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
    "/color-problem": [
        { "id": "1", "name": "Green", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "2", "name": "Yellow", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "3", "name": "Brown", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "4", "name": "White", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
        { "id": "5", "name": "Blood ", "image": dashimg04, "secPath": "/confrm-step-yesno", "path": "/howoften" },
    ],
    "/mucus-problem": [
        { "id": "1", "name": "Shortness of Breath", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Suction", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Thick Mucus", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Dry Mouth", "image": swallowingimg04, "path": "/" },
        { "id": "5", "name": "Too Much", "image": swallowingimg04, "path": "/" },
        { "id": "6", "name": "Color", "image": swallowingimg04, "path": "/" }
    ],
    "/swallowing-problem": [
        { "id": "1", "name": "Choking", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Food Sticking", "image": swallowingimg04, "path": "/" },
        { "id": "3", "name": "Heartburn", "image": swallowingimg04, "path": "/" },
        { "id": "4", "name": "Coughing", "image": swallowingimg05, "path": "/" },
        { "id": "5", "name": "Reflux", "image": swallowingimg06, "path": "/" },
        { "id": "6", "name": "Nausea", "image": swallowingimg07, "path": "/" },
        { "id": "7", "name": "Pain with Swallowing", "image": swallowingimg08, "path": "/" },
        { "id": "8", "name": "Fear of Swallowing", "image": swallowingimg09, "path": "/" },
        { "id": "9", "name": "Losing Weight Without Trying", "image": swallowingimg04, "path": "/" },
        { "id": "10", "name": "Dry Mouth", "image": swallowingimg10, "path": "/" },
        { "id": "11", "name": "Too Much", "image": swallowingimg11, "path": "/" },
        { "id": "12", "name": "No Appetite", "image": swallowingimg12, "path": "/" },
        { "id": "13", "name": "Trach", "image": swallowingimg13, "path": "/" },
        { "id": "14", "name": "Feeding Tube", "image": swallowingimg04, "path": "/" },
        { "id": "15", "name": "Something Else", "image": swallowingimg14, "path": "/" }
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

    "/nausea-problem": [
        { "id": "1", "name": "Vomiting", "image": swallowingimg04, "path": "/" },
        { "id": "2", "name": "Constipation", "image": nausea02, "path": "/" },
        { "id": "3", "name": "Diarrhea", "image": nausea02, "path": "/" },
        { "id": "4", "name": "Cramping", "image": nausea03, "path": "/" },
        { "id": "5", "name": "Just Nausea", "image": nausea04, "path": "/" },
        { "id": "6", "name": "Something Else", "image": nausea05, "path": "/" }
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
