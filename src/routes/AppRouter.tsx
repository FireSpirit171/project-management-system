import { Routes, Route } from "react-router-dom";
import BoardsPage from "../pages/BoardsPage/BoardsPage";

const AppRouter = () => (
  <Routes>
    <Route path="/boards" element={<BoardsPage />} />
  </Routes>
);

export default AppRouter;
