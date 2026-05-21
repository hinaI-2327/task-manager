// 一番の大枠
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";


export default function Layout() {
    const location = useLocation();
    const isHome = location.pathname === "/";

    const [open, setOpen] = useState(false);

    return (
        <div style={{ position: "relative", height: "100vh" }}>
{/* サイドメニュー */}
            {!isHome && (
            <i
                className="bi bi-menu-button-wide"
                onClick={() => setOpen(!open)}
                style={{
                position: "fixed",
                top: "20px",
                left: "20px",
                fontSize: "32px",
                cursor: "pointer",
                zIndex: 1000
                }}
            ></i>
            )}
            <nav
                style={{
                    position: "fixed",
                    top: 0,
                    left: open ? "0" : "-220px",
                    width: "200px",
                    height: "100%",
                    background: "#f0f0f0",
                    padding: "20px",
                    transition: "left 0.3s ease",
                    display: isHome ? "none" : "block"
                }}
            >
{/* 閉じるボタン */}
                <i
                    className="bi bi-x-square-fill"
                    onClick={() => setOpen(false)}
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        fontSize: "28px",
                        cursor: "pointer"
                    }}
                ></i>
                <h2>MENU</h2>
{/* 上部メニュー */}
                <div style={{marginBottom: "40px"}}>
                    <ul>
                        <li><Link to="/tasks" onClick={()=> setOpen(false)}>My Tasks</Link></li>
                        <li><Link to="/tasks/new" onClick={()=> setOpen(false)}>Create New Task</Link></li>
                    </ul>
                </div>
{/* 下部メニュー */}
                <div>
                    <ul>
                        <li><Link to="/" onClick={() => setOpen(false)}>Back to Home</Link></li>
                    </ul>
                </div>
            </nav>


        {/* メインコンテンツ */}
            <main style={{ flex: 1, padding: "20px" }}>
                <Outlet />
            </main>
        </div>
    );
}
