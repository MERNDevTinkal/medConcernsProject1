import HowAreYouImg1 from "../assets/images/good.png";
import HowAreYouImg2 from "../assets/images/okay.png";
import HowAreYouImg3 from "../assets/images/bad.png";
import HowAreYouImg4 from "../assets/images/up-and-down.png";
import HowAreYouImg5 from "../assets/images/getting-better.png";
import HowAreYouImg6 from "../assets/images/worse.png";
import HowAreYouImg7 from "../assets/images/concern-img-08.png";
import HowAreYouImg8 from "../assets/images/i-dont-know.png";
import HowAreYouImg9 from "../assets/images/ic_the_same.png";
import {
  // English Male
  GoodMale,
  IDontKnowMale,
  TheSameMale,
  GettingWorseMale,
  GettingBetterMale,
  UpAndDownMale,
  BadMale,
  OkayMale,

  // Spanish Male
  NoSeSpanishMale,
  LoMismoSpanishMale,
  GettingWorseEmpeorandoSpanishMale,
  GettingBetterMejorandoSpanishMale,
  UpAndDownArribaYAbajoSpanishMale,
  MaloSpanishMale,
  EstaBienSpanishMale,
  BuenoSpanishMale,

  // English Female
  GettingBetterEnglishFemale,
  UpAndDownEnglishFemale,
  BadEnglishFemale,
  OkayEnglishFemale,
  GoodEnglishFemale,
  IDontKnowEnglishFemale,
  TheSameEnglishFemale,
  GettingWorseEnglishFemale,

  // Spanish Female
  ArribaYAbajoUpAndDownSpanishFemale,
  MaloBadSpanishFemale,
  EstaBienOkaySpanishFemale,
  BuenoGoodSpanishFemale,
  NoSeIDontKnowSpanishFemale,
  LoMismoTheSameSpanishFemale,
  EmpeorandoGettingWorseSpanishFemale,
  MejorandoGettingBetterSpanishFemale,
} from "../Component/DiseasesData/audio";
export const howareyou = [
  {
    id: 1,
    name: "Good",
    nameEs: "Bien",
    image: HowAreYouImg1,
    maleEnglish: GoodMale, // Added
    femaleEnglish: GoodEnglishFemale, // Added
    femaleSpanish: BuenoGoodSpanishFemale, // Added
    maleSpanish: BuenoSpanishMale, // Added
  },
  {
    id: 2,
    name: "Okay",
    nameEs: "Más o menos",
    image: HowAreYouImg2,
    maleEnglish: OkayMale, // Added
    femaleEnglish: OkayEnglishFemale, // Added
    femaleSpanish: EstaBienOkaySpanishFemale, // Added
    maleSpanish: EstaBienSpanishMale, // Added
  },
  {
    id: 3,
    name: "Bad",
    nameEs: "Mal",
    image: HowAreYouImg3,
    maleEnglish: BadMale, // Added
    femaleEnglish: BadEnglishFemale, // Added
    femaleSpanish: MaloBadSpanishFemale, // Added
    maleSpanish: MaloSpanishMale, // Added
  },
  {
    id: 4,
    name: "Up and Down",
    nameEs: "Altibajos",
    image: HowAreYouImg4,
    maleEnglish: UpAndDownMale, // Added
    femaleEnglish: UpAndDownEnglishFemale, // Added
    femaleSpanish: ArribaYAbajoUpAndDownSpanishFemale, // Added
    maleSpanish: UpAndDownArribaYAbajoSpanishMale, // Added
  },
  {
    id: 5,
    name: "Getting Better",
    nameEs: "Mejorando",
    image: HowAreYouImg5,
    maleEnglish: GettingBetterMale, // Added
    femaleEnglish: GettingBetterEnglishFemale, // Added
    femaleSpanish: MejorandoGettingBetterSpanishFemale, // Added
    maleSpanish: GettingBetterMejorandoSpanishMale, // Added
  },
  {
    id: 6,
    name: "Getting Worse",
    nameEs: "Empeorando",
    image: HowAreYouImg6,
    maleEnglish: GettingWorseMale, // Added
    femaleEnglish: GettingWorseEnglishFemale, // Added
    femaleSpanish: EmpeorandoGettingWorseSpanishFemale, // Added
    maleSpanish: GettingWorseEmpeorandoSpanishMale, // Added
  },
  {
    id: 7,
    name: "The Same",
    nameEs: "Igual",
    image: HowAreYouImg9,
    maleEnglish: TheSameMale, // Added
    femaleEnglish: TheSameEnglishFemale, // Added
    femaleSpanish: LoMismoTheSameSpanishFemale, // Added
    maleSpanish: LoMismoSpanishMale, // Added
  },
  {
    id: 8,
    name: "I Don't Know",
    nameEs: "No lo sé",
    image: HowAreYouImg8,
    maleEnglish: IDontKnowMale, // Added
    femaleEnglish: IDontKnowEnglishFemale, // Added
    femaleSpanish: NoSeIDontKnowSpanishFemale, // Added
    maleSpanish: NoSeSpanishMale, // Added
  },
];
