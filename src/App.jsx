import { useState } from "react";
import { Outlet, NavLink } from "react-router";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="container">
                <h1>Root</h1>
                <Outlet />
            </div>
        </>
    );
}

export default App;
