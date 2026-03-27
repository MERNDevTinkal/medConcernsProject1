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
      {SummaryDetail?.flat()?.map((item, index) => {
        const imageValue =
          item.route === "/feelOptions/6" && selectedLanguage === "Spanish"
            ? item?.data[0]?.imageSp
            : (item?.image ?? item?.data[0]?.image);
        return (
          <div key={index}>
            <div
              className={`dashboard-cards  ${typeof imageValue === "number" ? "number-card" : ""} ${
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
                {(() => {
                  const imageValue =
                    item.route === "/feelOptions/6" &&
                    selectedLanguage === "Spanish"
                      ? item?.data[0]?.imageSp
                      : (item?.image ?? item?.data[0]?.image);

                  return typeof imageValue === "number" ? (
                    <div
                      className={`w-full h-full flex items-center justify-center ${typeof imageValue === "number" ? "number-card-innr" : ""}`}
                    >
                      <span className=" font-bold text-3xl md:text-4xl lg:text-5xl">
                        {imageValue}
                      </span>
                    </div>
                  ) : (
                    imageValue && (
                      <img
                        src={imageValue}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )
                  );
                })()}
              </div>
              <p className="text-lg sm:text-base mt-3 color-black">
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
