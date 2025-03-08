import React, { createContext, useContext, useState } from 'react';


const globals = {
    appState: "signin",
    isSignedIn: false,
}

const CurrencySymbol = "§";
const CurrencyName = "Clay";
const LocalCurrencySymbol = "R";

// Create a context with a default value
const APPContext = createContext({});

const APPContextProvider = (props) => {
    const [appState, setAppState] = useState(globals.appState);
    const [isSignedIn, setIsSignedIn] = useState(globals.isSignedIn);
    const [me, setMe] = useState({});
    const [data, setData] = useState({});

    function doSetState(state, data = null) {
        setData(data);
        setAppState(state);
    }

    return (
        <APPContext.Provider value={{ appState, setAppState: doSetState, isSignedIn, setIsSignedIn, me, setMe, CurrencySymbol, CurrencyName, LocalCurrencySymbol, data }}>
            {props.children}
        </APPContext.Provider>
    );
};

export { APPContext, APPContextProvider };