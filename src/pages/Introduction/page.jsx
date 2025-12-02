import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
import apiCall from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
export default function Introduction() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loader, setLoader] = useState(true);
  const [IntroductionOn, setIntroductionOn] = useState("");
  const [CalendarOn, setCalendarOn] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [prevName, setPrevName] = useState("");
  const [prevRole, setPrevRole] = useState("");
  const token = localStorage.getItem("token");
  const licenseKey = localStorage.getItem("license_key");
  const saveIntroduction = async (field, value) => {
    try {
      const payload = new FormData();
      payload.append("licenses_id", licenseKey);
      payload.append("name", field === "name" ? value : name);
      payload.append("role", field === "role" ? value : role);

      const { data } = await apiCall.post(
        "introductionStoreOrUpdate",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.status) {
        if (field === "name") setPrevName(value);
        if (field === "role") setPrevRole(value);
        // toast.success(data?.msg, { autoClose: 1500 });
      } else {
        toast.error(data.msg, { autoClose: 1500 });
      }
    } catch (error) {
      toast.error(error?.message || "Error updating", { autoClose: 1500 });
    }
  };

  // ✅ Save only onBlur & only if changed
  const handleNameBlur = () => {
    if (name !== prevName) {
      saveIntroduction("name", name);
    }
  };

  const handleRoleBlur = () => {
    if (role !== prevRole) {
      saveIntroduction("role", role);
    }
  };

  useEffect(() => {
    getSetting(
      () => {},
      () => {},
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => {},
      () => {}
    );
  }, [loader]);

  useEffect(() => {
    apiCall
      .post(
        "introductionShow",
        { licenses_id: licenseKey },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        if (data.status) {
          setName(data?.data?.name ?? "");
          setRole(data?.data?.role ?? "");
          setPrevName(data?.data?.name ?? "");
          setPrevRole(data?.data?.role ?? "");
        } else {
          toast.error(data.msg, { autoClose: 1500 });
        }
      })
      .catch(({ response }) => {
        toast.error(response?.data?.msg || "Error fetching intro", {
          autoClose: 1500,
        });
      });
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            introductionOn={IntroductionOn}
            calendarOn={CalendarOn}
            name={
              selectedLanguage === "Spanish" ? "Introducción" : "Introduction"
            }
          />
          <div className="main-wrapper home-wrapper introduction_page">
            <div className="Intro_box">
              <div className="py-4">
                <img src={"/introduction.png"} width={400} className="m-auto" />
                <div className="w-full m-auto mt-3 ">
                  {/* Name */}
                  <label className="block text-2xl font-bold mb-2">
                    {selectedLanguage === "Spanish"
                      ? "Mi nombre es"
                      : "My name is"}
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 text-xl rounded-lg border border-gray-300 mb-6 bg-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleNameBlur}
                    placeholder={
                      selectedLanguage === "Spanish"
                        ? "Escribe tu nombre"
                        : "Enter your name"
                    }
                  />

                  {/* Role */}
                  <label className="block text-2xl font-bold mb-2">
                    {selectedLanguage === "Spanish" ? "Soy un(a)" : "I am a"}
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 text-xl rounded-lg border border-gray-300 bg-white"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    onBlur={handleRoleBlur}
                    placeholder={
                      selectedLanguage === "Spanish"
                        ? "Escribe tu rol"
                        : "Enter your role"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
