import React, { useEffect, useState } from "react";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
} from "../api/api_functions";

function TaskComments({ taskId }) {
    console.log("log",taskId);
    
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const loadComments = async () => {
    setLoading(true);
    const res = await fetchComments(taskId);
    console.log("response",res);
    
    if (res.success) {
      // Map to match frontend expectations
      const mapped = res.data.map((c) => ({
        id: c.id,
        content: c.content,
        created_at: c.created_at,
        updated_at: c.updated_at,
        author: c.author,
      }));
      setComments(mapped);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (taskId) loadComments();
  }, [taskId]);

  const handleCreate = async () => {
    if (!newContent.trim()) return;
    const res = await createComment(taskId, newContent);
    console.log("response",res);
    
    if (res.success) {
      setComments([res.data, ...comments]);
      setNewContent("");
    } else {
      alert(res.message);
    }
  };

  const handleUpdate = async (commentId) => {
    if (!editingContent.trim()) return;
    const res = await updateComment(taskId, commentId, editingContent);
    if (res.success) {
      setComments(comments.map((c) => (c.id === commentId ? res.data : c)));
      setEditingId(null);
      setEditingContent("");
    } else {
      alert(res.message);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    const res = await deleteComment(taskId, commentId);
    if (res.success) {
      setComments(comments.filter((c) => c.id !== commentId));
    } else {
      alert(res.message);
    }
  };

  if (loading) return <p className="text-gray-500">Loading comments...</p>;

  return (
    <div className="space-y-4">
      {/* New Comment Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
        {comments.map((c) => (
          <div key={c.id} className="p-2 bg-gray-100 rounded flex justify-between items-start">
            <div className="flex-1">
              <p className="text-gray-800 font-medium">{c.author.username}</p>
              {editingId === c.id ? (
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => handleUpdate(c.id)}
                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="text-gray-700 mt-1">{c.content}</p>
              )}
              <p className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</p>
            </div>
            {editingId !== c.id && (
              <div className="flex flex-col gap-1 ml-2">
                <button
                  onClick={() => {
                    setEditingId(c.id);
                    setEditingContent(c.content);
                  }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskComments;
