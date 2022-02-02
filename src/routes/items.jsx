import { Outlet } from "react-router-dom";

export default function Items() {
    return (
        <main>
            <h2>Items</h2>
            <Outlet />
        </main>
    );
}