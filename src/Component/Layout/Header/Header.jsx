import { useState, useContext } from "react";
import hamburger from "../../../assets/images/bar.svg";
import NextArrow from "../../../assets/images/next-arrow.svg";
import { Link } from "react-router-dom";
import MenuIcon1 from "../../../assets/images/sidebar-icon-01.svg";
import MenuIcon2 from "../../../assets/images/sidebar-icon-02.svg";
import MenuIcon3 from "../../../assets/images/sidebar-icon-03.svg";
import MenuIcon4 from "../../../assets/images/sidebar-icon-04.svg";
import MenuIcon5 from "../../../assets/images/sidebar-icon-05.svg";
import MenuIcon6 from "../../../assets/images/sidebar-icon-06.svg";
import MenuIcon7 from "../../../assets/images/sidebar-icon-07.svg";
import MenuIcon8 from "../../../assets/images/sidebar-icon-08.svg";
import MenuIcon9 from "../../../assets/images/sidebar-icon-09.svg";
import MenuIcon10 from "../../../assets/images/sidebar-icon-10.svg";
import MenuIcon11 from "../../../assets/images/sidebar-icon-11.svg";
import MenuIcon12 from "../../../assets/images/sidebar-icon-12.svg";
import MenuIcon13 from "../../../assets/images/sidebar-icon-13.svg";
import MenuIcon15 from "../../../assets/images/sidebar-icon-15.svg";
import MenuIcon16 from "../../../assets/images/sidebar-icon-18.svg";
import MenuIcon17 from "../../../assets/images/sidebar-icon-20.svg";
import MenuIcon18 from "../../../assets/images/sidebar-icon-21.svg";
import MenuIcon19 from "../../../assets/images/sidebar-icon-22.svg";
import MenuIcon20 from "../../../assets/images/sidebar-icon-23.svg";
import MenuIcon21 from "../../../assets/images/sidebar-icon-25.svg";
import MenuIcon22 from "../../../assets/images/sidebar-icon-26.svg";
import MenuIcon23 from "../../../assets/images/sidebar-icon-27.svg";
import MenuIcon24 from "../../../assets/images/sidebar-icon-28.svg";
import MenuIcon25 from "../../../assets/images/sidebar-icon-30.svg";
import MenuIcon26 from "../../../assets/images/sidebar-icon-32.svg";
import MenuIcon27 from "../../../assets/images/sidebar-icon-33.svg";
import CloseIcon from "../../../assets/images/close2.svg";
import { GlobalContext } from "../../../context/DiseaseContext";
const Header = ({ introductionOn, calendarOn, name }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { resetDiseases } = useContext(GlobalContext);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleSummery = () => {
    resetDiseases();
  };
  return (
    <>
      <header className="px-4 py-3 fixed left-0 right-0 to-0 bg-white main-header">
        <div className="flex items-center justify-between">
          <button type="button" onClick={toggleSidebar}>
            <img src={hamburger} alt="" />
          </button>
          <h2 className="text-[25px] font-normal text-black">
            {name ?? "Concerns"}
          </h2>
          <div
            style={{ cursor: "pointer" }}
            // onClick={() => {
            //   navigate(+1);
            // }}
          >
            {/* <img src={NextArrow} alt="" /> */}
          </div>
        </div>
        <aside
          className={`sidebar fixed top-0 left-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 overflow-y-auto min-h-screen ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full rounded-tr-[10px] rounded-br-[10px]"
          }`}
        >
          <button
            className="close-btn absolute top-5 right-5"
            onClick={() => setIsSidebarOpen(false)}
          >
            <img src={CloseIcon} />
          </button>
          <ul className="space-y-3">
            <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
              <img src={MenuIcon1} />
              <Link to="/settings">Settings</Link>
            </li>
            <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
              <img src={MenuIcon2} />
              <Link to="#">Patient Education</Link>
            </li>
            {!introductionOn && (
              <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
                <img src={MenuIcon3} />
                <Link to="/disclaimer">Introduction</Link>
              </li>
            )}
            <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
              <img src={MenuIcon4} />
              <Link to="/how-are-you">How are you?</Link>
            </li>
            <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
              <img src={MenuIcon5} />
              <Link to="/concern">Concerns</Link>
            </li>
            <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
              <img src={MenuIcon6} />
              <Link to="/whiteboard">White Board</Link>
            </li>
            <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
              <img src={MenuIcon7} />
              <Link to="/yes-no-concerns">Yes / No / ? Board</Link>
            </li>
            <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
              <img src={MenuIcon8} />
              <Link to="/board">Needs Board</Link>
            </li>
            <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
              <img src={MenuIcon9} />
              <Link to="/topic-board">Topic Board</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon10} />
              <Link to="/when">When?</Link>
            </li>
            {!calendarOn && (
              <li
                onClick={() => {
                  handleSummery();
                }}
                className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
              >
                <img src={MenuIcon11} />
                <Link to="/howoften">Calendar</Link>
              </li>
            )}
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon12} />
              <Link to="/noappetite-problem">Appetite</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon13} />
              <Link to="/bowels-problem">Bowel</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon5} />
              <Link to="/breathing-problem">Breathing / Coughing</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon12} />
              <Link to="/emotions">Emotions / Feelings</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon15} />
              <Link to="/fatigue-problem">Fatigue</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon12} />
              <Link to="/illness-problem">Illness</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon12} />
              <Link to="/hearing-problem">Hearing</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon16} />
              <Link to="/medication-problem">Medication</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon12} />
              <Link to="/illnessMucus-problem">Mucus/Secretions</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon17} />
              <Link to="/nausea-problem">Nausea</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon18} />
              <Link to="/pain-feel">Pain Description</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon19} />
              <Link to="/feeling">Pain Scale</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon20} />
              <Link to="/male-body">Pain Location</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon12} />
              <Link to="/feeding-problem">PEG</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon21} />
              <Link to="/swallowing-problem">Swallowing</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon12} />
              <Link to="/something-problem">Something Happened</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon22} />
              <Link to="/trach-problem">Trach</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon23} />
              <Link to="/urination-problem">Urination</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon24} />
              <Link to="/vision-problem">Vision Problems</Link>
            </li>
            <li
              onClick={() => {
                handleSummery();
              }}
              className="text-[20px] font-normal text-black flex items-center space-x-3 p-2"
            >
              <img src={MenuIcon12} />
              <Link to={"/wound-problem"}>Wound/Incision</Link>
            </li>
            <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
              <img src={MenuIcon25} />
              <Link>Contact Us</Link>
            </li>
            <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
              <img src={MenuIcon6} />
              <Link to="/white-board-list">Saved Whiteboard</Link>
            </li>
            <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
              <img src={MenuIcon26} />
              <Link to="/summary-list">Saved Summary</Link>
            </li>
            <li className="text-[20px] font-normal text-black flex items-center space-x-3 p-2">
              <img src={MenuIcon27} />
              <Link to="/guide-info">About Us</Link>
            </li>
          </ul>
        </aside>
      </header>
    </>
  );
};

export default Header;
