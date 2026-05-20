import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";   // ← ここが重要（components）
import Home from "./pages/Home";
import TaskList from "./pages/TaskList";
import TaskCreate from "./pages/TaskCreate";
import TaskEdit from "./pages/TaskEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* ホーム画面 */}
          <Route index element={<Home />} />

          {/* タスク一覧 */}
          <Route path="tasks" element={<TaskList />} />

          {/* 新規作成 */}
          <Route path="tasks/new" element={<TaskCreate />} />

          {/* 編集 */}
          <Route path="tasks/:id/edit" element={<TaskEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
