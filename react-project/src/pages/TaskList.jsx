// タスク一覧ページ
// 📌 src/pages/TaskList.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TaskList() {

  const[sortKey, setSortKey] = useState("due_date");
  const [sortOrder, setSortOrder] = useState("asc");

  const [viewMode, setViewMode] = useState(
    localStorage.getItem("viewMode") || "table"
  );
  const [tasks, setTasks] = useState([]);
  const [filterDue, setFilterDue] = useState([]);
  const [filterPriorities, setFilterPriorities] = useState([]);
  const [filterStatuses, setFilterStatuses] = useState([]);


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

  let displayedTasks = tasks;

  // ① 期限日フィルター
  if (filterDue.length > 0) {
    const now = new Date();

    displayedTasks = displayedTasks.filter((task) => {
      const due = new Date(task.due_date);

      return filterDue.some((cond) => {
        switch (cond) {
          case "today":
            return due.toDateString() === now.toDateString();
          case "3days":
            return due - now <= 3 * 24 * 60 * 60 * 1000 && due >= now;
          case "week":
            return due - now <= 7 * 24 * 60 * 60 * 1000 && due >= now;
          case "overdue":
            return due < now;
          default:
            return true;
        }
      });
    });
  }
// ② 優先度フィルター
  if (filterPriorities.length > 0) {
    displayedTasks = displayedTasks.filter((task) =>
      filterPriorities.includes(task.priority)
    );
  }

// ③ ステータスフィルター
  if (filterStatuses.length > 0) {
    displayedTasks = displayedTasks.filter((task) =>
      filterStatuses.includes(task.status)
    );
  }

