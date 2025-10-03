import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const initialState = { summaryList: [] };
  const [diseases, setDiseases] = useState(() => {
    const stored = localStorage.getItem("diseases");
    return stored ? JSON.parse(stored) : initialState;
  });

  const PRESERVE_KEYS = ["how-are-you", "yesno"];

  const updateDisease = (key, value, overwrite = false) => {
    setDiseases((prev) => {
      let newValue;

      if (overwrite) {
        newValue = value;
      } else if (Array.isArray(prev[key])) {
        newValue = [...prev[key], value];
      } else if (typeof prev[key] === "object" && prev[key] !== null) {
        newValue = { ...prev[key], ...value };
      } else {
        newValue = value;
      }

      const updated = {
        ...prev,
        [key]: newValue,
      };

      localStorage.setItem("diseases", JSON.stringify(updated));
      return updated;
    });
  };

  const resetDiseases = () => {
    setDiseases((prev) => {
      const preserved = {};
      PRESERVE_KEYS.forEach((key) => {
        if (prev[key] !== undefined) {
          preserved[key] = prev[key];
        }
      });
      console.log("=======>", preserved);
      const updated = { ...initialState, ...preserved };
      localStorage.setItem("diseases", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteLastSummaryItem = () => {
    const currentList = diseases.summaryList || [];
    if (currentList.length === 0) return;

    const updatedList = currentList.slice(0, -1);
    updateDisease("summaryList", updatedList, true);
  };

  const addOrUpdateSummary = (routeKey, newDataArray) => {
    setDiseases((prev) => {
      const currentList = Array.isArray(prev.summaryList)
        ? [...prev.summaryList]
        : [];

      const existingIndex = currentList.findIndex(
        (item) => item.route === routeKey
      );

      let updatedList = [...currentList];

      if (existingIndex !== -1) {
        updatedList[existingIndex] = {
          route: routeKey,
          data: newDataArray,
        };
      } else {
        updatedList.push({
          route: routeKey,
          data: newDataArray,
        });
      }

      const updated = {
        ...prev,
        summaryList: updatedList,
      };

      localStorage.setItem("diseases", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        diseases,
        updateDisease,
        resetDiseases,
        deleteLastSummaryItem,
        addOrUpdateSummary,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
