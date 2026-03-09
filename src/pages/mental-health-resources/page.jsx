import React, { useEffect, useState } from "react";
import Header from "../../Component/Layout/Header/Header";
import getSetting from "../../Component/settingApi/settings";
import Loader from "../../Component/webLoader/loader";
export default function MentalHealthResources() {
    const [selectedLanguage, setSelectedLanguage] = React.useState("");
    const [IntroductionOn, setIntroductionOn] = React.useState("");
    const [CalendarOn, setCalendarOn] = React.useState("");
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getSetting(
            () => { },
            () => { },
            setSelectedLanguage,
            setCalendarOn,
            setIntroductionOn,
            setLoader,
            () => { },
            () => { }
        );
    }, [loader]);
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
                                ? "Recursos de salud mental"
                                : "Mental Health Resources"
                        }
                    />
                    <div className="main-wrapper home-wrapper">
                        {selectedLanguage === "Spanish" ? (
                            <>
                                 <img src="/assets/health-resourse-images/image (6).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (7).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (8).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (9).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (10).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (11).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (12).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (13).png" className="w-full" />
                            </>
                        ) : (
                            <>
                                <img src="/assets/health-resourse-images/image (6).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (7).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (8).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (9).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (10).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (11).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (12).png" className="w-full" />
                                <img src="/assets/health-resourse-images/image (13).png" className="w-full" />
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
}
