import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskEdit() {
const { id } = useParams();
const navigate = useNavigate();

const [title, setTitle] = useState("");
const [dueDate, setDueDate] = useState("");
const [content, setContent] = useState("");
const [priority, setPriority] = useState("medium");
const [status, setStatus] = useState("not_started");
const [category, setCategory] = useState("other");
const [memo, setMemo] = useState("");

// 📌 初期データ取得
useEffect(() => {
    axios.get(`http://localhost:8000/api/tasks/${id}`).then((res) => {
    const t = res.data;
    setTitle(t.title);
    setDueDate(t.due_date);
    setContent(t.content);
    setPriority(t.priority);
    setStatus(t.status);
    setCategory(t.category);
    setMemo(t.memo ?? "");
    });
}, [id]);

// 📌 更新処理
const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:8000/api/tasks/${id}`, {
    title,
    due_date: dueDate,
    content,
    priority,
    status,
    category,
    memo,
    });

    navigate(`/tasks/${id}`);
};

return (
    <div>
    <h1>Edit Task</h1>
    <p><i class="bi bi-exclamation-diamond-fill"></i> = required</p>

    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>

        {/* タイトル */}
        <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "120px", fontWeight: "bold" }}>
            <i class="bi bi-exclamation-diamond-fill"></i> TITLE
            </label>
            <input
            type="text"
            value={title}
            onChange={(e) => {
                if (e.target.value.length <= 20) setTitle(e.target.value);
            }}
            required
            style={{ flex: 1, padding: "8px" }}
            />
        </div>
        <div style={{ marginLeft: "120px", fontSize: "12px", color: "#555" }}>
            ※20文字以内・改行不可・必須
        </div>
        </div>

        {/* 期限日 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <label style={{ width: "120px", fontWeight: "bold" }}>
            <i class="bi bi-exclamation-diamond-fill"></i> DUE DATE
        </label>
        <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            style={{ flex: 1, padding: "8px" }}
        />
        </div>

        {/* 内容 */}
        <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "120px", fontWeight: "bold" }}>
            <i class="bi bi-exclamation-diamond-fill"></i> CONTENT
            </label>
            <textarea
            value={content}
            onChange={(e) => {
                if (e.target.value.length <= 200) setContent(e.target.value);
            }}
            rows="4"
            required
            style={{ flex: 1, padding: "8px" }}
            />
        </div>
        <div style={{ marginLeft: "120px", fontSize: "12px", color: "#555" }}>
            ※200文字以内・複数行入力可・必須
        </div>
        </div>

        {/* 優先度 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <label style={{ width: "120px", fontWeight: "bold" }}>
            <i class="bi bi-exclamation-diamond-fill"></i> PRIORITY
        </label>
        <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            style={{
            flex: 1,
            padding: "8px",
            backgroundColor:
                priority === "high"
                ? "#d13c3c"
                : priority === "medium"
                ? "#6bb96b"
                : "#436caa",
            }}
        >
            <option value="high">HIGH</option>
            <option value="medium">MEDIUM</option>
            <option value="low">LOW</option>
        </select>
        </div>

        {/* ステータス */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <label style={{ width: "120px", fontWeight: "bold" }}>STATUS</label>
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

        {/* カテゴリ */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <label style={{ width: "120px", fontWeight: "bold" }}>CATEGORY</label>
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
        <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "120px", fontWeight: "bold" }}>MEMO</label>
            <textarea
            value={memo}
            onChange={(e) => {
                if (e.target.value.length <= 200) setMemo(e.target.value);
            }}
            rows="3"
            style={{ flex: 1, padding: "8px" }}
            />
        </div>
        <div style={{ marginLeft: "120px", fontSize: "12px", color: "#555" }}>
            ※200文字以内（任意）
        </div>
        </div>

        {/* 更新ボタン */}
        <button
        type="submit"
        style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
        }}
        >
        Update Task
        </button>
    </form>
    </div>
);
}
