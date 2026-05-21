import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function TaskEdit() {

// 保存ボックス作成
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("medium");
    const [status, setStatus] = useState("not_started");
    const [category, setCategory] = useState("");
    const [memo, setMemo] = useState("");

// 初期値リセット
    useEffect(() =>{
        axios.get(`http://localhost:8000/api/tasks/${id}`)
            .then(res =>{
            setTitle(res.data.title);
            setContent(res.data.content);
            setDueDate(res.data.due_date);
            setPriority(res.data.priority);
            setStatus(res.data.status);
            setCategory(res.data.category);
            setMemo(res.data.memo);
            })
            .catch(() => alert("Failed to load task!"));
    }, [id]);

// DBに保存
    const handleUpdate = async() => {
        await axios.put(`http://localhost:8000/api/tasks/${id}`,{
            title,
            content,
            due_date: dueDate,
            priority,
            status,
            category,
            memo,
        });

        alert("Updated!!!");
        navigate("/tasks");
    }

    return (
            <div>
                <h1>Edit Task（ID: {id}）</h1>
{/* タイトル */}
                <div>
                    <label>Title:</label><br />
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
{/* 期限日 */}
                <div>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
{/* 内容 */}
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
{/* 優先度 */}
                <div>
                    <label>Priority:</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="high">HIGH</option>
                        <option value="medium">NORMAL</option>
                        <option value="low">LOW</option>
                    </select>
                </div>
{/* ステータス */}
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="not_started">Not Started!</option>
                        <option value="in_progress">In Progress!!</option>
                        <option value="completed">Completed!!!</option>
                        <option value="on_hold">On Hold</option>
                    </select>
                </div>
{/* 分類 */}
                <div>
                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="life">Life</option>
                        <option value="study">Study</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                    </select>
                </div>
{/* メモ */}
                <div>
                    <label>Memo:</label>
                    <textarea
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                    />
                </div>
{/* 更新ボタン */}
                <button onClick={handleUpdate}>Update!</button>
            </div>
    );
}
