import Header from "../component/Header";
import ToastContainer from "../component/ToastContainer";
import { Outlet } from "react-router";

export default function FrontLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <ToastContainer />
        </>
    );
}
