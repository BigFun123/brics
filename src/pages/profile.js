import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { DoSignOut } from "../controllers/user";
import { usePage } from "../lib/usePage";

export function Profile(props) {
    const { setAppState } = usePage();

    function handleSignOut() {
        console.log('handleSignOut');
        DoSignOut()
        .then((result) => {
            console.log('result:', result);
            setAppState("signin");
        })  
    }


    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Profile
                </Typography>
            </CardContent>
            <CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleSignOut}>
                        Sign Out
                    </Button>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}