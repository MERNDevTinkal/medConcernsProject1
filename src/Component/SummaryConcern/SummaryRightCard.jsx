import React from "react";
const SummaryRightCard = ({ selectedLanguage, SummaryDetail }) => {
  const getTranslatedText = (item, selectedLanguage) => {
    const isSpanish = selectedLanguage === "Spanish";
    if (item?.name || item?.nameEs) {
      return isSpanish ? item?.nameEs : item?.name || item?.name;
    }
    if (item?.painFeel || item?.painFeelEs) {
      return isSpanish ? item?.painFeelEs : item?.painFeel;
    }
    if (item?.data?.[0]?.name || item?.data?.[0]?.nameEs) {
      if (item.route === "/new-problem") {
        return isSpanish
          ? item?.data?.[0]?.SpanishnewProblem
          : item?.data?.[0]?.newProblem;
      }
      if (isSpanish) {
        let value;
        value = isSpanish ? item?.data?.[0]?.nameEs : item?.data?.[0]?.name;
        if (!item?.data?.[0]?.nameEs && item?.data?.[0]?.name) {
          value = item?.data?.[0]?.name;
        }
        return value;
      }
      return item?.data?.[0]?.name;
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
        console.log("=gfegegerggegeg=>");
        return (
          <div key={index}>
            <div
              className={`dashboard-cards ${
                item?.data[0].decision ? "decision-card" : ""
              } rounded-2xl bg-white text-center px-5 py-4 h-full border-2 border-white hover:border-blue-600 shadow-sm transition-colors duration-300`}
            >
              <span
                className={
                  item?.data[0].decision === "YES"
                    ? "ys-cls decision-badge"
                    : item?.data[0].decision === "NO"
                    ? "no-cls decision-badge"
                    : item?.data[0].decision === "Maybe"
                    ? "maybe-cls decision-badge"
                    : ""
                }
              >
                {item?.data[0].decision ?? ""}
              </span>
              <div className="dashboard-img">
                <img src={item?.image ?? item?.data[0]?.image} />
              </div>
              <p className="text-[16px] mt-3 color-black">
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
