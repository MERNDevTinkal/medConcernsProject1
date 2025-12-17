import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech";
import { GlobalContext } from "../../context/DiseaseContext";

import { bodyImages } from "./bodyPartsImages.jsx";
import Cookies from "js-cookie";
import {
  Femalebodyback,
  Frontfemale,
  DigramBack,
  DigramFront,
  Refresh,
} from "../../Component/DiseasesData/images.jsx";
import {
  // Female English
  Abdomen,
  ankle,
  back,
  butt,
  cabeza_head,
  cheek,
  ChestOrBreasts,
  chin,
  ear,
  Elbow,
  eye,
  fingers,
  footOrToes,
  forearm,
  forehead,
  hand,
  Head,
  hip,
  knee,
  lowerBack,
  lowerLeg,
  mouth,
  Neck,
  nose,
  PelvisOrGenitals,
  Shoulder,
  thigh,
  UpperArm,
  wrist,

  // Female Spanish
  abdomenFemaleSpanish,
  Abdomen_abdomenFemaleSpanish,
  antebrazoFemaleSpanish,
  barbillaFemaleSpanish,
  bocaFemaleSpanish,
  brazoSuperiorFemaleSpanish,
  cabezaFemaleSpanish,
  caderaFemaleSpanish,
  codoFemaleSpanish,
  cuelloFemaleSpanish,
  dedosFemaleSpanish,
  espaldaFemaleSpanish,
  frenteFemaleSpanish,
  hombroFemaleSpanish,
  Las_nalgasFemaleSpanish,
  manoFemaleSpanish,
  mejillaFemaleSpanish,
  munecaFemaleSpanish,
  musloFemaleSpanish,
  narizFemaleSpanish,
  ojoFemaleSpanish,
  orejaFemaleSpanish,
  parteInferiorDeLaEspaldaFemaleSpanish,
  parteInferiorDeLaPiernaFemaleSpanish,
  pechoOMamaFemaleSpanish,
  pelvisOGenitalesFemaleSpanish,
  pieODedosDeLosPiesFemaleSpanish,
  rodillaFemaleSpanish,
  tobilloFemaleSpanish,

  // Male English
  Abdomen_comMale,
  AnkleMale,
  BackMale,
  buttMale,
  Cheeks_comMale,
  chestOrBreastsMale,
  ChinMale,
  EarMale,
  Elbow_comMale,
  EyeMale,
  FingersMale,
  FootOrToes_comMale,
  Forearm_comMale,
  Forehead_comMale,
  HandMale,
  HeadMale,
  HipMale,
  Hombro_shoulderMale,
  KneeMale,
  LowerBackMale,
  lowerLegMale,
  MouthMale,
  neckMale,
  NoseMale,
  PelvisOrGenitals_comMale,
  ShoulderMale,
  Thigh_comMale,
  UpperArmMale,
  WristMale,

  // Male Spanish
  antebrazoMAleSpanish,
  BarbillaMAleSpanish,
  bocaMAleSpanish,
  brazoSuperiorMAleSpanish,
  CodoMAleSpanish,
  CuelloMAleSpanish,
  dedosMAleSpanish,
  EspaldaMAleSpanish,
  caderaMAleSpanish,
  nalgasMAleSpanish,
  manoMAleSpanish,
  MejillaMAleSpanish,
  munecaMAleSpanish,
  musloMAleSpanish,
  narizMAleSpanish,
  ojoMAleSpanish,
  orejaMAleSpanish,
  parteInferiorEspaldaMAleSpanish,
  parteInferiorPiernaMAleSpanish,
  pechoMAleSpanish,
  pelvisMAleSpanish,
  pieMAleSpanish,
  RodillaMAleSpanish,
} from "../../Component/DiseasesData/audio.jsx";
function makeRegion(name, x1, y1, x2, y2, audio) {
  return {
    name,
    audio: audio,
    x1: Math.min(x1, x2),
    y1: Math.min(y1, y2),
    x2: Math.max(x1, x2),
    y2: Math.max(y1, y2),
  };
}

