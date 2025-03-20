import { Box, Button, CssBaseline, Typography } from "@mui/material";
import AppTheme from "../components/shared-theme/AppTheme";
import { useContext, useEffect, useState } from "react";
import { APPContext } from "../lib/context";
import { alpha } from '@mui/material/styles';
import { Catalog } from "../components/catalog/Catalog";
import { DoBuy, DoGetItems } from "../controllers/user";
import { Categories } from "../components/categories/Categories";

export function Buy(props) {
    const context = useContext(APPContext);    
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

    function onEdit(rowid) {
        console.log(rowid);
        // switch to edit page with row._id
        context.setAppState("sell", { "id": rowid });
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