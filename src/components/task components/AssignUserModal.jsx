import React, { useEffect, useState } from "react";
import { fetchUsers, assignUserToTask } from "../api/api_functions"; // make sure these are correct

function AssignUserModal({ taskId, onClose, onSuccess }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetchUsers();
        if (res.success && Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          alert(res.message || "Failed to fetch users");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch users");
      }
      setLoading(false);
    };
    loadUsers();
  }, []);

  const handleAssign = async () => {
    console.log("i am wokring");
    
    if (!selectedUser || selectedUser.toString().trim() === "") {
      alert("Please select a user");
      return;
    }


    setSaving(true);
    try {
    
      const res = await assignUserToTask(selectedUser, taskId); // userId, taskId
      if (res.success) {
        alert("assigned succesfully")
        onSuccess();
        onClose();
      } else {
        console.log("response ein sadf",res);
        
        alert(res?.message?.message || "Failed to assign user");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to assign user");
    }
    setSaving(false);
  };

  if (loading) return <p className="text-center py-4">Loading users...</p>;
  if (!users.length) return <p className="text-center py-4">No users available</p>;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Assign User</h2>

        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {saving ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignUserModal;
