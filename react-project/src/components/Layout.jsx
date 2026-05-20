// 一番の大枠
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
        {/* サイドメニュー */}
            <nav style={{ width: "200px", background: "#f0f0f0", padding: "20px" }}>
                <h2>MENU</h2>
                <ul>
                    <li><Link to="/tasks">My Tasks</Link></li>
                    <li><Link to="/tasks/new">Create New Task</Link></li>
                </ul>
            </nav>

        {/* メインコンテンツ */}
            <main style={{ flex: 1, padding: "20px" }}>
                <Outlet />
            </main>
        </div>
    );
}
