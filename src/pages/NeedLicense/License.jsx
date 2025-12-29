import {logo} from "../../Component/DiseasesData/images";
import { Link } from "react-router-dom";

function License() {
  return (
    <>
      <div className="main-wrapper">
        <div className="bg-white shadow-xl px-4 py-4 rounded-lg licence-cards max-w-3xl mx-auto">
          <div>
            <img
              src={logo}
              alt="MedConcerns Logo"
              className="mx-auto mb-6 w-80"
            />
          </div>
          <h2 className="text-center">Need a license code?</h2>
          <div>
            <h4> For Hospitals & Facilities</h4>
            <p>
              Facilities can obtain MedConcerns for their staff. <br /> We’ll
              help you with pricing, setup, and onboarding.
            </p>
            <Link
              to="/license-contact?type=hospital"
              className="bg-[#008CFF] text-white py-3 px-8 rounded-lg text-lg mt-5 mb-5 inline-block"
            >
              Request facility access
            </Link>
          </div>
          <div>
            <h4> For Individuals & Families</h4>
            <p>
              Individuals can use MedConcerns independently. <br /> We’ll send
              simple payment instructions and your access code.
            </p>
            <Link
              to="/license-contact?type=individual"
              className="bg-[#008CFF] text-white py-3 px-8 rounded-lg text-lg mt-5 mb-5 inline-block"
            >
              Request individual access
            </Link>
          </div>
          <div>
            <h4>Already Purchased?</h4>
            <p>
              If you previously purchased MedConcerns but lost or didn’t receive
              your code, we can resend it.
            </p>
            <Link
              to="/license-contact?type=already"
              className="bg-[#008CFF] text-white py-3 px-8 rounded-lg text-lg mt-5 mb-5 inline-block"
            >
              Resend my code
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default License;
