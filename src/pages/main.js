import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import SignIn from "../components/sign-in/SignIn";
import SignUp from "../components/sign-up/SignUp";
import { APPContext } from "../lib/context";
import MenuIcon from '@mui/icons-material/Menu';
import { Transfer } from "./transfer";
import ButtonAppBar from "../components/topbar/TopBar";
import TopBar from "../components/topbar/TopBar";
import Dashboard from "../components/dashboard/Dashboard";
import { usePage } from "../lib/usePage";

import { Buy } from "./buy";
import { Info } from "./info";
import { Sell } from "./sell";
import { Dash } from "./dash";



export function MainPage() {
    const context = useContext(APPContext);
    const { isSignedIn } = useContext(APPContext);
    const { appState, setAppState, isUtilityPage } = usePage();

    return (
        <div>
            {!isUtilityPage() && <TopBar />}

            {context.appState === "signin" && <SignIn></SignIn>}
            {context.appState === "signup" && <SignUp>HELLO</SignUp>}
            {context.appState === "transfer" && <Transfer></Transfer>}
            {context.appState === "buy" && <Buy></Buy>}
            {context.appState === "sell" && <Sell></Sell>}
            {context.appState === "dashboard" && <Dash></Dash>}
            {context.appState === "main" && <Info></Info>}
        </div>
    )
}