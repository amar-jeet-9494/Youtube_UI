import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/authContext';

export default function CreateChannelPage() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    bannerUrl: ''
  });

  const createChannel = async () => {
    try {
      const res = await API.post('/channels', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate(`/channel/${res.data._id}`);
    } catch (error) {
      console.error('Creation failed:', error.response?.data?.message);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold">Create a New Channel</h2>
      <input
        type="text"
        placeholder="Channel Name"
        className="w-full border px-3 py-2 rounded"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <textarea
        placeholder="Channel Description"
        className="w-full border px-3 py-2 rounded"
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Banner URL"
        className="w-full border px-3 py-2 rounded"
        value={formData.bannerUrl}
        onChange={e => setFormData({ ...formData, bannerUrl: e.target.value })}
      />
      <button
        onClick={createChannel}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Create Channel
      </button>
    </div>
  );
}