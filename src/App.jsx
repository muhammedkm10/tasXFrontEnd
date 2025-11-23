import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/LoginPage.jsx";
import Register from "./components/pages/Register.jsx";
import Tasks from "./components/pages/TasksPage.jsx";
import { RequireAuth, RequireNoAuth } from "./components/ProtectedRoutes.jsx";
import Navbar from "./components/layouts/Navbar.jsx";
import Profile from "./components/pages/Profile.jsx";
import TaskList from "./components/task components/TaskList.jsx";




export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar always visible except login / register */}
      <Routes>
        <Route
          path="/login"
          element={
            <RequireNoAuth>
              <Login />
            </RequireNoAuth>
          }
        />
        <Route
          path="/register"
          element={
            <RequireNoAuth>
              <Register />
            </RequireNoAuth>
          }
        />

        {/* Protected layout (Navbar + pages) */}
        <Route
          path="/*"
          element={
            <RequireAuth>
              <div>
                <Navbar />
                <div className="p-6">
                  <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="tasks" element={<TaskList />} />
                    <Route path="profile" element={<Profile />} />
                  </Routes>
                </div>
              </div>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
