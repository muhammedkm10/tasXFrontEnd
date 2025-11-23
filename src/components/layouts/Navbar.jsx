import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left Section */}
      <div className="text-xl font-bold text-blue-600">
        TaskX
      </div>

      {/* Right Section */}
      <div className="flex gap-6 text-gray-700 font-medium">
        <Link to="/tasks" className="hover:text-blue-600">Tasks</Link>
        <Link to="/profile" className="hover:text-blue-600">Profile</Link>
      </div>
    </nav>
  );
}
