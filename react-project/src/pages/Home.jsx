import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    const [selected, setSelected] = useState("");

    return(
        <div style={styles.homeContainer}>
            {/* タイトルと説明 */}
            <h1>Welcome to the Task Manager!</h1>
            <h3>Choose an option!</h3>
            {/* オプション2つ */}
            <div style={styles.cardContainer}>
                {/* card 1 */}
                <div
                    style={{
                        ...styles.card,
                        ...(selected === "/tasks" ? styles.cardSelected : {}),
                        }}
                        onClick={() => setSelected("/tasks")}
                >
                    <label>
                        <input
                            type="radio"
                            name="dest"
                            value="/tasks"
                            checked={selected === "/tasks"}
                            onChange={(e) => setSelected(e.target.value)}                                    style={styles.radio}
                        />
                        <span>   Move to My Task List   </span>
                    </label>
                </div>
                {/* card 2 */}
                <div style={{
                        ...styles.card,
                        ...(selected === "/tasks/new" ? styles.cardSelected : {}),
                            }}
                            onClick={() => setSelected("/tasks/new")}
                >
                    <label>
                        <input
                            type="radio"
                            name="dest"
                            value="/tasks/new"
                            checked={selected === "/tasks/new"}
                            onChange={(e) => setSelected(e.target.value)}
                            style={styles.radio}
                        />
                        <span>   Create New Task   </span>
                    </label>
                </div>
            </div>
            {/* スタートボタン */}
            <div style={styles.buttonContainer}>
                <button
                    onClick={() =>{
                        if(!selected){
                            alert("Please choose an option!");
                            return;
                        }
                        navigate(selected);
                        }}
                    style={styles.startButton}
                    >
                    Let's Start!
                </button>
            </div>
        </div>
    );
}

    const styles = {
        homeContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "100vh",
        },
        cardContainer: {
            display:"flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "40px",
        },
        card:{
            width: "220px",
            padding: "20px",
            borderRadius: "10px",
            border: "2px solid #ccc",
            cursor: "pointer",
            transition: "0.2s",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "center",
        },
        cardSelected: {
            borderColor: "#007bff",
            backgroundColor: "#e7f1ff",
            transform: "scale(1.05)",
        },
        radio: {
            transform: "scale(1.3)",
        },
        buttonContainer:{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
        },
        startButton: {
            padding: "12px 30px",
            fontSize: "18px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
        },
    };

