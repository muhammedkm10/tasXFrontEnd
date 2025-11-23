import React, { useState } from "react";
import { createTask, updateTask } from "../../api/api_functions";



function TaskForm({ task = null, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    status: task?.status || "todo",
    tags: task?.tags || [],
  });

  const handleSubmit = async () => {
    const payload = {
      ...form,
      tags: form.tags.map((t) => ({ name: t }))
    };

    if (task) await updateTask(task.id, payload);
    else await createTask(payload);

    onSuccess();
  };

  return (
    <div className="modal">
      <h3>{task ? "Edit Task" : "Add Task"}</h3>

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button className="btn" onClick={handleSubmit}>Save</button>
      <button className="btn" onClick={onClose}>Cancel</button>
    </div>
  );
}

export default TaskForm;
