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
                                ? ""
                                : ""
                        }
                    />
                    <div className="main-wrapper home-wrapper">
                        {selectedLanguage === "Spanish" ? (
                            <>
                                <img src="/assets/health-resourse-images/Mental Health Resource1.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource2.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource3.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource4.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource5.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource6.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource7.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource8.png" className="w-full" />
                            </>
                        ) : (
                            <>
                                <img src="/assets/health-resourse-images/Mental Health Resource1.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource2.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource3.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource4.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource5.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource6.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource7.png" className="w-full" />
                                <img src="/assets/health-resourse-images/Mental Health Resource8.png" className="w-full" />
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
}
