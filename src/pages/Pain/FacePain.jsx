import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import FaceDiagram from "../../Component/Paindiagram/FaceDiagram";
import DecisionCardSed from "../../Component/ProblemCard/DecisionCardSed";

const EarPain = () => {
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="px-10 my-5">
          <div className="grid grid-cols-2  gap-20 items-center">
            <div className="w-full p-4 bg-white shadow-sm rounded-[20px]">
              <FaceDiagram />
            </div>
            <div>
              <DecisionCardSed />
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EarPain;
