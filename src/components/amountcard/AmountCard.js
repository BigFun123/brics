import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, Skeleton, TextField } from '@mui/material';

function getDaysInMonth(month, year) {
    const date = new Date(year, month, 0);
    const monthName = date.toLocaleDateString('en-US', {
        month: 'short',
    });
    const daysInMonth = date.getDate();
    const days = [];
    let i = 1;
    while (days.length < daysInMonth) {
        days.push(`${monthName} ${i}`);
        i += 1;
    }
    return days;
}

function AreaGradient({ color, id }) {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    );
}

AreaGradient.propTypes = {
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

function AmountCard({ onClick, busy }) {
    const [loaded, setLoaded] = React.useState("loaded");    

    function handleTransfer() {
        const amount = document.getElementById("amountid").value;
        onClick(amount);
    }

    const theme = useTheme();
    const daysInWeek = getDaysInMonth(4, 2024);

    const trendColors = {
        up:
            theme.palette.mode === 'light'
                ? theme.palette.success.main
                : theme.palette.success.dark,
        down:
            theme.palette.mode === 'light'
                ? theme.palette.error.main
                : theme.palette.error.dark,
        neutral:
            theme.palette.mode === 'light'
                ? theme.palette.grey[400]
                : theme.palette.grey[700],
    };

    const labelColors = {
        up: 'success',
        down: 'error',
        neutral: 'default',
    };

    const trendValues = { up: '+25%', down: '-25%', neutral: '+5%' };

    return (
        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
            {!loaded && <Skeleton variant="rectangular" sx={{ height: 50 }} />}
            <CardContent>
                <Typography component="p" variant="h4" gutterBottom>
                    Transfer
                </Typography>
                <Stack
                    direction="column"
                    sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}
                >
                    <Stack direction="row" sx={{ justifyContent: 'space-evenly', alignItems: 'center', gap: 1 }}>
                        <Typography component="p" variant="p" gutterBottom>
                            Amount
                        </Typography>
                        <TextField placeholder='0' id="amountid" disabled={busy}></TextField>
                    </Stack>
                    <Button variant="contained" onClick={handleTransfer} disabled={busy}>Transfer</Button>
                </Stack>
            </CardContent>
        </Card>
    );
}

AmountCard.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    interval: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default AmountCard;