const backRegions = [
  makeRegion(`Back`, 124, 54, 244, 156, BackMale),
  makeRegion(`Right Elbow`, 220, 12, 250, 50, Elbow_comMale),
  makeRegion(`Right Forearm`, 248, 13, 294, 35, Forearm_comMale),
  makeRegion(`Right Arm`, 153, 28, 225, 49, UpperArmMale),
  makeRegion(`Right Hand`, 310, 12, 330, 35, HandMale),
  makeRegion(`Right Finger`, 335, 12, 360, 35, FingersMale),
  makeRegion(`Right Lower Leg`, 458, 60, 580, 100, lowerLegMale),
  makeRegion(`Left Lower Leg`, 458, 120, 580, 150, lowerLegMale),
  makeRegion(`Right Foot & Toe`, 590, 120, 630, 150, FootOrToes_comMale),
  makeRegion(`Left Foot & Toe`, 590, 60, 630, 100, FootOrToes_comMale),
  makeRegion(`Right Knee`, 430, 60, 460, 100, KneeMale),
  makeRegion(`Left Knee`, 430, 120, 460, 150, KneeMale),
  makeRegion(`Left Forearm`, 247, 177, 293, 205, Forearm_comMale),
  makeRegion(`Left Arm`, 149, 171, 220, 199, UpperArmMale),
  makeRegion(`Left Elbow`, 225, 170, 250, 211, Elbow_comMale),
  makeRegion(`Left Hand`, 310, 210, 330, 190, HandMale),
  makeRegion(`Left Finger`, 335, 210, 350, 190, FingersMale),
  makeRegion(`Left Shoulder`, 108, 162, 149, 190, ShoulderMale),
  makeRegion(`Right Shoulder`, 114, 28, 151, 65, ShoulderMale),
  makeRegion(`Right Wrist`, 297, 14, 306, 31, WristMale),
  makeRegion(`Left Wrist`, 294, 190, 303, 206, WristMale),
  makeRegion(`Lower Back`, 245, 67, 271, 155, LowerBackMale),
  makeRegion(`Right Butt`, 277, 56, 344, 112, buttMale),
  makeRegion(`Left Butt`, 261, 121, 344, 168, buttMale),
  makeRegion(`Right Thigh`, 347, 56, 425, 101, Thigh_comMale),
  makeRegion(`Left Thigh`, 344, 114, 413, 168, Thigh_comMale),
  makeRegion(`Forhead`, 16, 91, 75, 127, Forehead_comMale),
  makeRegion(`Right Ear`, 44, 76, 69, 88, EarMale),
  makeRegion(`Left Ear`, 47, 135, 69, 141, EarMale),
];

const backRegionsSpanish = [
  makeRegion(`Espalda`, 124, 54, 244, 156, EspaldaMAleSpanish),
  makeRegion(`Codo Derecho`, 220, 12, 250, 50, CodoMAleSpanish),
  makeRegion(`Antebrazo Derecho`, 248, 13, 294, 35, antebrazoMAleSpanish),
  makeRegion(`Brazo Derecho`, 153, 28, 225, 49, brazoSuperiorMAleSpanish),
  makeRegion(`Mano Derecha`, 310, 12, 330, 35, manoMAleSpanish),
  makeRegion(`Dedo Derecho`, 335, 12, 360, 35, dedosMAleSpanish),
  makeRegion(
    `Pierna Inferior Derecha`,
    458,
    60,
    580,
    100,
    parteInferiorPiernaMAleSpanish
  ),
  makeRegion(
    `Pierna Inferior Izquierda`,
    458,
    120,
    580,
    150,
    parteInferiorPiernaMAleSpanish
  ),
  makeRegion(`Pie y Dedos Izquierdos`, 590, 120, 630, 150, pieMAleSpanish),
  makeRegion(`Pie y Dedos Derechos`, 590, 60, 630, 100, pieMAleSpanish),
  makeRegion(`Rodilla Derecha`, 430, 60, 460, 100, RodillaMAleSpanish),
  makeRegion(`Rodilla Izquierda`, 430, 120, 460, 150, RodillaMAleSpanish),
  makeRegion(`Antebrazo Izquierdo`, 247, 177, 293, 205, antebrazoMAleSpanish),
  makeRegion(`Brazo Izquierdo`, 149, 171, 220, 199, brazoSuperiorMAleSpanish),
  makeRegion(`Codo Izquierdo`, 225, 170, 250, 211, CodoMAleSpanish),
  makeRegion(`Mano Izquierda`, 310, 210, 330, 190, manoMAleSpanish),
  makeRegion(`Dedo Izquierdo`, 335, 210, 350, 190, dedosMAleSpanish),
  makeRegion(`Hombro Izquierdo`, 108, 162, 149, 190, EspaldaMAleSpanish),
  makeRegion(`Hombro Derecho`, 114, 28, 151, 65, EspaldaMAleSpanish),
  makeRegion(`Muñeca Derecha`, 297, 14, 306, 31, munecaMAleSpanish),
  makeRegion(`Muñeca Izquierda`, 294, 190, 303, 206, munecaMAleSpanish),
  makeRegion(`Zona Lumbar`, 245, 67, 271, 155, parteInferiorEspaldaMAleSpanish),
  makeRegion(`Glúteo Derecho`, 277, 56, 344, 112, nalgasMAleSpanish),
  makeRegion(`Glúteo Izquierdo`, 261, 121, 344, 168, nalgasMAleSpanish),
  makeRegion(`Muslo Derecho`, 347, 56, 425, 101, musloMAleSpanish),
  makeRegion(`Muslo Izquierdo`, 344, 114, 413, 168, musloMAleSpanish),
  makeRegion(`Frente`, 16, 91, 75, 127, EspaldaMAleSpanish),
  makeRegion(`Oreja Derecha`, 44, 76, 69, 88, orejaMAleSpanish),
  makeRegion(`Oreja Izquierda`, 47, 135, 69, 141, orejaMAleSpanish),
];

