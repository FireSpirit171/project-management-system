import { Routes, Route } from "react-router-dom";
import BoardsPage from "../pages/BoardsPage/BoardsPage";
import BoardPage from "../pages/BoardPage/BoardPage";

const AppRouter = () => (
  <Routes>
    <Route path="/boards" element={<BoardsPage />} />
    <Route path="/boards/:id" element={<BoardPage />} />
  </Routes>
);

export default AppRouter;
