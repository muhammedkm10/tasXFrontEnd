import React, { useEffect, useState } from "react";
import TaskModal from "./TaskModal";
import TaskForm from "./TaskForm";
import BulkCreateModal from "./BulkCreateModal";
import { fetchTasks } from "../../api/api_functions";




function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const loadTasks = async (filters = {}) => {
    setLoading(true);
    try {
      const res = await fetchTasks(filters);
      setTasks(res.data.results);
      setPagination({
        next: res.data.next,
        prev: res.data.previous,
        count: res.data.count,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-3">
        <input
          type="text"
          placeholder="Search..."
          className="border px-2 py-1"
          onChange={(e) => loadTasks({ search: e.target.value })}
        />

        <button className="btn" onClick={() => setShowFormModal(true)}>
          ➕ Add Task
        </button>

        <button className="btn" onClick={() => setShowBulkModal(true)}>
          📦 Bulk Create
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="border p-3 mb-2 cursor-pointer"
            onClick={() => {
              setSelectedTask(task.id);
              setShowTaskModal(true);
            }}
          >
            <h3>{task.title}</h3>
            <p>Status: {task.status} | Priority: {task.priority}</p>
          </div>
        ))
      )}

      {/* Modals */}
      {showTaskModal && (
        <TaskModal
          taskId={selectedTask}
          onClose={() => setShowTaskModal(false)}
        />
      )}

      {showFormModal && (
        <TaskForm
          onSuccess={() => {
            loadTasks();
            setShowFormModal(false);
          }}
          onClose={() => setShowFormModal(false)}
        />
      )}

      {showBulkModal && (
        <BulkCreateModal
          onSuccess={() => {
            loadTasks();
            setShowBulkModal(false);
          }}
          onClose={() => setShowBulkModal(false)}
        />
      )}
    </div>
  );
}

export default TaskList;
