import { useEffect, useState } from "react";
import { logo } from "../../Component/DiseasesData/images";
import { download } from "../../Component/DiseasesData/images";
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
        handleBeforeInstallPrompt,
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
      <div className="welcome-new min-h-screen flex items-center justify-center ">
        <div className="main-h flex items-center justify-center">
          <div className="text-center">
            <div className="mb-2 ">
              <img
                src={logo}
                alt="MedConcerns Logo"
                className="mx-auto mb-2 w-80"
              />
            </div>

            {/* {isIOS && (
              <div className="install-hint bg-[#CCE5FF] text-[#004C99] py-2 px-4 rounded mt-3 mb-3 text-center border border-[#0077CC]">
                Tap <strong>Share → Add to Home Screen</strong> to install this
                app on your iPhone.
              </div>
            )} */}
            {/* User Login Button */}
            <div className="">
              <Link
                to="/main"
                className="bg-[#008CFF] text-white py-3 px-8 rounded-lg text-xl font-medium inline-block"
              >
                Enter License Code
              </Link>
            </div>

            {/* Admin Login Link */}
            <div className="mt-5 mb-5">
              <Link
                to={import.meta.env.VITE_Admin_URL}
                className="text-xl font-medium mb-4 text-blue-500 block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Administrator Login
              </Link>
              <Link
                to="/need-license"
                className="text-lg font-medium mt-4 text-gray-500 block"
              >
                Need a license code?
              </Link>
              
            </div>
            {/* Install Button */}
            <div className="flex justify-center">
              {promptEvent && (
               <button
                  onClick={handleInstallClick}
                  className="flex justify-center gap-2 bg-[#008CFF] text-white py-3 px-8 rounded-lg text-xl font-normal mx-auto"
                >
                  Download Now <img src={download} alt="" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
