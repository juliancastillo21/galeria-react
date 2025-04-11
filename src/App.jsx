import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import AddImagePage from "./components/AddImagePage";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/add-image" element={<AddImagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
