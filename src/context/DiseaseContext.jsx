import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const initialState = { summaryList: [] };
  const [diseases, setDiseases] = useState(() => {
    const stored = localStorage.getItem("diseases");
    return stored ? JSON.parse(stored) : initialState;
  });
  const CONCERN_ROUTES = ["/concern"];
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
      const isConcern = routeKey.includes("/concern");
      let updatedList = [...currentList];
      if (isConcern) {
        const existingIndex = updatedList.findIndex(
          group => group.concern?.route === routeKey
        );
        if (existingIndex !== -1) {
          updatedList[existingIndex].concern = {
            route: routeKey,
            data: newDataArray,
          };
          updatedList[existingIndex].flow = [];
        } else {
          updatedList.push({
            concern: {
              route: routeKey,
              data: newDataArray,
            },
            flow: [],
          });
        }
      }
      else {
        let replaced = false;

        updatedList = updatedList.map(group => {
          const flowIndex = group.flow.findIndex(item => item.route === routeKey);

          if (flowIndex !== -1) {
            group.flow[flowIndex] = {
              route: routeKey,
              data: newDataArray,
            };
            replaced = true;
          }
          return group;
        });
        if (!replaced) {
          if (updatedList.length === 0) {
            updatedList.push({
              concern: null,
              flow: [],
            });
          }

          updatedList[updatedList.length - 1].flow.push({
            route: routeKey,
            data: newDataArray,
          });
        }
      }

      const updated = {
        ...prev,
        summaryList: updatedList,
      };

      localStorage.setItem("diseases", JSON.stringify(updated));
      return updated;
    });
  };
  const clearAllDiseases = () => {
    localStorage.removeItem("diseases");
    setDiseases({});
  };
  const deleteLastFlowItem = (currentRoute) => {
    setDiseases((prev) => {
      const flow = prev.summaryList?.[0]?.flow;

      if (!Array.isArray(flow)) return prev;

      const updatedFlow = flow.filter(
        (item) => item.route !== currentRoute
      );
      const updatedSummaryList = [...prev.summaryList];
      updatedSummaryList[0] = {
        ...updatedSummaryList[0],
        flow: updatedFlow,
      };
      const updated = {
        ...prev,
        summaryList: updatedSummaryList,
      };
      localStorage.setItem("diseases", JSON.stringify(updated));
      return updated;
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        diseases,
        deleteLastFlowItem,
        updateDisease,
        resetDiseases,
        deleteLastSummaryItem,
        addOrUpdateSummary,
        clearAllDiseases
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
