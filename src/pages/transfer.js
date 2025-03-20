import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AppTheme from "../components/shared-theme/AppTheme";
import { alpha } from '@mui/material/styles';
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

    function onDataLoaded(data) {
        setTheirData(data);
        setError(null);
        setMessage(null);
    }

    function onTransfer(amt) {
        setError(null);
        setMessage(null);
        setBusy(true);
        DoTransfer(amt, myData.userid, theirData.userid)
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