import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    // Remove tokens from localStorage
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // If you stored tokens in cookies, clear them also:
    document.cookie =
      "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    alert("Logged out successfully!");

    navigate("/login"); // Redirect to login page
  }

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left Section */}
      <div className="text-xl font-bold text-blue-600">
        TaskX
      </div>

      {/* Right Section */}
      <div className="flex gap-6 text-gray-700 font-medium items-center">
        <Link to="/tasks" className="hover:text-blue-600">Tasks</Link>
        <Link to="/profile" className="hover:text-blue-600">Profile</Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
