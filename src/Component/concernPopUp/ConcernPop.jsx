import React from "react";
import { Link } from "react-router-dom";
export default function Popup({ confirmFun }) {
    return (
        <>
            <div className="overlay">
                <div className="popup">
                    <h2 className="title">
                        Do you have any<br />other concerns today?
                    </h2>
                    <Link to="/concern" className="option yes flex items-center justify-center">
                        <span className="icon">✔️</span>
                        Yes
                    </Link>
                    <button className="option no" onClick={confirmFun}>
                        <span className="icon">❌</span>
                        No
                    </button>
                </div>
            </div>

        </>
    );
}