const frontRegions = [
  makeRegion(`Forhead`, 20, 80, 40, 128, Forehead_comMale),
  makeRegion(`Eye`, 45, 80, 60, 100, EyeMale),
  makeRegion(`Eye`, 45, 105, 60, 122, EyeMale),
  makeRegion(`Nose`, 50, 95, 70, 105, NoseMale),
  makeRegion(`Mouth`, 70, 112, 80, 90, MouthMale),
  makeRegion(`Right Ear`, 50, 70, 70, 80, EarMale),
  makeRegion(`Left Ear`, 50, 125, 70, 135, EarMale),
  makeRegion(`Neck`, 90, 80, 110, 120, neckMale),
  makeRegion(`Chest & Breast`, 120, 50, 185, 150, chestOrBreastsMale),
  makeRegion(`Abdomen`, 220, 145, 265, 60, Abdomen_comMale),
  makeRegion(`Pelvis / Genitals`, 290, 88, 330, 110, PelvisOrGenitals_comMale),
  makeRegion(`Right Hip`, 280, 45, 320, 70, HipMale),
  makeRegion(`Left Hip`, 280, 160, 320, 135, HipMale),
  makeRegion(`Left Thigh`, 320, 115, 385, 160, Thigh_comMale),
  makeRegion(`Right Thigh`, 320, 45, 385, 90, Thigh_comMale),
  makeRegion(`Right Knee`, 400, 90, 440, 55, KneeMale),
  makeRegion(`Left Knee`, 400, 110, 440, 145, KneeMale),
  makeRegion(`Right Lower Leg`, 450, 58, 560, 90, lowerLegMale),
  makeRegion(`Left Lower Leg`, 450, 107, 560, 140, lowerLegMale),
  makeRegion(`Right Foot & Toe`, 570, 110, 610, 134, FootOrToes_comMale),
  makeRegion(`Left Foot & Toe`, 570, 65, 610, 90, FootOrToes_comMale),
  makeRegion(`Left Shoulder`, 180, 160, 117, 175, ShoulderMale),
  makeRegion(`Left Arm`, 143, 155, 209, 182, UpperArmMale),
  makeRegion(`Left Hand`, 298, 178, 321, 200, HandMale),
  makeRegion(`Finger`, 330, 178, 340, 200, FingersMale),
  makeRegion(`Right Shoulder`, 97, 19, 131, 41, ShoulderMale),
  makeRegion(`Right Arm`, 150, 10, 221, 49, UpperArmMale),
  makeRegion(`Right Hand`, 300, 8, 330, 20, HandMale),
  makeRegion(`Finger`, 330, 12, 340, 30, FingersMale),
  makeRegion(`Left Forearm`, 221, 162, 279, 191, Forearm_comMale),
  makeRegion(`Right Forearm`, 230, 7, 288, 39, Forearm_comMale),
  makeRegion(`Left Cheek`, 59, 111, 70, 124, Cheeks_comMale),
  makeRegion(`Right Cheek`, 58, 84, 70, 94, Cheeks_comMale),
  makeRegion(`Chin`, 85, 94, 88, 112, ChinMale),
  makeRegion(`Left Wrist`, 282, 179, 295, 195, WristMale),
  makeRegion(`Right Wrist`, 289, 9, 303, 27, WristMale),
];

