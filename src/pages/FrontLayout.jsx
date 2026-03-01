import Header from "../component/header";
import { Outlet, NavLink } from "react-router";

export default function FrontLayout() {
    // useState;
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
        </>
    );
}
