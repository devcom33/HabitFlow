import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import HabitDetails from "./pages/habitDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/habit" element={<HabitDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
