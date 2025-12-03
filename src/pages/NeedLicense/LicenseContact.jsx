import React from "react";

function LicenseContact() {
  return (
    <>
      <div className="main-wrapper">
        <div className="bg-white shadow-lg px-4 py-4 rounded-lg contact-licence max-w-2xl mx-auto">
          <h2 className="text-center mb-6 text-2xl font-semibold">
            Contact Us
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                className="w-full border  rounded-md p-2 border-[#ABCEFA] h-12"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="w-full border  rounded-md p-2 border-[#ABCEFA] h-12"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Type
              </label>
              <select className="w-full border rounded-md p-2 border-[#ABCEFA] h-12 focus:outline-0">
                <option value="">Select Type</option>
                <option value="hospital">For Hospitals & Facilities</option>
                <option value="individual">For Individuals & Families</option>
                <option value="already">Already Purchased?</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter Your Message"
                className="w-full border rounded-md p-2 border-[#ABCEFA] h-24"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                className="bg-[#008CFF] text-white py-3 px-8 rounded-lg text-lg mt-4 mb-4"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LicenseContact;