const frontRegionsSpanish = [
  makeRegion(`Frente`, 20, 80, 40, 128, EspaldaMAleSpanish),
  makeRegion(`Ojo`, 45, 80, 60, 100, ojoMAleSpanish),
  makeRegion(`Ojo`, 45, 105, 60, 122, ojoMAleSpanish),
  makeRegion(`Nariz`, 50, 95, 70, 105, narizMAleSpanish),
  makeRegion(`Boca`, 70, 112, 80, 90, bocaMAleSpanish),
  makeRegion(`Oreja Derecha`, 50, 70, 70, 80, orejaMAleSpanish),
  makeRegion(`Oreja Izquierda`, 50, 125, 70, 135, orejaMAleSpanish),
  makeRegion(`Cuello`, 90, 80, 110, 120, CuelloMAleSpanish),
  makeRegion(`Pecho y Senos`, 120, 50, 185, 150, pechoMAleSpanish),
  makeRegion(`Abdomen`, 220, 145, 265, 60, EspaldaMAleSpanish),
  makeRegion(`Pelvis / Genitales`, 290, 88, 330, 110, pelvisMAleSpanish),
  makeRegion(`Cadera Derecha`, 280, 45, 320, 70, caderaMAleSpanish),
  makeRegion(`Cadera Izquierda`, 280, 160, 320, 135, caderaMAleSpanish),
  makeRegion(`Muslo Izquierdo`, 320, 115, 385, 160, musloMAleSpanish),
  makeRegion(`Muslo Derecho`, 320, 45, 385, 90, musloMAleSpanish),
  makeRegion(`Rodilla Derecha`, 400, 90, 440, 55, RodillaMAleSpanish),
  makeRegion(`Rodilla Izquierda`, 400, 110, 440, 145, RodillaMAleSpanish),
  makeRegion(
    `Pierna Inferior Derecha`,
    450,
    58,
    560,
    90,
    parteInferiorPiernaMAleSpanish
  ),
  makeRegion(
    `Pierna Inferior Izquierda`,
    450,
    107,
    560,
    140,
    parteInferiorPiernaMAleSpanish
  ),
  makeRegion(`Pie y Dedos Izquierdos`, 570, 110, 610, 134, pieMAleSpanish),
  makeRegion(`Pie y Dedos Derechos`, 570, 65, 610, 90, pieMAleSpanish),
  makeRegion(`Hombro Izquierdo`, 180, 160, 117, 175, EspaldaMAleSpanish),
  makeRegion(`Brazo Izquierdo`, 143, 155, 209, 182, brazoSuperiorMAleSpanish),
  makeRegion(`Mano Izquierda`, 298, 178, 321, 200, manoMAleSpanish),
  makeRegion(`Dedo Izquierdo`, 330, 178, 340, 200, dedosMAleSpanish),
  makeRegion(`Hombro Derecho`, 97, 19, 131, 41, EspaldaMAleSpanish),
  makeRegion(`Brazo Derecho`, 150, 10, 221, 49, brazoSuperiorMAleSpanish),
  makeRegion(`Mano Derecha`, 300, 8, 330, 20, manoMAleSpanish),
  makeRegion(`Dedo Derecho`, 330, 12, 340, 30, dedosMAleSpanish),
  makeRegion(`Antebrazo Izquierdo`, 221, 162, 279, 191, antebrazoMAleSpanish),
  makeRegion(`Antebrazo Derecho`, 230, 7, 288, 39, antebrazoMAleSpanish),
  makeRegion(`Mejilla Izquierda`, 59, 111, 70, 124, MejillaMAleSpanish),
  makeRegion(`Mejilla Derecha`, 58, 84, 70, 94, MejillaMAleSpanish),
  makeRegion(`Barbilla`, 85, 94, 88, 112, BarbillaMAleSpanish),
  makeRegion(`Muñeca Izquierda`, 282, 179, 295, 195, munecaMAleSpanish), // Left Wrist
  makeRegion(`Muñeca Derecha`, 289, 9, 303, 27, munecaMAleSpanish), // Right Wrist
];

