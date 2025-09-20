import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard";
import HabitDetails from "./pages/habitDetails";
import Login from "./pages/Login";
import { AuthProvider } from "./store/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/habit"
            element={
              <ProtectedRoute>
                <HabitDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
