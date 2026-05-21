// 📌 src/pages/TaskShow.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function TaskShow() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    useEffect(() => {
    axios.get(`http://localhost:8000/api/tasks/${id}`)
        .then(res => setTask(res.data))
        .catch(() => alert("Failed to load task!"));
    }, [id]);

    const handleDelete = async () => {
    if (!window.confirm("本当に削除しますか？")) return;

    await axios.delete(`http://localhost:8000/api/tasks/${id}`);
    navigate("/tasks");
    };

    if (!task) return <p>Loading...</p>;

    return (
    <div>
        <h1>Task Detail</h1>

        <p><strong>Title:</strong> {task.title}</p>
        <p><strong>Due Date:</strong> {task.due_date}</p>
        <p><strong>Content:</strong> {task.content}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Category:</strong> {task.category}</p>
        <p><strong>Memo:</strong> {task.memo}</p>
        <p><strong>Created At:</strong> {new Date(task.created_at).toLocaleString("ja-JP")}</p>
        <p><strong>Updated At:</strong> {new Date(task.updated_at).toLocaleString("ja-JP")}</p>

        <hr />

        {/* 編集ボタン */}
        <Link to={`/tasks/${task.id}/edit`}>
        <button>Edit</button>
        </Link>

        {/* 削除ボタン */}
        <button onClick={handleDelete}>Delete</button>

        {/* 一覧に戻る */}
        <button onClick={() => navigate("/tasks")}>Back to List</button>
    </div>
    );
}
