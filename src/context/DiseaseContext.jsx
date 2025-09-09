import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const initialState = { summaryList: [] };
  const [diseases, setDiseases] = useState(initialState);
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
    setDiseases(initialState);
    localStorage.removeItem("diseases");
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

      // Check if route already exists
      const existingIndex = currentList.findIndex(
        (item) => item.route === routeKey
      );

      let updatedList = [...currentList];

      if (existingIndex !== -1) {
        // ✅ Overwrite the existing route entry at the same index
        updatedList[existingIndex] = {
          route: routeKey,
          data: newDataArray,
        };
      } else {
        // ✅ Add new route entry
        updatedList.push({
          route: routeKey,
          data: newDataArray,
        });
      }

      const updated = {
        ...prev,
        summaryList: updatedList,
      };

      // ✅ Persist to localStorage
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
