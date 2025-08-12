import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/authContext';
import VideoCard from '../components/VideoCard';

export default function ChannelPage() {
  const { channelId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);

  // Fetch channel details
 useEffect(() => {
  const fetchChannel = async () => {
    try {
      const res = await API.get(`/channels/${channelId}`);
      setChannel(res.data);
    } catch (error) {
      console.error('Failed to fetch channel:', error.message);
    }
  };

  if (channelId) fetchChannel();
}, [channelId]);



  // Delete a video
  const deleteVideo = async id => {
    try {
      await API.delete(`/videos/${id}`);
      fetchChannel();
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };

  if (!channel)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Channel Banner */}
      <img
        src={channel.bannerUrl}
        alt="Banner"
        className="w-full h-40 object-cover rounded shadow-sm"
      />

      {/* Channel Details */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">{channel.name}</h2>
        <p className="text-gray-700">{channel.description}</p>
        <p className="text-sm text-gray-600">{channel.subscribers} subscribers</p>
      </div>

      {/* Channel's Videos Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Videos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(channel.videos) && channel.videos.map(v => (
            <div key={v._id} className="space-y-2">
              <VideoCard video={v} />
              {user && user.id === channel.owner && (
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/video/edit/${v._id}`)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteVideo(v._id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}