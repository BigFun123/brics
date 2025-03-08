import { useState } from "react";
import StatCardWithRating from "./StatCardWithRating";
import { Box, Button, Card, CardActions, CardContent, Link, Stack, TextField, Typography } from "@mui/material";
import { DoGetUser } from "../../controllers/user";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';



export function ChoosableCard({ data, onDataLoaded }) {
    const [entering, setEntering] = useState(true);
    const [userData, setUserData] = useState(data);
    const [busy, setBusy] = useState(false);
    let userid = 0;

    function handleClick() {
        setEntering(true);
    }

    function onFind() {
        setUserData(null);
        setBusy(true);
        DoGetUser(userid)
            .then((data) => {
                setUserData(data);
                onDataLoaded(data);
                console.log(data);

            }).finally(() => {
                setEntering(false);
                setBusy(false);
            });
    }


    return (
        <div>
            {!entering &&
                <Link onClick={handleClick}>
                    <StatCardWithRating {...data}></StatCardWithRating>
                </Link>
            }
            {entering &&

                <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
                    <CardContent>

                        <Typography component="p" variant="h4" gutterBottom>
                            <Stack direction={"row"} sx={{ gap: 2 }}>
                                Find a member
                                {busy && <CloudDownloadIcon></CloudDownloadIcon>}
                            </Stack>
                        </Typography>
                        <Stack
                            direction="column"
                            sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 2 }}
                        >
                            <TextField id="userid" placeholder="name / email / phone / userid" onChange={(e) => { userid = e.target.value }}></TextField>
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Stack
                            direction="column"
                            sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 2 }}
                        >
                            <Button variant="contained" onClick={onFind}>Find</Button>
                        </Stack>
                    </CardActions>
                </Card>
            }
        </div>
    )

}