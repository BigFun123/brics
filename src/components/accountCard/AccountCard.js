import StatCardWithRating from "./StatCardWithRating";

export const AccountCard = ({ account }) => {
    return (
        <StatCardWithRating {...account} ></StatCardWithRating>
    );
};