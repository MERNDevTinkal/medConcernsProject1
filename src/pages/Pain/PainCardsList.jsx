import React from "react";
import { Link } from "react-router-dom";
import PainImg1 from "../../assets/images/squeezing.png";
import PainImg2 from "../../assets/images/Burning.png";
import PainImg3 from "../../assets/images/dullpain.png";
import PainImg4 from "../../assets/images/stabbingpain.jpg";
import PainImg5 from "../../assets/images/numbness-tingling-rev.jpeg";
import PainImg6 from "../../assets/images/spasming.png";
import PainImg7 from "../../assets/images/pins-and-needles.png";
import PainImg8 from "../../assets/images/pain-stomach.jpeg";
import PainImg9 from "../../assets/images/heavy-pain.png";
import PainImg10 from "../../assets/images/shooting-pain.png";
import PainImg11 from "../../assets/images/headache.png";
import PainImg12 from "../../assets/images/itching.png";
import PainImg13 from "../../assets/images/PEG-pain.png";
import PainImg14 from "../../assets/images/trach-pain.png"; 
import PainImg15 from "../../assets/images/something-else.png"; 

const PainCardsList = () => {
  return (
    <>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards card-img-h card-img-h ">
            <img src={PainImg1} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Squeezing / Tight</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg2} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Burning</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg3} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Aching / Dull</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg4} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Sharp / Stabbing</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg5} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Numb / Tingling</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg6} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Spasming</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg7} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Pins and Needles</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg8} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Cramping</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg9} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Heavy</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg10} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Shooting</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg11} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Throbbing</p>
        </div>
      </Link>
        
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg12} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Itching</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg13} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">PEG Pain</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg14} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Trach Pain</p>
        </div>
      </Link>
      <Link to="/feeling-list-pain">
        <div className="dashboard-cards rounded-2xl bg-white text-center pb-3">
          <div className="dashboard-cards  card-img-h">
            <img src={PainImg15} className="w-full" />
          </div>
          <p className="text-[21px] mt-3 color-black">Something Else</p>
        </div>
      </Link>
       
    </>
  );
};

export default PainCardsList;
