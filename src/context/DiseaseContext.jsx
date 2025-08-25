// src/context/DiseaseContext.jsx
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [diseases, setDiseases] = useState({});

  const updateDisease = (key, value) => {
    setDiseases((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <GlobalContext.Provider value={{ diseases, updateDisease }}>
      {children}
    </GlobalContext.Provider>
  );
};
