import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Modal />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
