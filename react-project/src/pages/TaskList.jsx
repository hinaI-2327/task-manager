// タスク一覧ページ
// 📌 src/pages/TaskList.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TaskList() {

  const [showFilter, setShowFilter] = useState(false);

  const[sortKey, setSortKey] = useState("due_date");
  const [sortOrder, setSortOrder] = useState("asc");

  const [viewMode, setViewMode] = useState(
    localStorage.getItem("viewMode") || "table"
  );
  const [tasks, setTasks] = useState([]);
  const [filterDue, setFilterDue] = useState([]);
  const [filterPriorities, setFilterPriorities] = useState(null);
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

  const isNone=
    filterPriorities !== "high" &&
    filterPriorities !== "medium" &&
    filterPriorities !== "low";

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
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    background: "white",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  };

  const priorityLegendItem = (color) => ({
    backgroundColor: color,
    padding: "6px 12px",
    borderRadius: "6px",
    boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
    fontWeight: "bold",
    userSelect: "none",
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
  if (filterPriorities !== null) {
    displayedTasks = displayedTasks.filter(
      (task) => task.priority === filterPriorities
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
    let result = 0;

    switch (sortKey) {
      case "due_date":
        result = new Date(a.due_date) - new Date(b.due_date);
        break;

      case "created_at":
        result = new Date(a.created_at) - new Date(b.created_at);
        break;

      case "updated_at":
        result = new Date(a.updated_at) - new Date(b.updated_at);
        break;

      case "priority":
        const order = { high: 1, medium: 2, low: 3 };
        result = order[a.priority] - order[b.priority];
        break;

      case "title":
        result = a.title.localeCompare(b.title);
        break;

      default:
        result = 0;
    }

    return result * (sortOrder === "asc" ? 1: -1);

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
        <h1 style={{ marginBottom: "12px"}}>My Tasks</h1>

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
        <div
          onClick={() => setShowFilter(!showFilter)}
          style={{
            cursor: "pointer",
            padding: "10px 12px",
            background: "#f5f5f5",
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginBottom: "8px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span>Sort & Filter</span>
          <span>{showFilter
          ? <i className="bi bi-caret-up-square-fill"></i>:
          <i className="bi bi-caret-down-square-fill"></i>
          }</span>
        </div>

{showFilter && (
  <div
    style={{
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      marginBottom: "16px",
      background: "white"
    }}
  >
    {/* ソート */}
    <div
      style={{
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        justifyContent: "center",
        }}>
      <strong>Sort By</strong><br />
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
        style={{
          marginRight: "12px",
          padding: "4px 8px",
          border: "1px solid #ccc",
          borderRadius: "6px"
        }}
      >
        <option value="due_date">Due Date</option>
        <option value="created_at">Created At</option>
        <option value="updated_at">Updated At</option>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          padding: "4px 8px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          background: "white",
          width: "100px",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <i
          className={sortOrder === "asc" ? "bi bi-arrow-up" : "bi bi-arrow-down"}
        ></i>
        {sortOrder === "asc" ? "UP" : "DOWN"}
      </button>
    </div>

    {/* フィルター（期限） */}
    <div style={{ marginBottom: "10px" }}>
      <strong>Due Date</strong><br />
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

{/* フィルター（優先度） */}
    <div style={{ marginBottom: "10px" }}>
      <strong>Priority</strong><br />
      {[
        { key: "high", label: "HIGH" },
        { key: "medium", label: "MED" },
        { key: "low", label: "LOW" },
      ].map((p) => (
        <label key={p.key} style={{ marginRight: "12px" }}>
          <input
            type="radio"
            name="priority"
            checked={filterPriorities === p.key}
            onChange={() => setFilterPriorities(p.key)}
          />
          {p.label}
        </label>
      ))}
    </div>
    {/* フィルター（ステータス） */}
    <div style={{ marginBottom: "10px" }}>
      <strong>Status</strong><br />
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
{/* リセットボタン */}
    <div style={{ textAlign: "center", marginTop: "16px"}}>
      <button
        onClick={() => {
        setFilterDue([]);
        setFilterPriorities([]);
        setFilterStatuses([]);
        setSortKey("due_date");
        setSortOrder("asc");
    }}
      style={{
        padding: "6px 12px",
        background: "#cf5d55",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }}
      >
        <i className="bi bi-trash3-fill"></i> <span>Reset Filters</span>
      </button>
    </div>
  </div>
)}

{/* 表形式 */}
        {viewMode === "table" && (
          <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {displayedTasks.length === 0 ? (
              <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
              No Tasks Found
              </div>
            ) : (
            <table
              className="task-table"
              cellPadding="8"
              style={{
                width: "100%",
                margin: "0 auto",
                tableLayout: "fixed",
                borderCollapse: "collapse",
                border: "1px solid black"
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  background: "white",
                  zIndex: 2
                }}
              >
                <tr style={{ backgroundColor: "#e0e0e0" }}>
                  <th style={{ width: "150px" }}>Title</th>
                  <th style={{ width: "120px" }}>Due Date</th>
                  <th style={{ width: "200px" }}>Content</th>
                  <th style={{ width: "100px" }}>Priority</th>
                  <th style={{ width: "120px" }}>Status</th>
                  <th style={{ width: "150px" }}>Updated At</th>
                  <th style={{ width: "120px", border: "1px solid black" }}>Detail</th>
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

                    <td style={{width: "120px", border: "1px solid black", textAlign: "center"}}>
                      <Link to={`/tasks/${task.id}`}>
                        <button
                          style={{
                            width: "90px",
                            whiteSpace: "nowrap",
                            padding: "4px 6px"
                          }}>See More</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        )}

        {/* カード形式 */}
        {viewMode === "card" && (
          <>
        <div style={priorityLegendWrapper}>
          <div style={{ fontSize: "12px", fontWeight: "bold", textAlign: "center" }}>
            PRIORITY
          </div>
          <div
    style={{
      ...priorityLegendItem("#ffb3b3"),
      opacity: isNone || filterPriorities === "high" ? 1 : 0.3,
      textDecoration: isNone || filterPriorities === "high" ? "none" : "line-through",
    }}
  >
    HIGH
  </div>

  {/* MEDIUM */}
  <div
    style={{
      ...priorityLegendItem("#c8f7c5"),
      opacity: isNone || filterPriorities === "medium" ? 1 : 0.3,
      textDecoration: isNone || filterPriorities === "medium" ? "none" : "line-through",
    }}
  >
    MEDIUM
  </div>

  {/* LOW */}
  <div
    style={{
      ...priorityLegendItem("#c7dfff"),
      opacity: isNone || filterPriorities === "low" ? 1 : 0.3,
      textDecoration: isNone || filterPriorities === "low" ? "none" : "line-through",
    }}
  >
    LOW
  </div>
        </div>
  {/* カード一覧 */}
  {/* ★ タスクが0件のときのメッセージ */}
            {displayedTasks.length === 0 && (
              <>
              <div style={{ fontSize: "40px",marginTop: "200px", fontWeight: "bold", color: "#555" }}>
              No Tasks Found
              </div>
              <button
                onClick={() => setFilterPriorities(null)}
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
