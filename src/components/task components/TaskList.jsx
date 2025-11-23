import React, { useEffect, useState } from "react";
import TaskModal from "./TaskModal";
import TaskForm from "./TaskForm";
import BulkCreateModal from "./BulkCreateModal";
import AssignUserModal from "./AssignUserModal";
import { fetchTasks } from "../api/api_functions";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false); // NEW: assign user modal
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleted, setShowDeleted] = useState(false); // NEW: toggle for deleted tasks

  const loadTasks = async (filters = {}) => {
    setLoading(true);

    // Add deleted filter to API params
    const params = { ...filters, include_deleted: showDeleted ? "true" : "false" };

    const res = await fetchTasks(params);
    if (res.success) {
      setTasks(res.data);
      setPagination(res.pagination);
    } else {
      console.error(res.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks({ search: searchQuery });
  }, [searchQuery, showDeleted]);

  const handlePageChange = (url) => {
    if (!url) return;
    const query = new URL(url).searchParams.toString();
    loadTasks({ search: searchQuery, ...Object.fromEntries(new URLSearchParams(query)) });
  };

  const statusColors = {
    todo: "bg-gray-200 text-gray-800",
    in_progress: "bg-blue-200 text-blue-800",
    done: "bg-green-200 text-green-800",
    archived: "bg-red-200 text-red-800",
  };

  return (
    <div className="p-4">
      {/* Search & Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2 items-center">
        <input
          type="text"
          placeholder="Search tasks..."
          className="border px-3 py-2 rounded-lg flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex gap-2 items-center">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={showDeleted}
              onChange={() => setShowDeleted(!showDeleted)}
              className="accent-blue-600"
            />
            Show Deleted
          </label>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => setShowFormModal(true)}
          >
            ➕ Add Task
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            onClick={() => setShowBulkModal(true)}
          >
            📦 Bulk Create
          </button>
        </div>
      </div>

      {/* Task Grid */}
      {loading ? (
        <p className="text-center py-4">Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition"
              onClick={() => {
                setSelectedTask(task.id);
                if (!showDeleted) setShowTaskModal(true);
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <span className={`px-2 py-1 rounded-full text-sm ${statusColors[task.status] || "bg-gray-200"}`}>
                  {task.status.replace("_", " ")}
                </span>
              </div>

              <p className="text-gray-700 mb-2">{task.description || "No description"}</p>

              <div className="flex flex-wrap gap-1 mb-2">
                {task.tags && task.tags.length > 0 ? (
                  task.tags.map((t) => (
                    <span
                      key={t.id}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      #{t.name}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs">No tags</span>
                )}
              </div>

              <p className="text-sm text-gray-600">
                Priority: <span className="capitalize">{task.priority}</span>
              </p>

              {/* Assign User Button */}
              {!showDeleted && (
                <button
                  className="px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 mt-2"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent opening task modal
                    setSelectedTask(task.id);
                    setShowAssignModal(true);
                  }}
                >
                  Assign User
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && (pagination.next || pagination.prev) && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => handlePageChange(pagination.prev)}
            disabled={!pagination.prev}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => handlePageChange(pagination.next)}
            disabled={!pagination.next}
          >
            Next
          </button>
        </div>
      )}

      {/* Modals */}
      {showTaskModal && (
        <TaskModal
          taskId={selectedTask}
          onClose={() => setShowTaskModal(false)}
          onUpdate={() => loadTasks({ search: searchQuery })}
        />
      )}

      {showFormModal && (
        <TaskForm
          onSuccess={() => {
            loadTasks({ search: searchQuery });
            setShowFormModal(false);
          }}
          onClose={() => setShowFormModal(false)}
        />
      )}

      {showBulkModal && (
        <BulkCreateModal
          onSuccess={() => {
            loadTasks({ search: searchQuery });
            setShowBulkModal(false);
          }}
          onClose={() => setShowBulkModal(false)}
        />
      )}

      {showAssignModal && (
        <AssignUserModal
          taskId={selectedTask}
          onClose={() => setShowAssignModal(false)}
          onSuccess={() => loadTasks({ search: searchQuery })}
        />
      )}
    </div>
  );
}

export default TaskList;
