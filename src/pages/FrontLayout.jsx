import Header from "../component/Header";
import { Footer } from "../component/Footer";
import ToastContainer from "../component/ToastContainer";
import { Outlet } from "react-router";

export default function FrontLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <ToastContainer />
            <Footer />  
        </>
    );
}
