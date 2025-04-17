import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
