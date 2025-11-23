import React, { useState } from "react";
import { bulkCreateTask } from "../../api/api_functions";

function BulkCreateModal({ onClose, onSuccess }) {
  const [rawInput, setRawInput] = useState("");

  const handleSubmit = async () => {
    const tasks = rawInput
      .split("\n")
      .filter((t) => t.trim() !== "")
      .map((t) => ({ title: t }));

    await bulkCreateTask({ tasks });
    onSuccess();
  };

  return (
    <div className="modal">
      <h3>Bulk Create Tasks</h3>
      <textarea
        rows={10}
        placeholder="Enter one task title per line"
        onChange={(e) => setRawInput(e.target.value)}
      />

      <button className="btn" onClick={handleSubmit}>Create</button>
      <button className="btn" onClick={onClose}>Cancel</button>
    </div>
  );
}

export default BulkCreateModal;
