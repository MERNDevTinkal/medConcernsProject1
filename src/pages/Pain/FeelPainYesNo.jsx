import {PainImg1,BackArrow } from "../../Component/DiseasesData/images";;
import { Link } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import DecisionCardFeel from "./DecisionCardFeel";

function FeelPainYesNo() {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 to-0 bg-white innr-header">
        <Link to="/">
          <img src={BackArrow} />
        </Link>
        <h2 className="text-[25px] font-normal text-black text-center">Pain</h2>
        <button></button>
      </div>
      <div className="main-wrapper home-wrapper ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:px-10 sm:px-5 px-5 md:gap-20 gap-5 my-5 items-center">
          <div className="dashboard-cards rounded-2xl bg-white text-center shadow-sm p-3">
            <div className="dashboard-img rounded-2xl">
              <img src={PainImg1} className="w-full" />
            </div>
          </div>
          <div>
            <DecisionCardFeel />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default FeelPainYesNo;
