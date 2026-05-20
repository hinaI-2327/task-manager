// 部品の組み立てた完成系ファイル
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TaskList from "./pages/TaskList";
import TaskCreate from "./pages/TaskCreate";
import TaskEdit from "./pages/TaskEdit";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<TaskList />} />
          <Route path="tasks/new" element={<TaskCreate />} />
          <Route path="tasks/:id/edit" element={<TaskEdit />} />
      </Route>
  </Routes>
    </BrowserRouter>
  );
}

export default App;
