import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Layout/Header/Header";
import About from "./pages/About";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-me" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
