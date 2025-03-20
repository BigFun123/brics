import { CssBaseline, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { DoGetMembers } from "../controllers/admin";
import App from "../App";
import AppTheme from "../components/shared-theme/AppTheme";
import { DataGrid } from "@mui/x-data-grid";

let rows = [
    
]

export function Admin(props) {
    const [members, setMembers] = React.useState([]);

    const columns = [
        { field: 'id', headerName: 'NAMEID', width: 90 },
        { field: 'name', headerName: 'NAME', width: 190 },
        { field: 'email', headerName: 'EMAIL', width: 220 },
        { field: 'balance', headerName: 'BALACE', width: 70 },
        { field: 'reputation', headerName: 'REPUTATION', width: 70 },
        { field: 'creditrating', headerName: 'CREDITRATING', width: 70 },
    ]

    useEffect(() => {
        getMembers();
    }, []);

    function getMembers() {
        DoGetMembers()
            .then((data) => {
                console.log(data);
                rows = [];

                data.map((item, index) => {
                    rows.push({
                        id: item.userid,
                        name: item.name,
                        email: item.email,
                        balance: item.balance
                    });
                });

                setMembers(rows);
            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <AppTheme {...props} >
            <CssBaseline enableColorScheme />
            <Stack>
                <DataGrid rows={members} columns={columns} >                
                </DataGrid>

            </Stack>
        </AppTheme>
    )
}