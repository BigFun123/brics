import { CssBaseline, Stack, Typography } from "@mui/material";
import AppTheme from "../components/shared-theme/AppTheme";
import { ItemCard } from "../components/itemcard/ItemCard";
import { useContext, useEffect, useState } from "react";
import { DoGetItem, DoListItem } from "../controllers/user";
import { alpha } from '@mui/material/styles';
import { APPContext } from "../lib/context";
import { Loading } from "../components/loading/Loading";


export function Sell(props) {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [titleError, setTitleError] = useState(null);
    const [priceError, setPriceError] = useState(null);
    const { data } = useContext(APPContext);
    const [localData, setLocalData] = useState(null);
    const [title, setTitle] = useState("New Listing");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // if we're editing a listing, fetch the deets
        if (data) {
            setLoading(true);
            setTitle("Edit Listing");
            DoGetItem(data.id)
                .then((data) => {
                    setLocalData(data);
                }).catch((error) => {
                    console.error('Error:', error);
                    setError(error);
                }).finally(() => {
                    setLoading(false);
                });
        }
    }, [data]);

    /**
     * Called by the item card when the user clicks the button
     * @param {*} data 
     */
    function onDoListing(data) {
        setError(null);
        setMessage(null);
        const formData = new FormData();
        formData.append("file", data.file);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        //formData.append("extra", data.extra);
        formData.append("quantity", data.quantity);
        formData.append("postID", data.postID);

        DoListItem(formData)
            .then((data) => {
                console.log(data);
                if (data.success)
                    setMessage("Sucess. " + data?.message);
                else {
                    setError("Failed: " + data?.message);
                    data.target === "title" ? setTitleError(data?.message) : setTitleError(null);
                    data.target === "price" ? setPriceError(data?.message) : setPriceError(null);
                }
            }).catch((error) => {
                console.error('Error:', error);
                setError(error);
            });
    }

    return (
        <AppTheme {...props} >
            <CssBaseline enableColorScheme />
            <Stack
                component="main"
                sx={(theme) => ({
                    backgroundColor: theme.vars
                        ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                        : alpha(theme.palette.background.default, 1),
                    overflow: 'auto',
                    padding: 1,
                    display: { xs: 'block', sm: 'block', lg: 'flex' },
                    margin: 'auto',
                    maxWidth: '800px',

                })}
            >

                <ItemCard title={title} onClick={onDoListing} data={localData} titleError={titleError} priceError={priceError} />
                {error && <Typography fontSize={22} sx={(theme) => ({
                    backgroundColor: theme.palette.error.main,
                    color: theme.palette.error.contrastText
                })}>{error}</Typography>}
                {message && <Typography fontSize={22} sx={(theme) => ({
                    backgroundColor: theme.palette.success.main,
                    color: theme.palette.success.contrastText,
                    padding: 1,
                })}>{message}</Typography>}
                {loading && <Loading></Loading>}

            </Stack>
        </AppTheme>
    )
}