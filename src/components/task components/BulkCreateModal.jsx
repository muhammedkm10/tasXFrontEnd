import React, { useState } from "react";
import { bulkCreateTask } from "../api/api_functions";

function BulkCreateModal({ onClose, onSuccess }) {
const [tasks, setTasks] = useState([{ title: "", description: "", priority: "medium", status: "todo", due_date: "" }]);
const [loading, setLoading] = useState(false);

const handleChange = (index, field, value) => {
const newTasks = [...tasks];
newTasks[index][field] = value;
setTasks(newTasks);
};

const addTask = () => {
setTasks([...tasks, { title: "", description: "", priority: "medium", status: "todo", due_date: "" }]);
};

const removeTask = (index) => {
const newTasks = tasks.filter((_, i) => i !== index);
setTasks(newTasks);
};

const handleSubmit = async () => {
// Validate title and description
for (let t of tasks) {
if (!t.title.trim() || !t.description.trim()) {
alert("All tasks must have a title and description.");
return;
}
}


const payload = tasks.map((t) => ({  
  ...t,  
  due_date: t.due_date ? new Date(t.due_date).toISOString() : null  
}));  

setLoading(true);  
try {  
  const res = await bulkCreateTask( payload );  
  if (res.success) { 
    alert("Tasks created successfully!"); 
    onSuccess();  
    onClose();  
  } else {  
    alert(res.message || "Failed to create tasks");  
  }  
} catch (err) {  
  console.error(err);  
  alert("Something went wrong");  
}  
setLoading(false);  


};

return ( <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"> <div className="bg-white p-6 rounded-xl w-full max-w-3xl shadow-lg max-h-[90vh] overflow-y-auto"> <h2 className="text-xl font-bold mb-4 text-center">Bulk Create Tasks</h2>

```
    {tasks.map((task, index) => (  
      <div key={index} className="border p-4 rounded-lg mb-4 relative bg-gray-50">  
        {tasks.length > 1 && (  
          <button  
            onClick={() => removeTask(index)}  
            className="absolute top-2 right-2 text-red-600 font-bold hover:text-red-800"  
          >  
            &times;  
          </button>  
        )}  
        <input  
          type="text"  
          placeholder="Title"  
          value={task.title}  
          onChange={(e) => handleChange(index, "title", e.target.value)}  
          className="w-full border px-3 py-2 rounded mb-2"  
        />  
        <textarea  
          placeholder="Description"  
          value={task.description}  
          onChange={(e) => handleChange(index, "description", e.target.value)}  
          className="w-full border px-3 py-2 rounded mb-2"  
        />  
        <div className="flex gap-2 mb-2">  
          <select  
            value={task.priority}  
            onChange={(e) => handleChange(index, "priority", e.target.value)}  
            className="border px-2 py-1 rounded"  
          >  
            <option value="low">Low</option>  
            <option value="medium">Medium</option>  
            <option value="high">High</option>  
            <option value="critical">Critical</option>  
          </select>  
          <select  
            value={task.status}  
            onChange={(e) => handleChange(index, "status", e.target.value)}  
            className="border px-2 py-1 rounded"  
          >  
            <option value="todo">To Do</option>  
            <option value="in_progress">In Progress</option>  
            <option value="done">Done</option>  
            <option value="archived">Archived</option>  
          </select>  
          <input  
            type="datetime-local"  
            value={task.due_date}  
            onChange={(e) => handleChange(index, "due_date", e.target.value)}  
            className="border px-2 py-1 rounded flex-1"  
          />  
        </div>  
      </div>  
    ))}  

    <div className="flex justify-between mt-4">  
      <button  
        onClick={addTask}  
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"  
      >  
        + Add Another Task  
      </button>  
      <div className="flex gap-2">  
        <button  
          onClick={onClose}  
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"  
        >  
          Cancel  
        </button>  
        <button  
          onClick={handleSubmit}  
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"  
          disabled={loading}  
        >  
          {loading ? "Creating..." : "Create Tasks"}  
        </button>  
      </div>  
    </div>  
  </div>  
</div>  

);
}

export default BulkCreateModal;
