import { useContext } from "react";
import SignIn from "../components/sign-in/SignIn";
import SignUp from "../components/sign-up/SignUp";
import { APPContext } from "../lib/context";
import { Transfer } from "./transfer";
import TopBar from "../components/topbar/TopBar";
import { usePage } from "../lib/usePage";

import { Buy } from "./buy";
import { Info } from "./info";
import { Sell } from "./sell";
import { Dash } from "./dash";
import { Profile } from "./profile";
import { Admin } from "./admin";

export function MainPage() {
    const context = useContext(APPContext);
    const { isUtilityPage } = usePage();

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
            {context.appState === "profile" && <Profile></Profile>}
            {context.appState === "admin" && <Admin></Admin>}
        </div>
    )
}