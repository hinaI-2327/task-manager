// 部品の組み立てた完成系ファイル
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TaskList from "./pages/TaskList";
import TaskCreate from "./pages/TaskCreate";
import TaskEdit from "./pages/TaskEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 大枠 */}
        <Route path="/" element={<Layout />}>
          {/* 一覧ページ */}
          <Route path="tasks" element={<TaskList />} />

          {/* 新規作成ページ */}
          <Route path="tasks/new" element={<TaskCreate />} />

          {/* 編集ページ */}
          <Route path="tasks/:id/edit" element={<TaskEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
