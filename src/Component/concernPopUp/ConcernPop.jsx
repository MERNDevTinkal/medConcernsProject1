import React from "react";
export default function Popup({ selectedLanguage, confirmFun }) {
    return (
        <>
            <div className="overlay">
                <div className="popup">
                    <h2 className="title">
                        {selectedLanguage === "Spanish" ? (
                            <>
                                ¿Tienes alguna <br /> otra inquietud hoy?
                            </>
                        ) : (
                            <>
                                Do you have any <br /> other concerns today?
                            </>
                        )}


                    </h2>
                    <button className="option yes" onClick={() => { confirmFun("Yes") }}>
                        <span className="icon">✔️</span>
                        {selectedLanguage === "Spanish" ? 'SÍ' : 'Yes'}
                    </button>
                    <button className="option no" onClick={() => { confirmFun("No") }}>
                        <span className="icon">❌</span>
                        No
                    </button>
                </div>
            </div>
        </>
    );
}
