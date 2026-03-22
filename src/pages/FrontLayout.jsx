import Header from "../component/Header";
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
