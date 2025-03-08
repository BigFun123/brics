import { Card, CardContent, Grid, Grid2, Rating, Stack, Typography } from "@mui/material";
import StatCard from "../dashboard/components/StatCard";
import StatCardWithRating from "./StatCardWithRating";


export const AccountCard = ({ account }) => {
    return (
        <StatCardWithRating {...account} ></StatCardWithRating>
    );
};