import { Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
  const token = localStorage.getItem("access");
  if (!token) return <Navigate to="/login" />;
  return children;
}

export function RequireNoAuth({ children }) {
  const token = localStorage.getItem("access");
  if (token) return <Navigate to="/home" />;
  return children;
}
