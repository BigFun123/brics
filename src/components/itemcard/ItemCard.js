import { Button, Card, CardContent, Grid2, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { APPContext } from "../../lib/context";
import { FileUpload } from "../fileupload/fileupload";

/**
 * Describes an item
 * @param {*} props 
 * @returns 
 */
export function ItemCard({ title, onClick, data, priceError, titleError }) {
    const { Currency, CurrencySymbol, LocalCurrencySymbol } = useContext(APPContext);
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false);

    let postID = data?._id;

    useEffect(() => {
        console.log("ItemCard: ", data);
        if (data) {
            document.getElementById("title").value = data.title;
            document.getElementById("description").value = data.description;
            //document.getElementById("quantity").value = data.quantity;
            document.getElementById("price").value = data.price;
            setEditMode(true);
            //document.getElementById("extra").value = data.extra
        }

    }, [data]);

    function doSetFile(f) {
        setFile(f);
    }

    function doOnClick() {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        //const quantity = document.getElementById("quantity").value;
        const price = document.getElementById("price").value;
        //const extra = document.getElementById("extra").value;        

        onClick({ postID, title, description, price, file });
    }

    return (
        <Card variant="outlined" sx={{  }}>
            <Stack direction={"column"} spacing={2} sx={{ justifyContent: 'space-between' }}>
                <Typography component="p" variant="h4" gutterBottom>
                    {title}
                </Typography>
                <CardContent>
                    <Stack
                        direction="column"
                        sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}
                    >
                        <TextField id="title" placeholder="title, e.g. curtains, maths tutor" required helperText={titleError} error={titleError}></TextField>

                        <Grid2 container spacing={2}>
                            <Grid2 item xs={12}>
                                <Stack direction="column" sx={{ gap: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                    <FileUpload doSetFile={doSetFile} existing={data?.filename}></FileUpload>
                                    <Stack direction={"row"} sx={{ width: 1, gap: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography>{CurrencySymbol}</Typography>
                                        <TextField fullWidth id="price" placeholder="price / rate per hour" required helperText={priceError} error={priceError}></TextField>
                                    </Stack>
                                </Stack>
                            </Grid2>
                            <Grid2 item xs={12} sx={{ flex: 1 }}>
                                <TextField multiline rows={7} id="description" placeholder="description" required variant="standard"></TextField>
                            </Grid2>

                        </Grid2>
                        <Button variant="contained" color="primary" sx={{maxWidth:"200px"}} onClick={doOnClick}>{editMode ? "Update" : "Add"}</Button>


                        {/* <Stack direction={"row"} sx={{ gap: 2, justifyContent: 'start', alignContent: 'center', alignItems: 'center' }}>
                            <TextField id="quantity" placeholder="quantity" required></TextField>
                        </Stack> */}

                        {/* <Stack direction={"row"} sx={{ gap: 2, justifyContent: 'start', alignContent: 'center', alignItems: 'center' }}>
                            <Typography>{LocalCurrencySymbol}</Typography>
                            <TextField id="extra" placeholder="extra cost (local currency)" required></TextField>
                        </Stack> */}
                        
                    </Stack>
                </CardContent>
            </Stack>
        </Card>
    )
}