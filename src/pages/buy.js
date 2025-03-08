import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import { ChoosableCard } from "../components/accountCard/ChoosableCard";
import AppTheme from "../components/shared-theme/AppTheme";
import TopBar from "../components/topbar/TopBar";
import { use, useContext, useEffect, useState } from "react";
import { APPContext } from "../lib/context";
import { alpha } from '@mui/material/styles';
import { ItemCard } from "../components/itemcard/ItemCard";
import { Catalog } from "../components/catalog/Catalog";
import { DoBuy, DoGetItems } from "../controllers/user";
import { Categories } from "../components/categories/Categories";

const LucyData = {
    title: 'Tap To Select Receiver',
    value: '0k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
        0, 0,
    ],
}

export function Buy(props) {
    const context = useContext(APPContext);
    const [theirData, setTheirData] = useState(LucyData);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        //context.setAppState("buy");
        DoGetItems().then((data) => {
            console.log(data);
            if (!data) {
                setError("No data");
                return;
            }
            // add a key to each item
            data.forEach((item, index) => {
                item.id = index;
            });
            setItems(data);
        }).catch((error) => {
            console.error('Error:', error);
            setError(error);
        });
    }, []);

    function handleBuy() {
        setMessage("Buying...");
        DoBuy(1, 2)
            .then((data) => {
                console.log(data);
                setMessage("Bought. Blockchain hash: " + data?.transaction?.hash);
            }).catch((error) => {
                console.error('Error:', error);
                setError(error);
            });
    }

    function handleBack() {
        context.setAppState("main");
    }

    function onDataLoaded(data) {
        console.log(data);
        setTheirData(data);
    }

    function onEdit(rowid) {
        console.log(rowid);
        // switch to edit page with row._id
        context.setAppState("sell", {"id": rowid});
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
                    padding: 1
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
                <Categories>    </Categories>
                <Button onClick={handleBuy} variant="outline">Buy</Button>
                <Catalog rows={items} onEdit={onEdit}></Catalog>
            </Box>

        </AppTheme>
    )

}