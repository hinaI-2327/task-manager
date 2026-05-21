// タスク一覧ページ
// 📌 src/pages/TaskList.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  // 📌 削除処理
  const handleDelete = async (id) => {
    if (!window.confirm("本当に削除しますか？")) return;

    await axios.delete(`http://localhost:8000/api/tasks/${id}`);

    // 削除後に state を更新
    setTasks(tasks.filter(task => task.id !== id));
  };

  // 📌 初回読み込みで一覧取得
  useEffect(() => {
    axios.get("http://localhost:8000/api/tasks")
      .then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h1>My Tasks</h1>
{/* テーブルヘッド */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th>
              <th>Due Date</th>
              <th>Content</th>
              <th>Updated At</th>
              <th>Detail</th>
          </tr>
        </thead>
{/* テーブル中身 */}
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.due_date}</td>
              <td>{task.content}</td>
              <td>{new Date(task.updated_at).toLocaleString("ja-JP")}</td>
{/* 詳細ボタン */}
              <td>
                <Link to={`/tasks/${task.id}`}>
                  <button>More Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
