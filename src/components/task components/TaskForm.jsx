import React, { useEffect, useState } from "react";
import { handleTaskSubmit, fetchAllTags } from "../api/api_functions";
import InputField from "../ui elements/InputField";
import TextareaField from "../ui elements/TextAreaField";
import SelectField from "../ui elements/SelectField";
import TagInput from "../ui elements/TagInput";
import { validateTaskForm } from "../validations/validateTask"; // import the validation

function TaskForm({ task = null, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    status: task?.status || "todo",
    tags: task?.tags?.map((t) => t.name) || [],
    due_date: task?.due_date ? task.due_date.split("T")[0] : null,
  });

  const [allTags, setAllTags] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadTags = async () => {
      try {
        const res = await fetchAllTags();
        setAllTags(res?.data?.map((t) => t.name));
      } catch (err) {
        console.error(err);
      }
    };
    loadTags();
  }, []);

  const handleSubmit = async () => {
    // Run validation
    const validationErrors = validateTaskForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare payload
    const payload = {
      ...form,
      tags: form.tags.map((name) => ({ name })),
    };

    if (form.due_date && form.due_date.trim() !== "") {
      payload.due_date = new Date(form.due_date).toISOString();
    }

    try {
      const res = await handleTaskSubmit(task?.id, payload);
      if (res.success) {
        onSuccess();
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save task. Please try again.");
    }
  };

  const renderError = (field) =>
    errors[field] ? (
      <p className="text-red-600 text-sm mt-1">{errors[field]}</p>
    ) : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4 shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold text-center">
          {task ? "Edit Task" : "Add Task"}
        </h2>

        <div>
          <InputField
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          {renderError("title")}
        </div>

        <div>
          <TextareaField
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          {renderError("description")}
        </div>

        <div>
          <SelectField
            label="Priority"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
              { label: "Critical", value: "critical" },
            ]}
          />
          {renderError("priority")}
        </div>

        <div>
          <SelectField
            label="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            options={[
              { label: "To Do", value: "todo" },
              { label: "In Progress", value: "in_progress" },
              { label: "Done", value: "done" },
              { label: "Archived", value: "archived" },
            ]}
          />
          {renderError("status")}
        </div>

        <div>
          <InputField
            label="Due Date"
            type="date"
            value={form.due_date}
            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
          />
          {renderError("due_date")}
        </div>

        <div>
          <TagInput
            tags={form.tags}
            setTags={(tags) => setForm({ ...form, tags })}
            allTags={allTags}
          />
          {renderError("tags")}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
