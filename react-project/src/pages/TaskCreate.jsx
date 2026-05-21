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
            <form onSubmit={handleSubmit}>
{/* タイトル */}
                <div>
                    <label>TITLE:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
{/* 期限日 */}
                <div>
                    <label>DUE DATE:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
{/* 内容 */}
                <div>
                    <label>CONTENT:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rowx="4"
                    />
                </div>
{/* 優先度 */}
                <select value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="high">HIGH</option>
                    <option value="medium">MEDIUM</option>
                    <option value="low">LOW</option>
                </select>
{/* ステータス */}
                <select value={status}
                        onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="not_started">Not Started!</option>
                    <option value="in_progress">In Progress!!</option>
                    <option value="completed">Completed!!!</option>
                    <option value="on_hold">On Hold</option>
                </select>
{/* 分類 */}
                <select value={category}
                        onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="life">Life</option>
                    <option value="study">Study</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>

                </select>
{/* メモ */}
                <textarea value={memo}
                onChange={(e) =>setMemo(e.target.value)}
                />
{/* 追加ボタン */}
                <button type="submit">Add New Task</button>
            </form>
        </div>
    );
}