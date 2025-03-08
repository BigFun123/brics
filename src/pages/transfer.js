import { AppBar, Box, Button, CssBaseline, Grid, IconButton, Link, Stack, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SignIn from "../components/sign-in/SignIn";
import SignUp from "../components/sign-up/SignUp";
import { APPContext } from "../lib/context";
import MenuIcon from '@mui/icons-material/Menu';
import Dashboard from "../components/dashboard/Dashboard";
import Checkout from "../components/checkout/Checkout";
import { AccountCard } from "../components/accountCard/AccountCard";
import AppTheme from "../components/shared-theme/AppTheme";
import AppNavbar from "../components/dashboard/components/AppNavbar";
import { alpha } from '@mui/material/styles';
import TopBar from "../components/topbar/TopBar";
import StatCardWithRating from "../components/accountCard/StatCardWithRating";
import AmountCard from "../components/amountcard/AmountCard";
import { DoGetUser, DoTransfer } from "../controllers/user";
import { ChoosableCard } from "../components/accountCard/ChoosableCard";


const LucyData = {
    title: 'Tap To Select Receiver',
    value: '0k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
        0, 0,
    ],
}

export function Transfer(props) {
    const context = useContext(APPContext);
    const [myData, setMyData] = useState(null);
    const [theirData, setTheirData] = useState(LucyData);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("loading...");
    const [busy, setBusy] = useState(false);

 

    useEffect(() => {
        getMyData();
    }, []);

    function getMyData() {
        DoGetUser()
            .then((data) => {
                setMyData(data);
                setLoaded(true);
                console.log(data);
            }).catch((error) => {
                console.error('Error:', error);
            }).finally(() => {
                setMessage(null);
            });
    }

    function getTheirData() {
        DoGetUser(theirData.userid)
            .then((data) => {
                setTheirData(data);
                console.log(data);
            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    function handleBack() {
        context.setAppState("main");
    }

    function onDataLoaded(data) {
        setTheirData(data);
        setError(null);
        setMessage(null);
    }

    function onTransfer(amt) {
        setError(null);
        setMessage(null);
        setBusy(true);
        const result = DoTransfer(amt, myData.userid, theirData.userid)
            .then(result => {
                if (result?.success) {
                    console.log('Transfer success');
                    setMessage('Transfer success. TR Code:' + result?.transactioncode);
                    getMyData();
                    getTheirData();
                } else {
                    setError(result?.message);
                    console.log('Transfer failed:', result?.message);
                }
            }).finally(() => {
                setBusy(false);
            });
    }

    return (
        <AppTheme {...props} >
            <CssBaseline enableColorScheme />            
            
            <Box
                component="main"
                sx={(theme) => ({
                    flexGrow: 1,
                    backgroundColor: theme.vars
                        ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                        : alpha(theme.palette.background.default, 1),
                    overflow: 'auto',
                    margin: 1,
                })}
            >
                {error && <Typography fontSize={22} sx={(theme) => ({
                    backgroundColor: theme.palette.error.main,
                    color: theme.palette.error.contrastText
                })}>{error}</Typography>}
                {message && <Typography fontSize={22} sx={(theme) => ({
                    backgroundColor: theme.palette.success.main,
                    color: theme.palette.success.contrastText,
                    padding: 1,
                })}>{message}</Typography>}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        {loaded && <StatCardWithRating {...myData} ></StatCardWithRating>}
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {loaded && <AmountCard onClick={onTransfer} busy={busy}></AmountCard>}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {loaded && <ChoosableCard data={theirData} onDataLoaded={onDataLoaded} ></ChoosableCard>}
                    </Grid>
                </Grid>
            </Box>

        </AppTheme>
    )
}