import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [diseases, setDiseases] = useState({});

  const updateDisease = (key, value) => {
    setDiseases((prev) => {
      const updated = {
        ...prev,
        [key]: value,
      };
      localStorage.setItem("diseases", JSON.stringify(updated));
      return updated;
    });
  };


  return (
    <GlobalContext.Provider value={{ diseases, updateDisease }}>
      {children}
    </GlobalContext.Provider>
  );
};
