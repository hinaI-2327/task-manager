import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    const [selected, setSelected] = useState("");
    return(
        <div>
            <h1>Welcome to the Task Manager!</h1>
            <p>Choose an option!</p>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="dest"
                            value="/tasks"
                            onChange={(e) => setSelected(e.target.value)}
                        />
                        Move to My Task List
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="dest"
                            value="/tasks/new"
                            onChange={(e) => setSelected(e.target.value)}
                        />
                        Create New Task
                    </label>
                </div>
                <button
                    onClick={() =>{
                        if(!selected){
                            alert("Please choose an option!");
                            return;
                        }
                        navigate(selected);
                    }}
                    style={{marginTop: "20px", padding: "10px 20px"}}
                >
                Let's Start!
                </button>
        </div>
    )
}
