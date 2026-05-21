import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/tasks/${id}`)
            .then(res =>{
            setTitle(res.data.title);
            setContent(res.data.content);
            setDueDate(res.data.due_date);
            })
            .catch(() => alert("Failed to load task!"));
    }, [id]);

    const handleUpdate = async() => {
        await axios.put(`http://localhost:8000/api/tasks/${id}`,{
            title,
            content,
            due_date: dueDate,
        });

        alert("Updated!!!");
        navigate("/tasks");
    }

    return (
            <div>
                <h1>Edit Task（ID: {id}）</h1>
                <div>
                    <label>Title:</label><br />
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button onClick={handleUpdate}>Update!</button>
            </div>
    );
}
