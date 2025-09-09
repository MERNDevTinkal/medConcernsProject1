import { useState } from "react";
import logo from "../../assets/images/logo.png";
import close from "../../assets/images/close.svg";
import CloseIcon from "../../assets/images/close2.svg";
import { Link } from "react-router-dom";
import api from "../../Component/apiCall/apiCall";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const toggleModal = () => setIsOpen(!isOpen);
  const loginUser = async () => {
    if (!licenseKey.trim()) {
      toast.error("Please enter a license key");
      return;
    }
    try {
      const response = await api.post("license_key", {
        license_key: licenseKey,
      });
      const data = response.data;
      if (data?.status) {
        sessionStorage.setItem("token", data?.data?.token);
        sessionStorage.setItem("license_key", data?.data?.license_key);
        toast.success("License key verified successfully!");
        setIsOpen(true);
      } else {
        toast.error(data?.message || "License key verification failed.");
      }
    } catch (error) {
      console.log("====>errorerror", error);
      const message = error.response?.data?.message;
      toast.error(message);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="welcome-new bg-[#DCECFC]">
        <div className="min-h-screen main-h  flex items-center justify-center">
          <div className="w-full flex flex-col items-center text-center px-5">
            {/* Logo and Title */}
            <div className="mb-8">
              <img
                src={logo}
                alt="MedConcerns Logo"
                className="w-100 mx-auto mb-2"
              />
            </div>

            {/* Input Section */}
            <div className="w-full text-left licence-bx relative">
              <label className="block font-medium text-[#000] text-base mb-3">
                Enter your license key to continue
              </label>
              <input
                type="text"
                placeholder="Enter your license key"
                className="w-full px-4 py-3 rounded border text-[#000] text-base border-[#ABCEFA] focus:outline-none  h-[46px] placeholder:text-black"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
              />
              {licenseKey && (
                <button
                  type="button"
                  className="absolute right-3 top-12.5"
                  onClick={() => setLicenseKey("")}
                  aria-label="Clear input"
                >
                  <img src={close} alt="Clear" />
                </button>
              )}
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={loginUser}
              className="thm-btn w-full mt-3"
            >
              Continue
            </button>

            {/* modal */}
            {isOpen && (
              <div className="fixed z-10 inset-0 overflow-y-auto custom-modal">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  {/* Background Overlay */}
                  <div
                    className="fixed inset-0 bg-black opacity-60 transition-opacity modal-overlay"
                    aria-hidden="true"
                    onClick={toggleModal}
                  ></div>

                  {/* For vertical alignment */}
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>

                  {/* Modal Content */}
                  <div
                    className="inline-block align-middle bg-white rounded-[20px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <button
                      className="close-btn"
                      type="button"
                      onClick={toggleModal}
                      aria-label="Close modal"
                    >
                      <img src={CloseIcon} alt="Close" />
                    </button>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center">
                      <h2 className="text-[24px] mb-3 font-medium">
                        Thank you!
                      </h2>
                      <p className="text-[18px] font-normal mb-3">
                        Your license key has been successfully verified.
                      </p>
                      <Link to="/how-are-you" className="thm-btn">
                        Ok
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
