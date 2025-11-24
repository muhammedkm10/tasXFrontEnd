// TaskFiles.jsx
import React from "react";

function TaskFiles({ files }) {
  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {files.length === 0 && <p className="text-gray-500">No files attached.</p>}
      {files.map((f) => (
        <div key={f.id}>
          <a
            href={f.file_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {f.filename}
          </a>
        </div>
      ))}
    </div>
  );
}

export default TaskFiles;
