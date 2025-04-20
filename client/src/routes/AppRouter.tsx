import { Routes, Route, Navigate } from "react-router-dom";
import BoardsPage from "../pages/BoardsPage/BoardsPage";
import BoardPage from "../pages/BoardPage/BoardPage";
import IssuesPage from "../pages/IssuesPage/IssuesPage";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/boards" replace />} />
    <Route path="/boards" element={<BoardsPage />} />
    <Route path="/boards/:id" element={<BoardPage />} />
    <Route path="/issues" element={<IssuesPage />} />
  </Routes>
);

export default AppRouter;
