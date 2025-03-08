import { Button, ButtonGroup, Stack } from "@mui/material";

export function Categories(props) {
    return (
        <div>
            <Stack spacing={2} direction="row">
                <ButtonGroup>
                    <Button>All</Button>
                    <Button>Household</Button>
                    <Button>Books</Button>
                    <Button>Tutoring</Button>
                    <Button>Handyman</Button>
                    <Button>Washing</Button>
                    <Button>Food</Button>
                    <Button>Health</Button>
                    <Button>Transport</Button>
                </ButtonGroup>
            </Stack>
        </div>
    )
}