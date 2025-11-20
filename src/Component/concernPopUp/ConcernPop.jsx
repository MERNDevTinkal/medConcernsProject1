import React from "react";
export default function Popup({ confirmFun }) {
    return (
        <>
            <div className="overlay">
                <div className="popup">
                    <h2 className="title">
                        Do you have any<br />other concerns today?
                    </h2>
                    <button className="option yes" onClick={()=>{confirmFun("Yes")}}>
                        <span className="icon">✔️</span>
                        Yes
                    </button>
                    <button className="option no" onClick={()=>{confirmFun("No")}}>
                        <span className="icon">❌</span>
                        No
                    </button>
                </div>
            </div>

        </>
    );
}
