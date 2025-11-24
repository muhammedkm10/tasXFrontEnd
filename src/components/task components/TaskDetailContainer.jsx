// TaskDetailsContainer.jsx
import React, { useState } from "react";
import TaskFiles from "./TaskFiles";
import TaskComments from "./TaskComments";

function TaskDetailsContainer({ task }) {
    console.log("task",task);
    
  const [activeTab, setActiveTab] = useState("comments");

  return (
    <div className="mt-6 border-t pt-4">
      {/* Bottom navbar */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("comments")}
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === "comments" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
        >
          Comments
        </button>
        <button
          onClick={() => setActiveTab("files")}
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === "files" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
        >
          Files
        </button>
      </div>

      {/* Section content */}
      <div>
        {activeTab === "comments" ? (
          <TaskComments taskId={task.id } />
        ) : (
          <TaskFiles files={task.files || []} />
        )}
      </div>
    </div>
  );
}

export default TaskDetailsContainer;
