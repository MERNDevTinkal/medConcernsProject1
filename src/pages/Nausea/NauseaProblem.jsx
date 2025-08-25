import dashimg01 from "../../assets/images/Shortness-of-Breath.png";
import dashimg02 from "../../assets/images/constipation.jpg";
import dashimg03 from "../../assets/images/pain-stomach.jpeg";
import dashimg04 from "../../assets/images/nausea.png";
import dashimg05 from "../../assets/images/something-else.png"; 
import dashimg08 from "../../assets/images/concern-img-08.png"; 
import { Link } from "react-router-dom";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";

const NauseaProblem = () => {
  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="dashboard-h grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3.5 px-4 py-1.5 emotion-cards"> 
                   <Link to="/nausea-problem-yesno">
                     <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
                       <div className="dashboard-img card-img-h rounded-2xl">
                         <img src={dashimg08} className="w-full" />
                       </div>
                       <p className="text-[16px] mt-3 mb-2 color-black">
                         Vomiting
                       </p>
                     </div>
                   </Link>
                   <Link to="/nausea-problem-yesno">
                     <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
                       <div className="dashboard-img card-img-h rounded-2xl">
                         <img src={dashimg02} className="w-full" />
                       </div>
                       <p className="text-[16px] mt-3 mb-2 color-black">Constipation</p>
                       
                     </div>
                   </Link>
                   <Link to="/nausea-problem-yesno">
                     <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
                       <div className="dashboard-img card-img-h rounded-2xl">
                         <img src={dashimg02} className="w-full" />
                       </div>
                       <p className="text-[16px] mt-3 mb-2 color-black">Diarrhea</p>
                     </div>
                   </Link>
                   <Link to="/nausea-problem-yesno">
                     <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
                       <div className="dashboard-img card-img-h rounded-2xl">
                         <img src={dashimg03} className="w-full" />
                       </div>
                       <p className="text-[16px] mt-3 mb-2 color-black">Cramping</p>
                     </div>
                   </Link>
                   <Link to="/nausea-problem-yesno">
                     <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
                       <div className="dashboard-img card-img-h rounded-2xl">
                         <img src={dashimg04} className="w-full" />
                       </div>
                       <p className="text-[16px] mt-3 mb-2 color-black">Just Nausea</p>
                     </div>
                   </Link>
                   <Link to="/nausea-problem-yesno">
                     <div className="dashboard-cards rounded-2xl bg-white text-center border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
                       <div className="dashboard-img card-img-h rounded-2xl">
                         <img src={dashimg05} className="w-full" />
                       </div>
                       <p className="text-[16px] mt-3 mb-2 color-black">Something Else</p>
                     </div>
                   </Link> 
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NauseaProblem;
