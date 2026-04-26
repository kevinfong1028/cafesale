import Header from "../component/Header";
import { Outlet } from "react-router";

export default function BackLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
