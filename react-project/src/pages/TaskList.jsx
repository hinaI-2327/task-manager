// タスク一覧ページ
// 📌 src/pages/TaskList.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TaskList() {
  const [viewMode, setViewMode] = useState(
    localStorage.getItem("viewMode") || "table"
  );
  const [tasks, setTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState(null); // null = 全部表示


  // ★ 付箋カードの基本スタイル
  const stickyStyle = {
    width: "220px",
    minHeight: "180px",
    padding: "15px",
    margin: "15px",
    borderRadius: "6px",
    boxShadow: "3px 3px 6px rgba(0,0,0,0.2)",
    transform: "rotate(-2deg)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundImage: `
    linear-gradient(#e0e0e0 1px, transparent 1px),
    linear-gradient(90deg, #e0e0e0 1px, transparent 1px)
  `,
    backgroundSize: "16px 16px",
    backgroundColor: "#fffdf5",
    transition: "transform 0.15s ease",
    cursor: "pointer",

  };

  // ★ カード一覧のグリッド
  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginRight: "180px",
  };

  // ★ 優先度ごとの付箋色
  const stickyColors = {
    high: "#ffb3b3",     // 赤系（薄め）
    medium: "#c8f7c5",   // 緑系
    low: "#c7dfff",      // 青系
  };

  // ★ 右上の凡例（縦3枚付箋）
  const priorityLegendWrapper = {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: 10,
  };

  const priorityLegendItem = (color) => ({
    backgroundColor: color,
    padding: "6px 12px",
    borderRadius: "6px",
    boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
    fontWeight: "bold",
    transform: "rotate(-2deg)",
    transition: "transform 0.15s ease",
    cursor: "pointer",

  });

  const displayedTasks = filterPriority
  ? tasks.filter(task => task.priority === filterPriority)
  : tasks;


  // 📌 初回読み込みで一覧取得(期限日順)
  useEffect(() => {
    axios.get("http://localhost:8000/api/tasks")
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
        setTasks(sorted);
      });
  }, []);

  return (
    <div style={{ maxWidth: "100vw", margin: "0 auto", textAlign: "center", position: "relative" }}>
      <h1>My Tasks</h1>

      {/* 表示切り替えボタン */}
      <div style={{ marginBottom: "20px" }}>
      <button
        onClick={() => {
          setViewMode("table");
          localStorage.setItem("viewMode", "table");
        }}
      >
        Table View
      </button>

      <button
        onClick={() => {
          setViewMode("card");
          localStorage.setItem("viewMode", "card");
        }}
        style={{ marginLeft: "10px" }}
      >
        Card View
      </button>
      </div>

      {/* 表形式 */}
      {viewMode === "table" && (
        <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          <table
            border="1"
            cellPadding="8"
            style={{ width: "80%", margin: "0 auto" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#e0e0e0" }}>
                <th>Title</th>
                <th>Due Date</th>
                <th>Content</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Updated At</th>
                <th>Detail</th>
              </tr>
            </thead>

            <tbody>
              {displayedTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.due_date}</td>
                  <td>
                    {task.content.length > 20
                      ? task.content.substring(0, 20) + "..."
                      : task.content}
                  </td>

                  <td
                    style={{
                      backgroundColor:
                        task.priority === "high"
                          ? "#d13c3c"
                          : task.priority === "medium"
                          ? "#6bb96b"
                          : "#436caa",
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    {task.priority.toUpperCase()}
                  </td>

                  <td>{task.status}</td>
                  <td>{new Date(task.updated_at).toLocaleString("ja-JP")}</td>

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
      )}

      {/* カード形式 */}
      {viewMode === "card" && (
        <>
          {/* 右上の縦3枚付箋凡例 */}
          <div style={priorityLegendWrapper}>
          <div style={{ fontSize: "12px", fontWeight: "bold", textAlign: "right"}}>
            PRIORITY
          </div>
          <div
            style={{
              ...priorityLegendItem("#ffb3b3"),
              transform: filterPriority === "high" ? "scale(1.15)" : "scale(1)",
              border: filterPriority === "high" ? "2px solid #333" : "none",
              paddingLeft: filterPriority === "high" ? "20px" : "12px",
              position: "relative",
            }}
            onClick={() => setFilterPriority("high")}

            // ★ ここがホバー処理
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1) rotate(-2deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                filterPriority === "high" ? "scale(1.15)" : "scale(1)";
            }}
          >
            {filterPriority === "high" && (
              <span style={{ position: "absolute", left: "-18px" }}>≫</span>
            )}
            HIGH
          </div>

            <div
              style={{
                ...priorityLegendItem("#c8f7c5"),
                transform: filterPriority === "medium" ? "scale(1.15)" : "scale(1)",
                border: filterPriority === "medium" ? "2px solid #333" : "none",
                paddingLeft: filterPriority === "medium" ? "20px" : "12px",
                position: "relative",
            }}
              onClick={()=> setFilterPriority("medium")}
              onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1) rotate(-2deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                filterPriority === "medium" ? "scale(1.15)" : "scale(1)";
            }}
            >
            {filterPriority === "medium" && (
              <span style={{ position: "absolute", left: "-18px" }}>≫</span>
            )}
            MEDIUM</div>

            <div
              style={{
                ...priorityLegendItem("#c7dfff"),
                transform: filterPriority === "low" ? "scale(1.15)" : "scale(1)",
                border: filterPriority === "low" ? "2px solid #333" : "none",
                paddingLeft: filterPriority === "low" ? "20px" : "12px",
                position: "relative",
              }}
              onClick={()=> setFilterPriority("low")}
              onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1) rotate(-2deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                filterPriority === "medium" ? "scale(1.15)" : "scale(1)";
            }}
            >
              {filterPriority === "low" && (
              <span style={{ position: "absolute", left: "-18px" }}>≫</span>
              )}
              LOW</div>
          </div>

{/* カード一覧 */}
{/* ★ タスクが0件のときのメッセージ */}
          {displayedTasks.length === 0 && (
            <>
            <div style={{ fontSize: "40px",marginTop: "200px", fontWeight: "bold", color: "#555" }}>
            No Tasks
            </div>
            <button
              onClick={() => setFilterPriority(null)}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Back to List
            </button>
          </>
          )}

          <div style={gridStyle}>
            {displayedTasks.map(task => (
              <div
                key={task.id}
                style={{
                  ...stickyStyle,
                  backgroundColor: stickyColors[task.priority],
                }}
                onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05) rotate(-2deg)";
                }}
                onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotate(-2deg)";
                }}
              >
                <h3 style={{ margin: 0 }}>{task.title}</h3>

                <p style={{ fontSize: "12px", margin: "5px 0", color: "#555" }}>
                  Due: {task.due_date}
                </p>

                <p style={{ fontSize: "14px" }}>
                  {task.content.length > 40
                    ? task.content.substring(0, 40) + "..."
                    : task.content}
                </p>

                <Link to={`/tasks/${task.id}`}>
                  <button style={{ marginTop: "10px", width: "100%" }}>
                    More Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
