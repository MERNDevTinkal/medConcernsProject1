import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { diseasesData } from "../../Component/DiseasesData/diseasesData"
import Footer from "../../Component/Layout/Footer/Footer";
import { GlobalContext } from "../../context/DiseaseContext";
import BackArrow from "../../assets/images/back-arrow.svg";
import { getTextToSpeech } from "../../Component/TextToSpeech/TextToSpeech"
const feelOptions = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [emotionsicons, setEmotionsicons] = useState([]);
    const mainpath = location.pathname;
    const { updateDisease, diseases } = useContext(GlobalContext);
    const handleSelect = async (value, path) => {
        if (value && path) {
            await getTextToSpeech(value)
            updateDisease(mainpath, value)
            navigate(path)
        }
    }
    useEffect(() => {
        setEmotionsicons(diseasesData[mainpath])
    }, [mainpath])
    return (
        <>
            <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
                <button>
                    <img src={BackArrow} />
                </button>
                <h2 className="text-[25px] font-normal text-black">
                    How do you feel overall?
                </h2>
                <button></button>
            </div>

            <div className="main-wrapper home-wrapper pt-20 pb-24 px-4">
                <div className="dashboard-wrapper feel-list-main">
                    <ul className="flex flex-col gap-6">
                        {emotionsicons.map(({ id, name, secPath }) => (
                            <li key={id}>
                                <button
                                    onClick={() => handleSelect(name, secPath)}
                                    className="w-full text-left p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition flex items-center justify-between"
                                >
                                    <span className="text-lg font-medium text-gray-700">
                                        {name}
                                    </span>
                                    <span className="text-gray-400">›</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default feelOptions;
