import { Outlet } from "react-router";

function App() {

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
