import axios from "axios";
import { useEffect, useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/tasks")
      .then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h1>タスク一覧</h1>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
