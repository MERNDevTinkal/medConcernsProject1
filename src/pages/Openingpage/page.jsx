import React from "react";
import { Link, useNavigate } from "react-router-dom";
function page() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="welcome-new min-h-screen flex items-center justify-center ">
        <div className="max-w-lg w-full px-6 text-center">
          {/* Logo + Title */}
          <div className="mb-6">
            <img
              src="medconcern-pro-logo.png"
              alt="Logo"
              className="w-80 mx-auto mb-3"
            />
          </div>
          {/* Description */}
          <div className="text-black text-sm leading-relaxed mb-8">
            <p>
              MedConcerns is a communication support tool. It does not diagnose
              or provide medical advice and does not replace clinical judgment.
              For emergencies, call 911 or follow your facility’s emergency
              protocol.
            </p>
          </div>
          {/* Button */}

          <button
            use
            onClick={() => navigate("/how-are-you")}
            className="w-full max-w-xs bg-[#289ae2] text-white font-semibold text-base h-[44px] rounded-lg hover:bg-blue-700 inline-block mx-auto"
          >
            Start
          </button>
          {/* Footer */}
          <div className="mt-12 text-sm text-black">
            © 2022–2026 Communication Rescue LLC. All rights reserved. Patent pending.
            App content, icons, and visual assets are proprietary and may not be reproduced or reused without written permission.
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
