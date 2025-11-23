import React, { useEffect, useState } from "react";
import { fetchSingleTask, deleteTask } from "../api/api_functions";
import TaskForm from "./TaskForm";

function TaskModal({ taskId, onClose, onUpdate }) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      setLoading(true);
      try {
        const res = await fetchSingleTask(taskId);
        if (res.success) {
          setTask(res.data);
        } else {
          alert(res.message);
          onClose();
        }
      } catch (err) {
        console.error(err);
        onClose();
      }
      setLoading(false);
    };
    loadTask();
  }, [taskId, onClose]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-lg font-medium">
          Loading...
        </div>
      </div>
    );
  }

  if (!task) return null;

  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        {editing ? (
          <TaskForm
            task={task}
            onClose={() => setEditing(false)}
            onSuccess={() => {
              setEditing(false);
              if (onUpdate) onUpdate();
              onClose();
            }}
          />
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 font-bold text-2xl transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-gray-700">
              <p><strong>Description:</strong> {task.description || "No description"}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`capitalize px-2 py-1 rounded-full text-sm font-medium ${
                  task.status === "done" ? "bg-green-100 text-green-800" :
                  task.status === "todo" ? "bg-yellow-100 text-yellow-800" :
                  task.status === "in_progress" ? "bg-blue-100 text-blue-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {task.status.replace("_", " ")}
                </span>
              </p>
              <p>
                <strong>Priority:</strong>{" "}
                <span className={`capitalize px-2 py-1 rounded-full text-sm font-medium ${
                  task.priority === "critical" ? "bg-red-100 text-red-800" :
                  task.priority === "high" ? "bg-orange-100 text-orange-800" :
                  task.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                  "bg-green-100 text-green-800"
                }`}>
                  {task.priority}
                </span>
              </p>
              <p><strong>Assigned To:</strong> {task.assigned_to || "Not assigned"}</p>
              <p><strong>Created By:</strong> {task.created_by}</p>
              <p><strong>Created At:</strong> {formatDate(task.created_at)}</p>
              <p><strong>Due Date:</strong> {task.due_date ? formatDate(task.due_date) : "Not set"}</p>

              <div>
                <strong>Tags:</strong>
                {task.tags && task.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {task.tags.map((t, index) => (
                      <span
                        key={t.id || index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                      >
                        #{typeof t === "string" ? t : t.name}
                      </span>
                    ))}
                  </div>
                ) : <span> None</span>}
              </div>

              <div>
                <strong>Files:</strong>
                {task.files.length > 0 ? (
                  <ul className="list-disc ml-5 mt-1">
                    {task.files.map((f) => (
                      <li key={f.id}>
                        <a
                          href={f.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {f.filename}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : <span> None</span>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
              <button
                onClick={async () => {
                  if (window.confirm("Are you sure you want to delete this task?")) {
                    try {
                      const res = await deleteTask(taskId);
                      if (res.success) {
                        if (onUpdate) onUpdate();
                        onClose();
                      } else {
                        alert(res.message);
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Failed to delete task. Try again.");
                    }
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskModal;
