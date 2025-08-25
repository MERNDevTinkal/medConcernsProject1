import React, { createContext, useState } from "react";

export const DiseaseContext = createContext();

export const DiseaseProvider = ({ children }) => {
    const [diseases, setDiseases] = useState([]);

    return (
        <DiseaseContext.Provider value={{ diseases, setDiseases }}>
            {children}
        </DiseaseContext.Provider>
    );
};
