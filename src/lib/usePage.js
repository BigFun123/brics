import { useContext } from "react";
import { APPContext } from "./context";

const utilityPages = ["signin", "signup", "signout", "dashboard"];

/**
 * Custom hook to set the app page
 * @returns 
 */
export function usePage() {
    const context = useContext(APPContext);
    const { appState, setAppState } = context;

    function isUtilityPage() {
        return utilityPages.includes(context.appState) == true;
    }

    if (!context) {
        throw new Error('usePage must be used within an APPContext.Provider');
    }
    return { context, isUtilityPage, appState, setAppState };
}