const femalefrontRegions = [
  makeRegion(`Chest & Breast`, 385, 192, 602, 444, ChestOrBreasts),
  makeRegion(`Abdomen`, 623, 211, 844, 413, Abdomen),
  makeRegion(`Left Shoulder`, 353, 441, 518, 494, Shoulder),
  makeRegion(`Left Arm`, 497, 441, 644, 514, UpperArm),
  makeRegion(`Left Hand`, 883, 522, 942, 599, hand),
  makeRegion(`Left Finger`, 953, 536, 1016, 613, fingers),
  makeRegion(`Neck`, 304, 266, 364, 340, Neck),
  makeRegion(`Right Shoulder`, 364, 119, 494, 185, Shoulder),
  makeRegion(`Right Arm`, 448, 122, 644, 161, UpperArm),
  makeRegion(`Right Hand`, 886, 28, 953, 98, hand),
  makeRegion(`Right Finger`, 932, 17, 1034, 59, fingers),
  makeRegion(`Right Hip`, 830, 147, 946, 220, hip),
  makeRegion(`Right Thigh`, 946, 150, 1174, 287, thigh),
  makeRegion(`Right Knee`, 1139, 189, 1254, 287, knee),
  makeRegion(`Right Lower Leg`, 1261, 171, 1573, 255, lowerLeg),
  makeRegion(`Right Foot & Toe`, 1566, 199, 1672, 255, footOrToes),
  makeRegion(`Left Hip`, 802, 406, 939, 483, hip),
  makeRegion(`Left Thigh`, 939, 315, 1170, 441, thigh),
  makeRegion(`Left Knee`, 1167, 322, 1251, 423, knee),
  makeRegion(`Left Lower Leg`, 1268, 329, 1556, 406, lowerLeg),
  makeRegion(`Left Foot & Toe`, 1559, 325, 1672, 413, footOrToes),
  makeRegion(`Forhead`, 133, 238, 171, 367, forehead),
  makeRegion(`Eye`, 185, 252, 217, 297, eye),
  makeRegion(`Eye`, 185, 311, 224, 364, eye),
  makeRegion(`Left Ear`, 185, 367, 241, 395, ear),
  makeRegion(`Right Ear`, 189, 213, 255, 248, ear),
  makeRegion(`Nose`, 196, 297, 255, 318, nose),
  makeRegion(`Mouth`, 259, 287, 297, 332, mouth),
  makeRegion(`Pelvis / Genitals`, 877, 241, 912, 367, PelvisOrGenitals),
  makeRegion(`Left Cheek`, 220, 329, 265, 353, cheek),
  makeRegion(`Right Cheek`, 223, 252, 262, 287, cheek),
  makeRegion(`Right Forearm`, 679, 49, 858, 108, forearm),
  makeRegion(`Left Forearm`, 683, 486, 855, 570, forearm),
  makeRegion(`Left Wrist`, 858, 532, 883, 584, wrist),
  makeRegion(`Right Wrist`, 851, 42, 886, 91, wrist),
  makeRegion(`Chin`, 290, 290, 297, 329, chin),
];

const femaleBackImage = [
  makeRegion(`Back`, 364, 168, 679, 430, back),
  makeRegion(`Lower Back`, 679, 196, 777, 444, lowerBack),
  makeRegion(`Elbow`, 588, 476, 651, 539, Elbow),
  makeRegion(`Left Arm`, 367, 473, 578, 501, UpperArm),
  makeRegion(`Left Forearm`, 637, 536, 851, 571, forearm),
  makeRegion(`Left Hand`, 890, 532, 960, 599, hand),
  makeRegion(`Left Finger`, 974, 532, 1013, 606, fingers),
  makeRegion(`Right Arm`, 381, 122, 595, 164, UpperArm),
  makeRegion(`Right Forearm`, 648, 59, 862, 105, forearm),
  makeRegion(`Right Hand`, 872, 38, 956, 80, hand),
  makeRegion(`Right Finger`, 949, 10, 1013, 73, fingers),
  makeRegion(`Right Thigh`, 942, 147, 1177, 273, thigh),
  makeRegion(`Right Knee`, 1184, 178, 1247, 287, knee),
  makeRegion(`Right Lower Leg`, 1251, 168, 1595, 262, lowerLeg),
  makeRegion(`Right Foot & Toe`, 1609, 157, 1682, 269, footOrToes),
  makeRegion(`Left Thigh`, 914, 325, 1181, 437, thigh),
  makeRegion(`Left Knee`, 1191, 325, 1293, 434, knee),
  makeRegion(`Left Lower Leg`, 1297, 329, 1605, 402, lowerLeg),
  makeRegion(`Left Foot & Toe`, 1602, 325, 1676, 406, footOrToes),
  makeRegion(`Forhead`, 76, 269, 234, 346, forehead),
  makeRegion(`Right Ear`, 181, 220, 223, 255, ear),
  makeRegion(`Left Ear`, 167, 360, 220, 385, ear),
  makeRegion(`Right Shoulder`, 329, 133, 420, 185, Shoulder),
  makeRegion(`Left Shoulder`, 325, 434, 420, 500, Shoulder),
  makeRegion(`Right Butt`, 735, 168, 911, 297, butt),
  makeRegion(`Left Butt`, 746, 318, 907, 458, butt),
  makeRegion(`Right Wrist`, 851, 542, 883, 588, wrist),
  makeRegion(`Left Wrist`, 833, 544, 862, 582, wrist),
];

