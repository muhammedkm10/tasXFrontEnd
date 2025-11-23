import React, { useEffect, useState } from "react";
import { fetchProfile } from "../api/api_functions";
import TaskDetailModal from "../task components/TaskDetailModal";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
const [showTaskDetail, setShowTaskDetail] = useState(false);


  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchProfile();
        if (res.success) {
          setProfile(res.data);
        } else {
          setError(res.message || "Failed to fetch profile");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      }
      setLoading(false);
    };

    loadProfile();
  }, []);

  if (loading) return <p className="text-center py-6">Loading profile...</p>;
  if (error) return <p className="text-center py-6 text-red-500">{error}</p>;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // Get first letter for avatar
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
          {getInitial(profile.username)}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold">{profile.full_name}</h2>
          <p className="text-gray-600">@{profile.username}</p>
          <p className="text-gray-600">{profile.email}</p>
          {profile.phone && <p className="text-gray-600">Phone: {profile.phone}</p>}
          <p className="text-gray-500 text-sm mt-1">
            Joined: {formatDate(profile.date_joined)}
          </p>
        </div>
      </div>

      {/* Account Info */}
      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold text-lg mb-2">Account Info</h3>
        <ul className="space-y-1 text-gray-700">
          <li>Username: {profile.username}</li>
          <li>Email: {profile.email}</li>
          <li>Full Name: {profile.full_name}</li>
          {profile.phone && <li>Phone: {profile.phone}</li>}
        </ul>
      </div>

      {/* User Tasks */}
      {profile.assigned_tasks && profile.assigned_tasks.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold text-xl mb-4">Assigned Tasks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.assigned_tasks.map((task) => (
              <div
                
                key={task.id}
                onClick={() => {
                    setSelectedTask(task.id);
                    setShowTaskDetail(true);
                }}
                className="border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-lg">{task.title}</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      task.status === "todo"
                        ? "bg-gray-200 text-gray-800"
                        : task.status === "in_progress"
                        ? "bg-blue-200 text-blue-800"
                        : task.status === "done"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {task.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{task.description || "No description"}</p>
                <p className="text-sm text-gray-600">
                  Priority: <span className="capitalize">{task.priority}</span>
                </p>
                {task.due_date && (
                  <p className="text-sm text-gray-500">
                    Due: {formatDate(task.due_date)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {showTaskDetail && (
  <TaskDetailModal
    taskId={selectedTask}
    onClose={() => setShowTaskDetail(false)}
  />
)}
    </div>
  );
}

export default Profile;
