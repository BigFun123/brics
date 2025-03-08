import Dashboard from "../components/dashboard/Dashboard";
import { usePage } from "../lib/usePage";

export function Dash(props) {
    const { setAppState } = usePage();

    function handleHome () {  
        setAppState("main");
    }

    return (
        <Dashboard onHome={handleHome}></Dashboard>
    )
}