const femalefrontRegionsSpanish = [
  makeRegion(`Pecho y Senos`, 385, 192, 602, 444, pechoOMamaFemaleSpanish), // Chest & Breast
  makeRegion(`Abdomen`, 623, 211, 844, 413, abdomenFemaleSpanish), // Abdomen
  makeRegion(`Hombro Izquierdo`, 353, 441, 518, 494, hombroFemaleSpanish), // Left Shoulder
  makeRegion(`Brazo Izquierdo`, 497, 441, 644, 514, brazoSuperiorFemaleSpanish), // Left Arm
  makeRegion(`Mano Izquierda`, 883, 522, 942, 599, manoFemaleSpanish), // Left Hand
  makeRegion(`Dedo Izquierdo`, 953, 536, 1016, 613, dedosFemaleSpanish), // Left Finger
  makeRegion(`Cuello`, 304, 266, 364, 340, cuelloFemaleSpanish), // Neck
  makeRegion(`Hombro Derecho`, 364, 119, 494, 185, hombroFemaleSpanish), // Right Shoulder
  makeRegion(`Brazo Derecho`, 448, 122, 644, 161, brazoSuperiorFemaleSpanish), // Right Arm
  makeRegion(`Mano Derecha`, 886, 28, 953, 98, manoFemaleSpanish), // Right Hand
  makeRegion(`Dedo Derecho`, 932, 17, 1034, 59, dedosFemaleSpanish), // Right Finger
  makeRegion(`Cadera Derecha`, 830, 147, 946, 220, caderaFemaleSpanish), // Right Hip
  makeRegion(`Muslo Derecho`, 946, 150, 1174, 287, musloFemaleSpanish), // Right Thigh
  makeRegion(`Rodilla Derecha`, 1139, 189, 1254, 287, rodillaFemaleSpanish), // Right Knee
  makeRegion(
    `Pierna Inferior Derecha`,
    1261,
    171,
    1573,
    255,
    parteInferiorDeLaPiernaFemaleSpanish
  ), // Right Lower Leg
  makeRegion(
    `Pie y Dedos Derechos`,
    1566,
    199,
    1672,
    255,
    pieODedosDeLosPiesFemaleSpanish
  ), // Foot & Toe
  makeRegion(`Cadera Izquierda`, 802, 406, 939, 483, caderaFemaleSpanish), // Left Hip
  makeRegion(`Muslo Izquierdo`, 939, 315, 1170, 441, musloFemaleSpanish), // Left Thigh
  makeRegion(`Rodilla Izquierda`, 1167, 322, 1251, 423, rodillaFemaleSpanish), // Left Knee
  makeRegion(
    `Pierna Inferior Izquierda`,
    1268,
    329,
    1556,
    406,
    parteInferiorDeLaPiernaFemaleSpanish
  ), // Left Lower Leg
  makeRegion(
    `Pie y Dedos Izquierdos`,
    1559,
    325,
    1672,
    413,
    pieODedosDeLosPiesFemaleSpanish
  ), // Foot & Toe
  makeRegion(`Frente`, 133, 238, 171, 367, frenteFemaleSpanish), // Forhead
  makeRegion(`Ojo`, 185, 252, 217, 297, ojoFemaleSpanish), // Eye
  makeRegion(`Ojo`, 185, 311, 224, 364, ojoFemaleSpanish), // Eye
  makeRegion(`Oreja Izquierda`, 185, 367, 241, 395, orejaFemaleSpanish), // Left Ear
  makeRegion(`Oreja Derecha`, 189, 213, 255, 248, orejaFemaleSpanish), // Right Ear
  makeRegion(`Nariz`, 196, 297, 255, 318, narizFemaleSpanish), // Nose
  makeRegion(`Boca`, 259, 287, 297, 332, bocaFemaleSpanish), // Mouth
  makeRegion(
    `Pelvis / Genitales`,
    877,
    241,
    912,
    367,
    pelvisOGenitalesFemaleSpanish
  ), // Pelvis / Genitals
  makeRegion(`Mejilla Izquierda`, 220, 329, 265, 353, mejillaFemaleSpanish), // Left Cheek
  makeRegion(`Mejilla Derecha`, 223, 252, 262, 287, mejillaFemaleSpanish), // Right Cheek
  makeRegion(`Antebrazo Derecho`, 679, 49, 858, 108, antebrazoFemaleSpanish), // Right Forearm
  makeRegion(`Antebrazo Izquierdo`, 683, 486, 855, 570, antebrazoFemaleSpanish), // Left Forearm
  makeRegion(`Muñeca Izquierda`, 858, 532, 883, 584, munecaFemaleSpanish), // Left Wrist
  makeRegion(`Muñeca Derecha`, 851, 42, 886, 91, munecaFemaleSpanish), // Right Wrist
  makeRegion(`Barbilla`, 290, 290, 297, 329, barbillaFemaleSpanish), // Chin
];

