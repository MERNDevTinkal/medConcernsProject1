import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/main/Home";
import Main from "./pages/main/Main";
import Feel from "./pages/Overall/Feel";
import Disclaimer from "./pages/Disclaimer";
import Concern from "./pages/Concern/Concern";
import NewProblem from "./pages/Problem/NewProblem";
import Summary from "./pages/Summary/SummaryList";
import SummaryList from "./pages/SummaryList/SummaryList";
import SummaryView from "./pages/summeryView/summeryview";
import EmotionsList from "./pages/Emotions/EmotionsList";
import NeedBoard from "./pages/Board/NeedBoard";
import NeedBoardUpload from "./pages/Board/NeedBoardUpload";
import Whiteboard from "./pages/Whiteboard/Whiteboard";
import Howoften from "./pages/Howoften/Howoften";
import Settings from "./pages/Settings/Settings";
import DepressedFeel from "./pages/Depressed/DepressedFeel";
import GuideInfo from "./pages/Guide/GuideInfo";
import GuideInfoAphasia from "./pages/Guide/GuideInfoAphasia";
import WhiteBoardList from "./pages/Whiteboard/WhiteBoardList";
import HowAreYou from "./pages/HowAreYou/HowAreYou";
import YesAndNo from "./pages/YesAndNo/YesAndNo";
import BackPain from "./pages/Pain/BackPain";
import FacePain from "./pages/Pain/FacePain";
import PainFront from "./pages/Pain/PainFront";
import FullBody from "./pages/Pain/FullBody";
import PainFeel from "./pages/Pain/PainFeel";
import ConcernPain from "./pages/Pain/ConcernPain";
import FeelPainYesNo from "./pages/Pain/FeelPainYesNo";
import ConcernPainFeeling from "./pages/Pain/ConcernPainFeeling";
import FeelingListPain from "./pages/Pain/FeelingListPain";
import FeelingYesNo from "./pages/Pain/FeelingYesNo";
import PainWhen from "./pages/Pain/PainWhen";
import BreathingYesNo from "./pages/BreathingCoughing/BreathingYesNo";
import BreathingProblem from "./pages/BreathingCoughing/BreathingProblem";
import ConfrmStepYesNo from "./pages/BreathingCoughing/ConfrmStepYesNo";
import BreathingWhen from "./pages/BreathingCoughing/BreathingWhen";
import ConfrmStepWhen from "./pages/BreathingCoughing/ConfrmStepWhen";
import SwallowingYesNo from "./pages/Swallowing/SwallowingYesNo";
import DecisionSwallowing from "./pages/Swallowing/DecisionSwallowing";
import Heartburn from "./pages/Swallowing/Heartburn";
import HeartburnStepYesNo from "./pages/Swallowing/HeartburnStepYesNo";
import NauseaStep from "./pages/Nausea/NauseaStep";
import ProblemYesNo from "./pages/Nausea/ProblemYesNo";
import NauseaWhen from "./pages/Nausea/NauseaWhen";
import WheanStepYesNo from "./pages/Nausea/WheanStepYesNo";
import FeelOptions from "./pages/feelOptions/feelOptions";
import PrivateRoute from "./Component/PrivateRoute/privateRoute";
import SettingList from "./pages/SettingList/settingList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contactus from "./pages/Contactus/page";
import Introduction from "./pages/Introduction/page";
import Aboutus from "./pages/Aboutus/page";
import PatientEducation from "./pages/PatientEducation/page";
import ImagesLibrery from "./pages/ImagesLibrery/page";
import DepressionScreener from "./pages/feelOptions/DepressionScreener";
import License from "./pages/NeedLicense/License ";
import LicenseContact from "./pages/NeedLicense/LicenseContact";
function App() {
  const location = useLocation();
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const excludedRoutes = ["/", "/main"];
    const shouldForceLandscape = !excludedRoutes.includes(location.pathname);

    if ((isIOS || isAndroid) && shouldForceLandscape) {
      document.body.classList.add("force-landscape");
      document.body.classList.remove("no-landscape");
      const applyInstantLandscape = () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        const isPortrait = window.innerHeight > window.innerWidth;
        if (isPortrait) {
          document.body.classList.add("portrait-forced-to-landscape");
          document.body.classList.remove("landscape-natural");
          // Force landscape viewport
          if (viewport) {
            viewport.setAttribute(
              "content",
              "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            );
          }
        } else {
          document.body.classList.add("landscape-natural");
          document.body.classList.remove("portrait-forced-to-landscape");
        }
      };

      // Apply immediately
      applyInstantLandscape();

      // Listen for resize (faster than orientationchange)
      window.addEventListener("resize", applyInstantLandscape);

      return () => {
        window.removeEventListener("resize", applyInstantLandscape);
        document.body.classList.remove(
          "force-landscape",
          "portrait-forced-to-landscape",
          "landscape-natural"
        );
        document.body.classList.add("no-landscape");
      };
    } else {
      document.body.classList.add("no-landscape");
      document.body.classList.remove(
        "force-landscape",
        "portrait-forced-to-landscape",
        "landscape-natural"
      );
    }
  }, [location.pathname]);
  return (
    <>
      {" "}
      <ToastContainer
        limit={1}
        style={{ top: "80px !important" }}
        position="top-right"
        autoClose={700}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="z-[9999]"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/need-license" element={<License />} />
        <Route path="/license-contact" element={<LicenseContact />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<BreathingWhen />} />
          <Route path="/pain-concern" element={<BackPain />} />
          <Route path="/feel" element={<Feel />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/topic-board" element={<Concern />} />
          <Route path="/concern" element={<Concern />} />
          <Route path="/concern-pain" element={<ConcernPain />} />
          <Route path="/new-problem" element={<NewProblem />} />
          <Route path="/yes-no-concerns" element={<NewProblem />} />
          <Route path="/full-body" element={<FullBody />} />
          <Route path="/pain-front" element={<PainFront />} />
          <Route path="/back-pain" element={<BackPain />} />
          <Route path="/face-pain" element={<FacePain />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/summary-list" element={<SummaryList />} />
          <Route path="/summary-view/:id" element={<SummaryView />} />
          <Route path="/feeling" element={<FeelingListPain />} />
          <Route path="/emotions" element={<Feel />} />
          <Route path="/board" element={<NeedBoard />} />
          <Route path="/icon-upload" element={<NeedBoardUpload />} />
          <Route path="/board-upload/:id" element={<NeedBoardUpload />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/whiteboard/:id" element={<Whiteboard />} />
          <Route path="/howoften" element={<Howoften />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/depressed" element={<DepressedFeel />} />
          <Route path="/guide-info" element={<GuideInfo />} />
          <Route path="/guide-info-aphasia" element={<GuideInfoAphasia />} />
          <Route path="/white-board-list" element={<WhiteBoardList />} />
          <Route path="/how-are-you" element={<HowAreYou />} />
          <Route path="/yes-and-no/:id" element={<YesAndNo />} />
          <Route path="/pain-feel" element={<PainFeel />} />
          <Route path="/feel-pain" element={<FeelPainYesNo />} />
          <Route path="/images-library" element={<ImagesLibrery />} />
          <Route
            path="/concern-pain-feeling"
            element={<ConcernPainFeeling />}
          />
          <Route path="/feeling-list-pain" element={<FeelingListPain />} />
          <Route path="/feeling-yes-no" element={<FeelingYesNo />} />
          <Route path="/pain-when" element={<PainWhen />} />
          <Route path="/:name-problem" element={<BreathingProblem />} />
          <Route
            path="/:name/confrm-step-yesno/:id"
            element={<ConfrmStepYesNo />}
          />
          <Route path="/when" element={<BreathingWhen />} />
          <Route path="/confrm-step-when/:id" element={<ConfrmStepWhen />} />
          <Route path="/swallowing-yes-no" element={<SwallowingYesNo />} />
          <Route path="/decision-swallowing" element={<DecisionSwallowing />} />
          <Route path="/heartburn" element={<Heartburn />} />
          <Route
            path="/heartburn-step-yesno"
            element={<HeartburnStepYesNo />}
          />
          <Route path="/nausea-step-yesno" element={<NauseaStep />} />
          <Route path="/nausea-problem-yesno" element={<ProblemYesNo />} />
          <Route path="/nausea-when" element={<NauseaWhen />} />
          <Route path="/concern/:name/:id" element={<BreathingYesNo />} />
          <Route path="/topicboard/:name/:id" element={<BreathingYesNo />} />
          <Route path="/when-step-yesno" element={<WheanStepYesNo />} />
          <Route path="/feelOptions/:id" element={<FeelOptions />} />
          <Route path="/settingList/:name" element={<SettingList />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/patient-education" element={<PatientEducation />} />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/feeling-body" element={<EmotionsList />} />
          <Route path="/depression-screener" element={<DepressionScreener />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
