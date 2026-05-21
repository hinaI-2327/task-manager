// 新規作成ページ
import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TaskCreate(){

// 状態（state）を保存する箱を各項目で設定
    const[title, setTitle] = useState("");
    const[dueDate, setDueDate] = useState("");
    const[content, setContent] = useState("");
    const navigate = useNavigate();
    const [priority, setPriority] = useState("medium");
    const [status, setStatus] = useState("not_started");
    const [category, setCategory] = useState("other");
    const [memo, setMemo] = useState("");

// 送信処理関数
    const handleSubmit = async (e) =>{
        e.preventDefault(); // ← フォームのデフォルト送信（リロード）を止める

        await axios.post("http://localhost:8000/api/tasks",{
            title,
            due_date: dueDate,
            content,
            priority,
            status,
            category,
            memo,
        });

// 保存後に一覧ページへ戻る
        navigate("/tasks");
    };

    return(
        <div>
            <h1>Create New Task</h1>
{/* タスク作成フォーム */}
            <form onSubmit={handleSubmit} style={{maxWidth: "600px", margin: "0 auto"}}>
{/* タイトル */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <label style={{ width: "120px", fontWeight: "bold" }}>TITLE:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ flex: 1, padding: "8px" }}
                    />
                </div>
{/* 期限日 */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <label style={{ width: "120px", fontWeight: "bold" }}>DUE DATE:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        style={{ flex: 1, padding: "8px" }}
                    />
                </div>
{/* 内容 */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <label style={{ width: "120px", fontWeight: "bold" }}>CONTENT:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="3"
                        style={{ flex: 1, padding: "8px" }}
                    />
                </div>
{/* 優先度 */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <label style={{ width: "120px", fontWeight: "bold" }}>PRIORITY:</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        style={{ flex: 1, padding: "8px" }}
                    >
                        <option value="high">HIGH</option>
                        <option value="medium">MEDIUM</option>
                        <option value="low">LOW</option>
                    </select>
                </div>
{/* ステータス */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <label style={{ width: "120px", fontWeight: "bold" }}>STATUS:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ flex: 1, padding: "8px" }}
                    >
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on_hold">On Hold</option>
                    </select>
                </div>
{/* 分類 */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <label style={{ width: "120px", fontWeight: "bold" }}>CATEGORY:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ flex: 1, padding: "8px" }}
                    >
                        <option value="life">Life</option>
                        <option value="study">Study</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                    </select>
                </div>
{/* メモ */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <label style={{ width: "120px", fontWeight: "bold" }}>MEMO:</label>
                    <textarea
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        rows="3"
                        style={{ flex: 1, padding: "8px" }}
                    />
                </div>
{/* 追加ボタン */}
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    Add New Task
                </button>
            </form>
        </div>
    );
}