import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../../context/DiseaseContext";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
import Cookies from "js-cookie";

const FeelingListPain = () => {
    const [selectedLanguage, setSelectedLanguage] = React.useState("");
    const [loader, setLoader] = useState(true);
    const location = useLocation();
    const pathprimary = location.pathname;
    const navigate = useNavigate();
    const [selectedGender, setSelectedGender] = React.useState("");
    const [CalendarOn, setCalendarOn] = React.useState("");
    const [IntroductionOn, setIntroductionOn] = React.useState("");
    const { addOrUpdateSummary } = useContext(GlobalContext);

    // State for editable text boxes
    const [scaleTitle, setScaleTitle] = useState("Fatigue");

    useEffect(() => {
        getSetting(
            () => { },
            setSelectedGender,
            setSelectedLanguage,
            setCalendarOn,
            setIntroductionOn,
            setLoader,
        );
    }, []);

    const handleBynumber = async (id) => {
        let value = { "image": id, "icon": id,"name":scaleTitle,"nameEs":scaleTitle, "path": pathprimary, "en": scaleTitle, "es": scaleTitle, type: "Review Scale", value: scaleTitle };

        if (value) {
            const isConcern = Cookies.get("is_concern");
            const prefix =
                isConcern && isConcern?.includes("true_")
                    ? isConcern + "/" + pathprimary
                    : pathprimary;
            addOrUpdateSummary(prefix, [value]);
            navigate(`/yes-and-no/${id}?name=${scaleTitle}`,);
        }

    };



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
                            selectedLanguage === "Spanish"
                                ? "reviewScale"
                                : "reviewScale"
                        }
                        scaleTitle={scaleTitle}
                        setScaleTitle={setScaleTitle}
                    />

                    <div className="main-wrapper rating-scale-wrapper ">
                        <div className="w-full  mx-auto pb-6 pt-0 px-0 common-scale">
                            <div className="space-y-0">
                                <div className="relative h-4 gradient-bar mt-0 mb-8">
                                    {/* Scale markers */}
                                    <div className="absolute inset-0 top-7.5 flex justify-between items-center px-1 left-0 line-bar">
                                        <div
                                            onClick={() => {
                                                handleBynumber(0);
                                            }}
                                            className="w-2 h-[30px] line-1 cursor-pointer"
                                        ></div>
                                        <div
                                            onClick={() => {
                                                handleBynumber(1);
                                            }}
                                            className="w-2 h-[30px] line-2 cursor-pointer"
                                        ></div>
                                        <div
                                            onClick={() => {
                                                handleBynumber(2);
                                            }}
                                            className="w-2 h-[30px] line-3 cursor-pointer"
                                        ></div>
                                        <div
                                            onClick={() => {
                                                handleBynumber(3);
                                            }}
                                            className="w-2 h-[30px] line-4 cursor-pointer"
                                        ></div>
                                        <div
                                            onClick={() => {
                                                handleBynumber(4);
                                            }}
                                            className="w-2 h-[30px] line-5 cursor-pointer"
                                        ></div>
                                        <div
                                            onClick={() => {
                                                handleBynumber(5);
                                            }}
                                            className="w-2 h-[30px] line-6 cursor-pointer"
                                        ></div>
                                        <div
                                            onClick={() => {
                                                handleBynumber(6);
                                            }}
                                            className="w-2 h-[30px] line-7 cursor-pointer"
                                        ></div>
                                        <div
                                            onClick={() => {
                                                handleBynumber(7);
                                            }}
                                            className="w-2 h-[30px] line-8 cursor-pointer"
                                        ></div>
                                        <div
                                            onClick={() => {
                                                handleBynumber(8);
                                            }}
                                            className="w-2 h-[30px] line-9 cursor-pointer"
                                        ></div>
                                        <div
                                            onClick={() => {
                                                handleBynumber(9);
                                            }}
                                            className="w-2 h-[30px] line-10 cursor-pointer"
                                        ></div>
                                        <div
                                            onClick={() => {
                                                handleBynumber(10);
                                            }}
                                            className="w-2 h-[30px] line-11 cursor-pointer"
                                        ></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-bar ">
                                    <div
                                        onClick={() => {
                                            handleBynumber(0);
                                        }}
                                        className="text-3xl font-bold text-gray-800 cursor-pointer"
                                    >
                                        0
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleBynumber(1);
                                        }}
                                        className="text-3xl font-bold text-gray-800 cursor-pointer"
                                    >
                                        1
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleBynumber(2);
                                        }}
                                        className="text-3xl font-bold text-gray-800 cursor-pointer"
                                    >
                                        2
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleBynumber(3);
                                        }}
                                        className="text-3xl font-bold text-gray-800 cursor-pointer"
                                    >
                                        3
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleBynumber(4);
                                        }}
                                        className="text-3xl font-bold text-gray-800 cursor-pointer"
                                    >
                                        4
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleBynumber(5);
                                        }}
                                        className="text-3xl font-bold text-gray-800 cursor-pointer"
                                    >
                                        5
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleBynumber(6);
                                        }}
                                        className="text-3xl font-bold text-gray-800 cursor-pointer"
                                    >
                                        6
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleBynumber(7);
                                        }}
                                        className="text-3xl font-bold text-gray-800 cursor-pointer"
                                    >
                                        7
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleBynumber(8);
                                        }}
                                        className="text-3xl font-bold text-gray-800 cursor-pointer"
                                    >
                                        8
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleBynumber(9);
                                        }}
                                        className="text-3xl font-bold text-gray-800 cursor-pointer"
                                    >
                                        9
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleBynumber(10);
                                        }}
                                        className="text-3xl font-bold text-gray-800 cursor-pointer "
                                    >
                                        10
                                    </div>
                                </div>
                                {/* Editable Left and Right Labels */}
                                <div className="flex justify-between items-center text-sm font-normal text-gray-700 bttm-txt-bar flex-wrap mt-2">
                                    <div className="text-xl font-bold border-2 border-gray-300 rounded-lg px-3 py-2 text-left">
                                        {"No " + scaleTitle}
                                    </div>
                                    <div className="text-xl font-bold border-2 border-gray-300 rounded-lg px-3 py-2 text-right">
                                        {"Severe " + scaleTitle}
                                    </div>
                                </div>


                            </div>
                        </div>

                        <Footer />
                    </div>
                </>
            )}
        </>
    );
};

export default FeelingListPain;