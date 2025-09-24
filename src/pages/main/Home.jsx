// import React, { useEffect, useState } from "react";
// import logoicon from "../../assets/images/logo-icon.svg";
// import mainimg from "../../assets/images/main-img.png";
// import download from "../../assets/images/download.svg";
// import { Link, useNavigate } from "react-router-dom";
// const Home = () => {
//   const [promptEvent, setPromptEvent] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token && token != null) {
//       return navigate("/how-are-you");
//     }
//     const handleBeforeInstallPrompt = (e) => {
//       e.preventDefault();
//       setPromptEvent(e);
//     };
//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//     return () =>
//       window.removeEventListener(
//         "beforeinstallprompt",
//         handleBeforeInstallPrompt
//       );
//   }, []);
//   const handleInstallClick = async () => {
//     if (promptEvent) {
//       promptEvent.prompt();
//       const { outcome } = await promptEvent.userChoice;
//       if (outcome === "accepted") {
//         console.log("PWA installed");
//       } else {
//         console.log("PWA install dismissed");
//       }
//       setPromptEvent(null);
//     } else {
//       alert("Install prompt not available. Make sure PWA is installable.");
//     }
//   };
//   return (
//     <div>
//       <div className="welcome-new bg-[#DCECFC]">
//         <div className="min-h-screen main-h  flex items-center justify-center">
//           <div className="w-full flex flex-col items-center text-center px-5">
//             {/* Logo and Title */}
//             <div className="mb-6">
//               <img
//                 src={logoicon}
//                 alt="MedConcerns Logo"
//                 className="w-40 mx-auto mb-2"
//               />
//             </div>
//             <div>
//               <h1 className="text-[24px] color-[#000] font-medium mb-2">
//                 Welcome to MedConcerns{" "}
//               </h1>
//               <h5 className="text-[16px] font-normal">
//                 Download the app to get started
//               </h5>
//             </div>
//             <div>
//               <img src={mainimg} className="w-full mx-auto mb-4 mt-4" alt="" />
//             </div>
//             <div
//               onClick={handleInstallClick}
//               disabled={!promptEvent}
//               to="/main"
//               className="flex justify-center gap-2 bg-[#008CFF] text-white py-3 px-5 text-base mt-3 rounded-xl text-center text-[18px]"
//             >
//               Download Now <img src={download} alt="" />
//             </div>
//             <div>
//               <h4 className="text-[18px] font-medium mt-5">
//                 Are you a hospital admin? <br />
//                 <Link to="/main" className="primary-text underline">
//                   click here to login
//                 </Link>
//               </h4>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import logoicon from "../../assets/images/logo-icon.svg";
import mainimg from "../../assets/images/main-img.png";
import download from "../../assets/images/download.svg";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [isPwaSupported, setIsPwaSupported] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/how-are-you");
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setPromptEvent(e);
      setIsPwaSupported(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Detect if browser supports PWA installation
    const isSupported =
      "BeforeInstallPromptEvent" in window || "beforeinstallprompt" in window;
    setIsPwaSupported(isSupported);

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
      console.log(
        outcome === "accepted" ? "PWA installed" : "PWA install dismissed"
      );
      setPromptEvent(null);
    } else {
      // Show friendly instructions for unsupported browsers
      alert(
        "Your browser does not support direct PWA installation.\n" +
          "Please use Chrome or Edge, or install manually via 'Add to Home Screen'."
      );
    }
  };

  return (
    <div>
      <div className="welcome-new bg-[#DCECFC]">
        <div className="min-h-screen main-h flex items-center justify-center">
          <div className="w-full flex flex-col items-center text-center px-5">
            {/* Logo and Title */}
            <div className="mb-6">
              <img
                src={logoicon}
                alt="MedConcerns Logo"
                className="w-40 mx-auto mb-2"
              />
            </div>
            <div>
              <h1 className="text-[24px] color-[#000] font-medium mb-2">
                Welcome to MedConcerns
              </h1>
              <h5 className="text-[16px] font-normal">
                Download the app to get started
              </h5>
            </div>
            <div>
              <img src={mainimg} className="w-full mx-auto mb-4 mt-4" alt="" />
            </div>

            {/* Download Button */}
            {isPwaSupported ? (
              <div
                onClick={handleInstallClick}
                className={`flex justify-center gap-2 bg-[#008CFF] text-white py-3 px-5 text-base mt-3 rounded-xl text-center text-[18px] cursor-pointer ${
                  !promptEvent ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Download Now <img src={download} alt="download" />
              </div>
            ) : (
              <p className="mt-3 text-center text-gray-700 text-base px-5">
                Your browser does not support automatic PWA installation. Please
                use Chrome or Edge, or install manually via "Add to Home
                Screen".
              </p>
            )}

            <div>
              <h4 className="text-[18px] font-medium mt-5">
                Are you a hospital admin? <br />
                <Link to="/main" className="primary-text underline">
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
