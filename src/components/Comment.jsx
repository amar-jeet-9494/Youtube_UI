import React, { useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/authContext';

// Component to render a single comment with edit/delete options
export default function Comment({ data, refresh }) {
  const { user } = useContext(AuthContext); // Get current user from context

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(data.text);

  // Save updated comment to backend
  const save = async () => {
    await API.patch(`/comments/${data._id}`, { text }); // Send PATCH request
    setEditing(false);  
    refresh();        
  };

  // Delete this comment from backend
  const remove = async () => {
    await API.delete(`/comments/${data._id}`); // Send DELETE request
    refresh();         // Refresh comment
  };

  return (
   
    <div className="bg-white p-4 rounded shadow-md mb-4 border border-gray-200">
      
      {/* Username */}
      <div className="text-sm font-semibold text-gray-800 mb-2">
        {data.user.username}
      </div>

      {/* Comment Editing Form */}
      {editing ? (
        <div className="space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <button
            onClick={save} // Trigger save
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-700 mb-2">{data.text}</p>
      )}

      {/* Show Edit/Delete buttons only to comment owner */}
      {user && user.id === data.user._id && !editing && (
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(true)}
            className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={remove}
            className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}