const femaleBackImageSpanish = [
  makeRegion(`Espalda`, 364, 168, 679, 430, espaldaFemaleSpanish), // Back
  makeRegion(
    `Zona Lumbar`,
    679,
    196,
    777,
    444,
    parteInferiorDeLaEspaldaFemaleSpanish
  ), // Lower Back
  makeRegion(`Codo`, 588, 476, 651, 539, codoFemaleSpanish), // Elbow
  makeRegion(`Brazo Izquierdo`, 367, 473, 578, 501, brazoSuperiorFemaleSpanish), // Left Arm
  makeRegion(`Antebrazo Izquierdo`, 637, 536, 851, 571, antebrazoFemaleSpanish), // Left Forearm
  makeRegion(`Mano Izquierda`, 890, 532, 960, 599, manoFemaleSpanish), // Left Hand
  makeRegion(`Dedo Izquierdo`, 974, 532, 1013, 606, dedosFemaleSpanish), // Left Finger
  makeRegion(`Brazo Derecho`, 381, 122, 595, 164, brazoSuperiorFemaleSpanish), // Right Arm
  makeRegion(`Antebrazo Derecho`, 648, 59, 862, 105, antebrazoFemaleSpanish), // Right Forearm
  makeRegion(`Mano Derecha`, 872, 38, 956, 80, manoFemaleSpanish), // Right Hand
  makeRegion(`Dedo Derecho`, 949, 10, 1013, 73, dedosFemaleSpanish), // Right Finger
  makeRegion(`Muslo Derecho`, 942, 147, 1177, 273, musloFemaleSpanish), // Right Thigh
  makeRegion(`Rodilla Derecha`, 1184, 178, 1247, 287, rodillaFemaleSpanish), // Right Knee
  makeRegion(
    `Pierna Inferior Derecha`,
    1251,
    168,
    1595,
    262,
    parteInferiorDeLaPiernaFemaleSpanish
  ), // Right Lower Leg
  makeRegion(
    `Pie y Dedos Derechos`,
    1609,
    157,
    1682,
    269,
    pieODedosDeLosPiesFemaleSpanish
  ), // Right Foot & Toe
  makeRegion(`Muslo Izquierdo`, 914, 325, 1181, 437, musloFemaleSpanish), // Left Thigh
  makeRegion(`Rodilla Izquierda`, 1191, 325, 1293, 434, rodillaFemaleSpanish), // Left Knee
  makeRegion(
    `Pierna Inferior Izquierda`,
    1297,
    329,
    1605,
    402,
    parteInferiorDeLaPiernaFemaleSpanish
  ), // Left Lower Leg
  makeRegion(
    `Pie y Dedos Izquierdos`,
    1602,
    325,
    1676,
    406,
    pieODedosDeLosPiesFemaleSpanish
  ), // Left Foot & Toe
  makeRegion(`Frente`, 76, 269, 234, 346, frenteFemaleSpanish), // Forhead
  makeRegion(`Oreja Derecha`, 181, 220, 223, 255, orejaFemaleSpanish), // Right Ear
  makeRegion(`Oreja Izquierda`, 167, 360, 220, 385, orejaFemaleSpanish), // Left Ear
  makeRegion(`Hombro Derecho`, 329, 133, 420, 185, hombroFemaleSpanish), // Right Shoulder
  makeRegion(`Hombro Izquierdo`, 325, 434, 420, 500, hombroFemaleSpanish), // Left Shoulder
  makeRegion(`Glúteo Derecho`, 735, 168, 911, 297, Las_nalgasFemaleSpanish), // Right Butt
  makeRegion(`Glúteo Izquierdo`, 746, 318, 907, 458, Las_nalgasFemaleSpanish), // Left Butt
  makeRegion(`Muñeca Derecha`, 851, 542, 883, 588, munecaFemaleSpanish), // Right Wrist
  makeRegion(`Muñeca Izquierda`, 833, 544, 862, 582, munecaFemaleSpanish), // Left Wrist
];

const PADDING = 0;

