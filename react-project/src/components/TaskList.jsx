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
      <h1>Hello React is working</h1>
      <p>task list</p>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
