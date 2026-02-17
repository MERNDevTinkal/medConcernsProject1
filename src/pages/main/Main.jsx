import { useState, useEffect } from "react";
import { logo, CloseIcon } from "../../Component/DiseasesData/images";
import close from "/assets/images/close.svg?url";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
const Main = () => {
  const navigate = useNavigate();
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
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("license_key", data?.data?.license_key);
        toast.success(data?.msg, {
          autoClose: 1500,
          onClose: () => {
            setIsOpen(false);
            navigate("/start-disclaimer");
          },
        });
      } else {
        toast.error(data?.msg, { autoClose: 1500 });
      }
    } catch (error) {
      const message = error.response?.data?.msg;
      toast.error(message, { autoClose: 1500 });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token != null) {
      return navigate("/introduction");
    }
  }, []);

  return (
    <div>
      <div className="welcome-new min-h-screen flex items-center justify-center">
        <div className=" main-h  flex items-center justify-center">
          <div className="w-full flex flex-col items-center text-center">
            <div className="mb-8">
              <img
                src={logo}
                alt="MedConcerns Logo"
                className="w-100 mx-auto mb-2"
              />
            </div>
            <div className="w-full text-left licence-bx relative">
              <label className="block font-medium text-[#000] mb-3">
                Enter your license key to continue
              </label>
              <input
                type="text"
                placeholder="Enter your license key"
                className="w-full px-4 py-3 rounded border  text-[#000]  border-[#ABCEFA] focus:outline-none h-[45px] placeholder:text-black"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    loginUser();
                  }
                }}
              />

              {licenseKey && (
                <button
                  type="button"
                  className="absolute right-3 top-11"
                  onClick={() => setLicenseKey("")}
                  aria-label="Clear input"
                >
                  <img src={close} className="w-6.5" alt="Clear" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={loginUser}
              className="thm-btn w-full mt-3"
            >
              Continue
            </button>
            {isOpen && (
              <div className="fixed z-10 inset-0 overflow-y-auto custom-modal">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 bg-black opacity-60 transition-opacity modal-overlay"
                    aria-hidden="true"
                    onClick={toggleModal}
                  ></div>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
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
                      <Link
                        to="/introduction"
                        onClick={() => Cookies.set("is_introduction", "true")}
                        className="thm-btn"
                      >
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