// ④ ソート処理
  displayedTasks = [...displayedTasks].sort((a, b) => {
    switch (sortKey) {
      case "due_date":
        return new Date(a.due_date) - new Date(b.due_date);
      case "created_at":
        return new Date(a.created_at) - new Date(b.created_at);
      case "updated_at":
        return new Date(a.updated_at) - new Date(b.updated_at);
      case "priority":
        const order = { high: 1, medium: 2, low: 3 };
        return order[a.priority] - order[b.priority];
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // 📌 初回読み込みで一覧取得(期限日順)
  useEffect(() => {
    axios.get("http://localhost:8000/api/tasks")
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
        setTasks(sorted);
      });
  }, []);

  return (
    <div>
{/* ヘッダー */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      marginTop: "10px",
      position: "sticky",
      top: 0,
      background: "white",
      zIndex: 20,
      paddingBottom: "10px",
    }}
    >
      <h1>My Tasks</h1>

{/* 表示切り替えボタン */}
        <button
          onClick={() => {
            const next = viewMode === "table" ? "card" : "table";
            setViewMode(next);
            localStorage.setItem("viewMode", next);
          }}
          style={{
            padding: "8px 16px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="bi bi-arrow-repeat"></i>
          {viewMode === "table" ? "Switch to Card view" : "Switch to Table View"}
        </button>
      </div>
{/* 並び替え */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        marginTop: "10px",
        position: "sticky",
        top: 0,
        background: "white",
        zIndex: 20,
        paddingBottom: "10px"
      }}>
        <div>
          Sort by:
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            style={{ marginLeft: "8px" }}
          >
            <option value="due_date">Due Date</option>
            <option value="created_at">Created At</option>
            <option value="updated_at">Updated At</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
          </div>
{/* 昇降ボタン */}
          <button
            onClick={()=> setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            style={{
              marginLeft: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              cursor: "pointer",
              padding: "4px 8px",
              width: "90px",
              height: "32px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              border: "1px solid #ccc",
              borderRadius: "6px",
              background:"white"
            }}
          >
            <i
              className= {sortOrder === "asc"? "bi bi-arrow-up" : "bi bi-arrow-down"}
              style={{fontSize: "16px"}}
            ></i>
            <span style={{fontSize: "14px"}}>
              {sortOrder === "asc" ? "UP" : "DOWN"}
            </span>
          </button>
        </div>
{/* 期限日フィルター */}
        <div style={{ marginBottom: "10px" }}>
          Due Date
          {[
            { key: "today", label: "Today" },
            { key: "3days", label: "Within 3 days" },
            { key: "week", label: "Within a week" },
            { key: "overdue", label: "Overdue" },
          ].map((d) => (
            <label key={d.key} style={{ marginRight: "12px" }}>
              <input
                type="checkbox"
                checked={filterDue.includes(d.key)}
                onChange={() => {
                  setFilterDue(
                    filterDue.includes(d.key)
                      ? filterDue.filter((x) => x !== d.key)
                      : [...filterDue, d.key]
                  );
                }}
              />
              {d.label}
            </label>
          ))}
        </div>
{/* 優先度フィルター */}
        <div style={{ marginBottom: "10px" }}>
          Priority
          {[
            { key: "high", label: "HIGH" },
            { key: "medium", label: "MED" },
            { key: "low", label: "LOW" },
          ].map((p) => (
            <label key={p.key} style={{ marginRight: "12px" }}>
              <input
                type="checkbox"
                checked={filterPriorities.includes(p.key)}
                onChange={() => {
                  setFilterPriorities(
                    filterPriorities.includes(p.key)
                      ? filterPriorities.filter((x) => x !== p.key)
                      : [...filterPriorities, p.key]
                  );
                }}
              />
              {p.label}
            </label>
          ))}
        </div>

        {/* ③ ステータスフィルター */}
        <div style={{ marginBottom: "10px" }}>
          Status
          {[
            { key: "not_started", label: "Not Started" },
            { key: "in_progress", label: "In Progress" },
            { key: "completed", label: "Completed" },
            { key: "on_hold", label: "On Hold" },
          ].map((s) => (
            <label key={s.key} style={{ marginRight: "12px" }}>
              <input
                type="checkbox"
                checked={filterStatuses.includes(s.key)}
                onChange={() => {
                  setFilterStatuses(
                    filterStatuses.includes(s.key)
                      ? filterStatuses.filter((x) => x !== s.key)
                      : [...filterStatuses, s.key]
                  );
                }}
              />
              {s.label}
            </label>
          ))}
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
              transform: filterPriorities === "high" ? "scale(1.15)" : "scale(1)",
              border: filterPriorities === "high" ? "2px solid #333" : "none",
              paddingLeft: filterPriorities === "high" ? "20px" : "12px",
              position: "relative",
            }}
            onClick={() => setfilterPriorities("high")}

            // ★ ここがホバー処理
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1) rotate(-2deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                filterPriorities === "high" ? "scale(1.15)" : "scale(1)";
            }}
          >
            {filterPriorities === "high" && (
              <span style={{ position: "absolute", left: "-18px" }}>≫</span>
            )}
            HIGH
          </div>

            <div
              style={{
                ...priorityLegendItem("#c8f7c5"),
                transform: filterPriorities === "medium" ? "scale(1.15)" : "scale(1)",
                border: filterPriorities === "medium" ? "2px solid #333" : "none",
                paddingLeft: filterPriorities === "medium" ? "20px" : "12px",
                position: "relative",
            }}
              onClick={()=> setfilterPriorities("medium")}
              onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1) rotate(-2deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                filterPriorities === "medium" ? "scale(1.15)" : "scale(1)";
            }}
            >
            {filterPriorities === "medium" && (
              <span style={{ position: "absolute", left: "-18px" }}>≫</span>
            )}
            MEDIUM</div>

            <div
              style={{
                ...priorityLegendItem("#c7dfff"),
                transform: filterPriorities === "low" ? "scale(1.15)" : "scale(1)",
                border: filterPriorities === "low" ? "2px solid #333" : "none",
                paddingLeft: filterPriorities === "low" ? "20px" : "12px",
                position: "relative",
              }}
              onClick={()=> setfilterPriorities("low")}
              onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1) rotate(-2deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                filterPriorities === "medium" ? "scale(1.15)" : "scale(1)";
            }}
            >
              {filterPriorities === "low" && (
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
              onClick={() => setfilterPriorities(null)}
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
