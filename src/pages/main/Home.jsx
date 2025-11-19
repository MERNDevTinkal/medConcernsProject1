import React, { useEffect, useState } from "react";
import logoicon from "../../assets/images/logo-icon.svg";
import mainimg from "../../assets/images/main-img.png";
import download from "../../assets/images/download.svg";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [promptEvent, setPromptEvent] = useState();
  const navigate = useNavigate();
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token != null) {
      return navigate("/how-are-you");
    }
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setPromptEvent(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, [navigate]);

  const handleInstallClick = async () => {
    if (promptEvent) {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === "accepted") {
        console.log("PWA installed");
      } else {
        console.log("PWA install dismissed");
      }
      setPromptEvent(null);
    } else {
      alert("Install prompt not available. Make sure PWA is installable.");
    }
  };

  // Detect iOS devices not in standalone mode

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isInStandalone = window.navigator.standalone === true;
    setIsIOS(isIosDevice && !isInStandalone);
  }, []);

  return (
    <div>
      <div className="welcome-new bg-[#DCECFC]">
        <div className="main-h flex items-center justify-center">
          <div className="w-full flex flex-col items-center text-center px-5">
            {/* Logo */}
            <div className="mb-2">
              <img
                src={logoicon}
                alt="MedConcerns Logo"
                className="w-40 mx-auto mb-2 sm:w-28"
              />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-[24px] text-black font-medium">
                Welcome to MedConcerns
              </h1>
              <h5 className="text-[16px] font-normal">
                Download the app to get started
              </h5>
            </div>

            {/* Main Image */}
            <div>
              <img src={mainimg} className="w-full mx-auto mb-4 mt-4" alt="" />
            </div>

            {/* Install Button */}
            {promptEvent && (
              <div
                onClick={handleInstallClick}
                className="flex justify-center gap-2 bg-[#008CFF] text-white py-3 px-5 text-base mt-3 rounded-xl text-center text-[18px] cursor-pointer"
              >
                Download Now <img src={download} alt="" />
              </div>
            )}
            {isIOS && (
              <div className="install-hint bg-[#CCE5FF] text-[#004C99] py-2 px-4 rounded mt-3 text-center border border-[#0077CC]">
                Tap <strong>Share → Add to Home Screen</strong> to install this
                app on your iPhone.
              </div>
            )}
            {/* User Login Button */}
            <div className="mt-5">
              <Link
                to="/main"
                className="bg-[#008CFF] text-white py-3 px-6 rounded-xl text-[18px] font-small inline-block"
              >
                Login as User
              </Link>
            </div>

            {/* Admin Login Link */}
            <div>
              <h4 className="text-[18px] font-medium mt-5">
                Are you a hospital admin? <br />
                <Link
                  to={import.meta.env.VITE_Admin_URL}
                  className="primary-text underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  click here to login
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
