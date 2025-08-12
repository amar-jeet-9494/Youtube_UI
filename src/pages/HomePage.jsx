import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../services/api';
import VideoCard from '../components/VideoCard';

export default function HomePage() {
  
  const [videos, setVideos] = useState([]);

  
  const [filter, setFilter] = useState('All');

  
  const query = new URLSearchParams(useLocation().search);
  const search = query.get('search') || ''; // Fallback to empty string if no search

  // Function to fetch filtered videos from the backend
  const fetchVideos = async () => {
    const res = await API.get('/videos', {
      params: {
        search,
        category: filter !== 'All' ? filter : '',
      },
    });
    setVideos(res.data); // Store fetched videos in state
  };

  // Re-fetch videos when search
  useEffect(() => {
    fetchVideos();
  }, [search, filter]);

  return (
    <div className="p-4">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {['All', 'Tutorial', 'Music', 'Gaming'].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === cat
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
            }`}
            onClick={() => setFilter(cat)} // Update filter on click
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((v) => (
          <VideoCard key={v._id} video={v} /> // Render individual video card
        ))}
      </div>
    </div>
  );
}