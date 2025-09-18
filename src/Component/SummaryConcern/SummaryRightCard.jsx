import React from "react";
const SummaryRightCard = ({ selectedLanguage, SummaryDetail }) => {
  const getTranslatedText = (item, selectedLanguage) => {
    const isSpanish = selectedLanguage === "Spanish";
    if (item?.name || item?.nameEs) {
      return isSpanish ? item?.nameEs : item?.name;
    }
    if (item?.painFeel || item?.painFeelEs) {
      return isSpanish ? item?.painFeelEs : item?.painFeel;
    }
    if (item?.data?.[0]?.name || item?.data?.[0]?.nameEs) {
      return isSpanish ? item?.data?.[0]?.nameEs : item?.data?.[0]?.name;
    }

    if (item?.data?.[0]?.painFeel || item?.data?.[0]?.painFeelEs) {
      return isSpanish
        ? item?.data?.[0]?.painFeelEs
        : item?.data?.[0]?.painFeel;
    }

    return "";
  };

  return (
    <>
      {SummaryDetail.flat().map((item, index) => {
        return (
          <div key={index}>
            <div className="dashboard-cards rounded-2xl bg-white text-center px-5 py-4 h-full border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300">
              <div className="dashboard-img flex justify-center items-center">
                <img
                  style={{ width: "89px", height: "69px" }}
                  src={item?.image ?? item?.data[0]?.image}
                />
              </div>
              <p className="text-[14px] mt-3 color-black">
                {getTranslatedText(item, selectedLanguage)}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SummaryRightCard;
