import { useState } from "react";
import Header from "../component/Header";
import { Outlet, NavLink } from "react-router";

export default function BackLayout() {
    // useState;

    const logout = (e) => {
        console.log(e.target);
    };

    return (
        <>
            {/* <h1>BackLayout</h1> */}
            {/* <li>
                <NavLink to="dashboard">Dash</NavLink>
            </li>
            |
            <li>
                <NavLink to="order">Order</NavLink>
            </li>
            |
            <li>
                <NavLink onClick={logout}>登入/登出後台</NavLink>
            </li>
            <hr /> */}
            <Header></Header>
            <Outlet></Outlet>
        </>
    );
}