const PainDiagram = ({ selectedGender, selectedLanguage }) => {
  const [marker, setMarker] = useState(null);
  const isSpeakingRef = useRef(false);

  const [croppedPart, setCroppedPart] = useState(null);
  const location = useLocation();
  const mainpath = location.pathname;
  const [isfront, setIsfront] = useState(false);
  const canvasRef = useRef(null);
  const cropSize = 100;
  const navigate = useNavigate();
  const [bodyImage, setBodyImage] = useState("");
  const { addOrUpdateSummary } = useContext(GlobalContext);
  const replaceString = (bodyName) => {
    const replacements = [
      { en: "left", es: "izquierda" },
      { en: "right", es: "derecha" },
    ];
    let result = bodyName;
    replacements.forEach(({ en, es }) => {
      const regexEn = new RegExp(en, "gi");
      const regexEs = new RegExp(es, "gi");

      result = result.replace(regexEn, "").replace(regexEs, "");
    });
    return result.replace(/\s+/g, " ").trim();
  };

  const handleImageClick = (e) => {
    if (isSpeakingRef.current) return;
    isSpeakingRef.current = true;
    const img = e.target;
    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const realX = clickX * scaleX;
    const realY = clickY * scaleY;

    const activeRegions = isfront
      ? selectedLanguage === "Spanish"
        ? selectedGender === "Female"
          ? femaleBackImageSpanish
          : backRegionsSpanish
        : selectedGender === "Female"
        ? femaleBackImage
        : backRegions
      : selectedLanguage === "Spanish"
      ? selectedGender === "Female"
        ? femalefrontRegionsSpanish
        : frontRegionsSpanish
      : selectedGender === "Female"
      ? femalefrontRegions
      : frontRegions;
    let clickedRegion =
      activeRegions.find(
        (r) =>
          realX >= r.x1 - PADDING &&
          realX <= r.x2 + PADDING &&
          realY >= r.y1 - PADDING &&
          realY <= r.y2 + PADDING
      ) || null;
    if (!clickedRegion) {
      let minDist = Infinity;
      activeRegions.forEach((r) => {
        const cx = (r.x1 + r.x2) / 2;
        const cy = (r.y1 + r.y2) / 2;
        const d = Math.hypot(realX - cx, realY - cy);
        if (d < minDist) {
          minDist = d;
          clickedRegion = r;
        }
      });
    }
    const cleanedName = clickedRegion.name
      .replace(/^(Right|Left)\s+/i, "") // English
      .replace(/^(Derecho|Izquierdo|Derecha|Izquierda)\s+/i, ""); // Spanish

    // Speak the selected name
    getTextToSpeech(
      cleanedName,
      selectedLanguage === "Spanish" ? "es-ES" : "",
      clickedRegion?.audio
    );
    const imageObj = new Image();
    imageObj.src = bodyImage;
    imageObj.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let startX = realX - cropSize / 2;
      let startY = realY - cropSize / 2;

      if (startX < 0) startX = 0;
      if (startY < 0) startY = 0;
      if (startX + cropSize > imageObj.naturalWidth)
        startX = imageObj.naturalWidth - cropSize;
      if (startY + cropSize > imageObj.naturalHeight)
        startY = imageObj.naturalHeight - cropSize;
      canvas.width = cropSize;
      canvas.height = cropSize;
      ctx.drawImage(
        imageObj,
        startX,
        startY,
        cropSize,
        cropSize,
        0,
        0,
        cropSize,
        cropSize
      );
      const croppedData = canvas.toDataURL("image/png");
      setMarker({ x: clickX, y: clickY });
      setCroppedPart(croppedData);
      const value = clickedRegion?.name;
      const isConcern = Cookies.get("is_concern");
      const prefix =
        isConcern && isConcern?.includes("true_")
          ? isConcern + "/" + mainpath
          : mainpath;
      addOrUpdateSummary(prefix, [
        {
          image:
            bodyImages?.[selectedGender === "Female" ? "women" : "men"]?.[
              value
            ],
          name: replaceString(clickedRegion?.name),
        },
      ]);
      navigate("/concern-pain", {
        state: {
          partName: replaceString(clickedRegion?.name),
          image:
            bodyImages?.[selectedGender === "Female" ? "women" : "men"]?.[
              value
            ],
        },
      });
      isSpeakingRef.current = false;
    };
  };

  const handleRefresh = () => {
    setIsfront((prev) => !prev);
    setCroppedPart(null);
    setMarker(null);
  };
  useEffect(() => {
    let getImage;
    if (selectedGender === "Female") {
      getImage = isfront ? Femalebodyback : Frontfemale;
    } else {
      getImage = isfront ? DigramBack : DigramFront;
    }

    setBodyImage(getImage);
  }, [selectedGender, isfront]);
  return (
    <>
      <div className="flex justify-end mt-0">
        <button
          onClick={handleRefresh}
          className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
        >
          <img src={Refresh} alt="refresh" className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-full">
          {bodyImage && (
            <img
              src={bodyImage}
              alt="body diagram"
              className="w-full h-auto"
              onClick={handleImageClick}
            />
          )}

          {marker && (
            <div
              className="absolute w-10 h-10 rounded-full bg-[#FF00004D] border-2 border-red-500 pointer-events-none"
              style={{ left: marker.x - 8, top: marker.y - 8 }}
            />
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {croppedPart && (
          <div className="p-2 border rounded shadow mt-6">
            <img
              src={croppedPart}
              alt="Selected Part"
              className="w-24 h-24 object-contain"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PainDiagram;
