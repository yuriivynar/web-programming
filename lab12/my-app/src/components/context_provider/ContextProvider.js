import React, { useState, useEffect } from "react";
import CurrencyContext from "../create_context/CreateContext";

function ContextProvider({ children }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('/api/Gems.json');
          const jsonData = await response.json();
          setData(jsonData);
        };
        fetchData();
    }, []);

    return (
        <CurrencyContext.Provider value={data}>
            {children}
        </CurrencyContext.Provider>
    );
}

export default ContextProvider;
