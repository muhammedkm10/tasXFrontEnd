// TaskFiles.jsx
import React, { useEffect, useState } from "react";
import { getTaskFiles, uploadTaskFile, deleteTaskFile } from '../api/api_functions'

const TaskFiles = ({ taskId }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Load files on mount
  useEffect(() => {
    loadFiles();
  }, [taskId]);

  const loadFiles = async () => {
    const res = await getTaskFiles(taskId);
    console.log("my response of fetching dATA",res);
    
    if (res.success) setFiles(res.data.results || res.data); // Handles paginated & non-paginated
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const res = await uploadTaskFile({ taskId, file });
    setUploading(false);

    if (res.success) {
      loadFiles();  // Refresh after upload
    } else {
      alert("Failed to upload file");
    }
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm("Delete this file?")) return;
    const res = await deleteTaskFile(fileId);
    if (res.success) loadFiles();
  };

  return (
    <div className="space-y-3">
      {/* Upload Button */}
      <div>
        <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          {uploading ? "Uploading..." : "Upload File"}
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>

      {/* File List */}
      <div className="max-h-64 overflow-y-auto space-y-2 border p-3 rounded">
        {files.length === 0 ? (
          <p className="text-gray-500">No files attached.</p>
        ) : (
          files.map((file) => (
            <div 
              key={file.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              <a
                href={file.file_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {file.filename}
              </a>

              <button
                onClick={() => handleDelete(file.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskFiles;
