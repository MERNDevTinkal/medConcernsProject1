import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Home from "./pages/main/Home";
import Main from "./pages/main/Main";
import Dashboard from "./pages/dashboard/Dashboard";
import Feel from "./pages/Overall/Feel";
import Disclaimer from "./pages/Disclaimer";
import Concern from "./pages/Concern/Concern";
import NewProblem from "./pages/Problem/NewProblem";
import SummaryList from "./pages/Summary/SummaryList";
import FeelingList from "./pages/Feeling/FeelingList";
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
import SwallowingProblem from "./pages/Swallowing/SwallowingProblem";
import Heartburn from "./pages/Swallowing/Heartburn";
import HeartburnStepYesNo from "./pages/Swallowing/HeartburnStepYesNo";
import NauseaStep from "./pages/Nausea/NauseaStep";
import NauseaProblem from "./pages/Nausea/NauseaProblem";
import ProblemYesNo from "./pages/Nausea/ProblemYesNo";
import NauseaWhen from "./pages/Nausea/NauseaWhen";
import WheanStepYesNo from "./pages/Nausea/WheanStepYesNo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feel" element={<Feel />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/concern" element={<Concern />} />
        <Route path="/concern-pain" element={<ConcernPain />} />
        <Route path="/new-problem" element={<NewProblem />} />
        <Route path="/full-body" element={<FullBody />} />
        <Route path="/pain-front" element={<PainFront />} />
        <Route path="/back-pain" element={<BackPain />} />
        <Route path="/face-pain" element={<FacePain />} />
        <Route path="/summary-list" element={<SummaryList />} />
        <Route path="/feeling" element={<FeelingList />} />
        <Route path="/emotions" element={<EmotionsList />} />
        <Route path="/board" element={<NeedBoard />} />
        <Route path="/board-upload" element={<NeedBoardUpload />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
        <Route path="/howoften" element={<Howoften />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/depressed" element={<DepressedFeel />} />
        <Route path="/guide-info" element={<GuideInfo />} />
        <Route path="/guide-info-aphasia" element={<GuideInfoAphasia />} />
        <Route path="/white-board-list" element={<WhiteBoardList />} />
        <Route path="/how-are-you" element={<HowAreYou />} />
        <Route path="/yes-and-no" element={<YesAndNo />} />
        <Route path="/yes-and-no/:id" element={<YesAndNo />} />
        <Route path="/pain-feel" element={<PainFeel />} />
        <Route path="/feel-pain" element={<FeelPainYesNo />} />
        <Route path="/concern-pain-feeling" element={<ConcernPainFeeling />} />
        <Route path="/feeling-list-pain" element={<FeelingListPain />} />
        <Route path="/feeling-yes-no" element={<FeelingYesNo />} />
        <Route path="/pain-when" element={<PainWhen />} />
        <Route path="/breathing-yes-no" element={<BreathingYesNo />} />
        <Route path="/breathing-problem" element={<BreathingProblem />} />
        <Route path="/confrm-step-yesno" element={<ConfrmStepYesNo />} />
        <Route path="/breathing-when" element={<BreathingWhen />} />
        <Route path="/confrm-step-when" element={<ConfrmStepWhen />} />
        <Route path="/swallowing-yes-no" element={<SwallowingYesNo />} />
        <Route path="/decision-swallowing" element={<DecisionSwallowing />} />
        <Route path="/swallowing-problem" element={<SwallowingProblem />} />
        <Route path="/heartburn" element={<Heartburn />} />
        <Route path="/heartburn-step-yesno" element={<HeartburnStepYesNo />} />
        <Route path="/nausea-step-yesno" element={<NauseaStep />} />
        <Route path="/nausea-problem" element={<NauseaProblem />} />
        <Route path="/nausea-problem-yesno" element={<ProblemYesNo />} />
        <Route path="/nausea-when" element={<NauseaWhen />} />
        <Route path="/when-step-yesno" element={<WheanStepYesNo />} />
      </Routes>
    </Router>
  );
}

export default App;
