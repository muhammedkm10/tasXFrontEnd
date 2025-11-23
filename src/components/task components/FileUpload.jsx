import React from "react";
import { uploadFile } from "../../api/tasksApi";

function FileUpload({ taskId, onUploaded }) {
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("task", taskId);
    formData.append("file", e.target.files[0]);

    const res = await uploadFile(formData);
    onUploaded(res.data);
  };

  return <input type="file" onChange={handleUpload} />;
}

export default FileUpload;
