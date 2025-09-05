import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [diseases, setDiseases] = useState({ summaryList: [] });
  const updateDisease = (key, value) => {
    setDiseases((prev) => {
      let newValue;
      if (Array.isArray(prev[key])) {
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

  return (
    <GlobalContext.Provider value={{ diseases, updateDisease, resetDiseases }}>
      {children}
    </GlobalContext.Provider>
  );
};
