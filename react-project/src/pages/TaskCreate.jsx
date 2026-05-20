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
    // 送信処理関数
    const handleSubmit = async (e) =>{
        e.preventDefault(); // ← フォームのデフォルト送信（リロード）を止める

        await axios.post("http://localhost:8000/api/tasks",{
            title: title,
            due_date: dueDate,
            content: content,
        });

        // 保存後に一覧ページへ戻る
        navigate("/tasks");
    };

    return(
        <div>
            <h1>Create New Task</h1>
            {/* タスク作成フォーム */}
            <form onSubmit={handleSubmit}>
                <div>
                    {/* タイトル */}
                    <label>TITLE:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* 期限日 */}
                    <label>DUE DATE:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* 内容 */}
                    <label>CONTENT:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rowx="4"
                    />
                </div>
                <button type="submit">Add New Task</button>
            </form>
        </div>
    );
}