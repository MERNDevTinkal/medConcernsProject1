// import { createContext, useState } from "react";
// export const GlobalContext = createContext();
// export const GlobalProvider = ({ children }) => {
//   const initialState = { summaryList: [] };
//   const [diseases, setDiseases] = useState(initialState);
//   const updateDisease = (key, value, overwrite = false) => {
//     setDiseases((prev) => {
//       let newValue;

//       if (overwrite) {
//         newValue = value;
//       } else if (Array.isArray(prev[key])) {
//         newValue = [...prev[key], value];
//       } else if (typeof prev[key] === "object" && prev[key] !== null) {
//         newValue = { ...prev[key], ...value };
//       } else {
//         newValue = value;
//       }
//       const updated = {
//         ...prev,
//         [key]: newValue,
//       };
//       localStorage.setItem("diseases", JSON.stringify(updated));
//       return updated;
//     });
//   };
//   const resetDiseases = () => {
//     setDiseases(initialState);
//     localStorage.removeItem("diseases");
//   };

//   // ✅ Delete last item from summaryList
//   const deleteLastSummaryItem = () => {
//     const currentList = diseases.summaryList || [];
//     if (currentList.length === 0) return;
//     console.log("==>currentListcurrentList", currentList);
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
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const initialState = { summaryList: [] };

  const getInitialState = () => {
    const saved = localStorage.getItem("diseases");
    return saved ? JSON.parse(saved) : initialState;
  };

  const [diseases, setDiseases] = useState(getInitialState);

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

  // ✅ Now expects routeKey to be passed manually
  const addOrUpdateSummary = (routeKey, data) => {
    setDiseases((prev) => {
      const currentList = prev.summaryList || [];

      const existingIndex = currentList.findIndex(
        (item) => item.route === routeKey
      );

      let updatedList;

      if (existingIndex !== -1) {
        updatedList = [...currentList];
        updatedList[existingIndex] = { route: routeKey, data };
      } else {
        updatedList = [...currentList, { route: routeKey, data }];
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
