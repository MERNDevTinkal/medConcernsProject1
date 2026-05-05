import DecisionCard from "../../Component/ProblemCard/DecisionCard";
import ConcernImg1 from "../../assets/images/pain-img.png";
import { Link } from "react-router-dom";
import Footer from "../../Component/Layout/Footer/Footer";
import BackArrow from "../../assets/images/back-arrow.svg";

function ConcernPain() {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 fixed left-0 right-0 top-0 bg-white innr-header">
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
              <img src={ConcernImg1} className="w-full" />
            </div>
          </div>
          <div>
            <DecisionCard />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ConcernPain;
