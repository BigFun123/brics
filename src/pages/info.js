import { Box, Card, CardContent, CssBaseline, Stack, Typography } from "@mui/material";
import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import AppTheme from "../components/shared-theme/AppTheme";


const benefits = [
    "You Earn Based on Your Abilities - The better you are at something, the more you can earn.",
    "Motivates Learning & Growth - Since your skills determine your value, there's a strong reason to keep improving.",
    "Open to Everyone - No need for big investments or a special background. If you have a talent, you can participate.",
    "A Marketplace of Skills - People can trade skills directly, like a web designer exchanging work for guitar lessons.",
    "Freedom from Middlemen - Artists, freelancers, and creators can monetize talents without big platforms taking a cut.",
    "Fair & Decentralized - No single company or government controls it, making it a fair system where value comes from talent.",
    "More Meaningful Economy - Instead of money being tied to markets, it’s tied to human abilities, making it more rewarding.",
    "Useful in Many Fields - From education to business, this system lets people exchange knowledge and skills effectively.",
    "Encourages Collaboration - People can connect with others who have different skills and help each other grow."
];

export function Info(props) {
    return (
        <AppTheme {...props} >
            <CssBaseline enableColorScheme />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    A new way to exchange value based on what you can do, not what you have.
                </Typography>
            </Box>
            <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                    <Card key={index}>
                        <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                            <CheckIcon className="text-green-500" />
                            <CardContent>{benefit}</CardContent>
                        </Stack>
                    </Card>
                ))}
            </div>
        </AppTheme>
    );
}
