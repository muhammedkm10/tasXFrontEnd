import React, { useEffect, useState } from "react";
import { fetchTask, deleteTask } from "../../api/api_functions";


function TaskModal({ taskId, onClose }) {
  const [task, setTask] = useState(null);

  const loadTask = async () => {
    const res = await fetchTask(taskId);
    setTask(res.data);
  };

  useEffect(() => {
    loadTask();
  }, []);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="modal">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      <h4>Tags:</h4>
      {task.tags.map((t) => (
        <span key={t.id}>#{t.name} </span>
      ))}

      <h4>Files:</h4>
      {task.files.map((f) => (
        <a key={f.id} href={f.file_url} target="_blank" rel="noreferrer">
          {f.filename}
        </a>
      ))}

      <button
        onClick={async () => {
          await deleteTask(taskId);
          onClose();
        }}
        className="btn-danger"
      >
        Delete
      </button>

      <button onClick={onClose} className="btn">Close</button>
    </div>
  );
}

export default TaskModal;
