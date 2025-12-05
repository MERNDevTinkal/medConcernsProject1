"use client";
import React, { useState, useCallback } from "react";
import dashimg01 from "/assets/images/All-Day.png";
import dashimg02 from "/assets/images/Evening-Night.png";
import dashimg03 from "/assets/images/Morning.png";
import dashimg04 from "/assets/images/After-Procedure.png";
import dashimg05 from "/assets/images/Always-Chronic.png";
import dashimg06 from "/assets/images/Comes-and-Goes.png";
import dashimg07 from "/assets/images/Just-Started.png";
import dashimg08 from "/assets/images/When-Eating-Drinking.png";
import dashimg09 from "/assets/images/When-Lying-Down.png";
import dashimg10 from "/assets/images/When-Sitting.png";
import dashimg11 from "/assets/images/When-Sleeping.png";
import dashimg12 from "/assets/images/When-Standing.png";
import dashimg13 from "/assets/images/When-Toileting.png";
import dashimg14 from "/assets/images/When-Walking.png";
import dashimg15 from "/assets/images/With-Activity.png";
import dashimg16 from "/assets/images/With-Blood-Sugar.png";
import dashimg18 from "/assets/images/With-Medication.png";
import dashimg19 from "/assets/images/With-Movement.png";
import dashimg20 from "/assets/images/With-Transfer-Repositioning.png";
import dashimg21 from "/assets/images/With-Tube-Feed.png";
import dashimg22 from "/assets/images/Since-My-Stroke.png";
import dashimg23 from "/assets/images/Since-Illness.png";
import dashimg24 from "/assets/images/Since-Fall.png";
import dashimg25 from "/assets/images/I-dont-know.png";
import dashimg26 from "/assets/images/concern-img-03.png";
import dashimg27 from "/assets/images/something-else.png";
import SaveMode from "../../Component/saveASModel/saveModel"
const Cards = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const openSaveModal = useCallback(() => setShowSaveModal(true), []);
  return (
    <>

      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5" onClick={openSaveModal}>
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg03} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">Morning</p>
      </div>

      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg01} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">All Day</p>
      </div>

      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg02} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">Evening / Night</p>
      </div>


      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg07} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">Just Started</p>
      </div>

      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg06} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">Comes and Goes</p>
      </div>

      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg12} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">When Standing</p>
      </div>

      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg10} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">When Sitting</p>
      </div>

      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg09} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">When Lying Down</p>
      </div>

      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg11} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">When Sleeping</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg14} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">When Walking</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg15} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">With Activity</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg20} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">With Transfer/Repositioning</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg19} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">With Movement</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg26} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">With Swallowing</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg18} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">With Medication</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg08} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">When Eating / Drinking</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg13} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">When Toileting</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg16} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">With Blood Sugar / Pressure</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg21} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">With Tube Feed</p>
      </div>

      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg04} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">After Procedure</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg22} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">Since My Stroke / Injury</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg23} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">Since Illness</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg24} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">Since Fall / Injury</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg05} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">Always / Chronic</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg25} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">I don’t know</p>
      </div>
      <div className="dashboard-cards rounded-2xl bg-white text-center pb-0.5">
        <div className="dashboard-img card-img-h rounded-2xl">
          <img src={dashimg27} className="w-full" />
        </div>
        <p className="text-[16px] mt-3 mb-2 color-black">Something Else</p>
      </div>


      {showSaveModal && (
        <SaveMode setShowSaveModal={setShowSaveModal} />
      )}
    </>
  );
};

export default Cards;
