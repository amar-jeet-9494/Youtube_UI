import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/authContext';

export default function VideoUploadPage() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    thumbnailUrl: '',
    description: '',
    category: '',
    channel: ''
  });
  const [error, setError] = useState('');

  // Fetch user's channel
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await API.get(`/channels/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData(prev => ({ ...prev, channel: res.data._id }));
      } catch {
        setError("You need to create a channel before uploading videos.");
      }
    };
    if (user) fetchChannel();
  }, [user, token]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post('/videos', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/video/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    }
    console.log('Uploading', formData)
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">Upload Video</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input
        name="title"
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="videoUrl"
        type="text"
        placeholder="Video URL"
        value={formData.videoUrl}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="thumbnailUrl"
        type="text"
        placeholder="Thumbnail URL"
        value={formData.thumbnailUrl}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="category"
        type="text"
        placeholder="Category (e.g., Tech, Music)"
        value={formData.category}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
}