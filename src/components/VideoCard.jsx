import React from 'react';
import { Link } from 'react-router-dom';

export default function VideoCard({ video }) {
  return (
    // Container for each video card
    <div className="video-card bg-white rounded-md overflow-hidden shadow hover:shadow-lg transition duration-300">
      {/* Link to video page */}
      <Link to={`/video/${video._id}`}>
        {/* Thumbnail Image */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-48 object-cover"
        />

        
        <div className="p-4 space-y-1">
          {/* Title */}
          <h4 className="text-lg font-semibold text-gray-800 truncate">
            {video.title}
          </h4>

          {/* Channel Name */}
          <p className="text-sm text-gray-600">{video.channel.name}</p>

          {/* Views */}
          <p className="text-sm text-gray-500">{video.views} views</p>
        </div>
      </Link>
    </div>
  );
}