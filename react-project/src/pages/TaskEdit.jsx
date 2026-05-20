import { useParams } from "react-router-dom";

export default function TaskEdit() {
  const { id } = useParams();
  return <h1>タスク編集ページ（ID: {id}）</h1>;
}
