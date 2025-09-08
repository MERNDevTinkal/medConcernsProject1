import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const initialState = { summaryList: [] };
  const [diseases, setDiseases] = useState(initialState);
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

  const deleteLastSummaryItem = () => {
    const currentList = diseases.summaryList || [];
    if (currentList.length === 0) return;
    const updatedList = currentList.slice(0, -1);
    updateDisease("summaryList", updatedList);
  };

  return (
    <GlobalContext.Provider
      value={{ diseases, updateDisease, resetDiseases, deleteLastSummaryItem }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// import { createContext, useState } from "react";

// export const GlobalContext = createContext();

// export const GlobalProvider = ({ children }) => {
//   const initialState = { summaryList: [] };
//   const [diseases, setDiseases] = useState(initialState);

//   // ✅ updateDisease with overwrite flag
//   const updateDisease = (key, value, overwrite = false) => {
//     setDiseases((prev) => {
//       let newValue;

//       if (overwrite) {
//         newValue = value;
//       } else if (Array.isArray(prev[key])) {
//         newValue = [...prev[key], value]; // Append
//       } else if (typeof prev[key] === "object" && prev[key] !== null) {
//         newValue = { ...prev[key], ...value }; // Merge object
//       } else {
//         newValue = value; // Replace directly
//       }

//       const updated = {
//         ...prev,
//         [key]: newValue,
//       };

//       localStorage.setItem("diseases", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   // ✅ Reset all disease data
//   const resetDiseases = () => {
//     setDiseases(initialState);
//     localStorage.removeItem("diseases");
//   };

//   // ✅ Delete last item from summaryList
//   const deleteLastSummaryItem = () => {
//     const currentList = diseases.summaryList || [];
//     if (currentList.length === 0) return;

//     const updatedList = currentList.slice(0, -1); // remove last
//     updateDisease("summaryList", updatedList, true); // overwrite = true
//   };

//   return (
//     <GlobalContext.Provider
//       value={{
//         diseases,
//         updateDisease,
//         resetDiseases,
//         deleteLastSummaryItem,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };
