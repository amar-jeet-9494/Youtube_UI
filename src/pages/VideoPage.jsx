import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import Comment from '../components/Comment';
import { AuthContext } from '../context/authContext';

export default function VideoPage() {
  // Extract video ID from route
  const { videoId } = useParams();
  const { user } = useContext(AuthContext);

  // State for video details and comments
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newText, setNewText] = useState('');

  // Fetch video details from backend
  const fetchVideo = async () => {
    const res = await API.get(`/videos/${videoId}`);
    setVideo(res.data);
  };

  // Fetch comments related to this video
  const fetchComments = async () => {
    const res = await API.get(`/comments/video/${videoId}`);
    setComments(res.data);
  };

  // Run fetch operations when videoId changes
  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, [videoId]);

  // Post new comment
  const addComment = async () => {
    await API.post('/comments', { videoId, text: newText });
    setNewText('');
    fetchComments(); // Refresh comment list
  };

  // Handle likes/dislikes
  const reactHandler = type => async () => {
    await API.patch(`/videos/${videoId}/${type}`);
    fetchVideo();
  };

  // Show loading until video is fetched
  if (!video) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Video Player */}
      <video src={video.videoUrl} controls className="w-full rounded-md shadow-md" />

      {/* Video Info */}
      <h2 className="text-2xl font-bold text-gray-800">{video.title}</h2>
      <p className="text-gray-700">{video.description}</p>
      <p className="text-sm text-gray-600">Channel: {video.channel.name}</p>

      {/* Like/Dislike Buttons */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={reactHandler('like')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          👍 {video.likes}
        </button>
        <button
          onClick={reactHandler('dislike')}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          👎 {video.dislikes}
        </button>
      </div>

      {/* Comment Section */}
      <section className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Comments</h3>

        {/* Add Comment Box */}
        {user && (
          <div className="mb-6 space-y-2">
            <textarea
              value={newText}
              onChange={e => setNewText(e.target.value)}
              placeholder="Add a comment"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <button
              onClick={addComment}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        )}

        {/* Render Comments */}
        <div className="space-y-4">
          {comments.map(c => (
            <Comment key={c._id} data={c} refresh={fetchComments} />
          ))}
        </div>
      </section>
    </div>
  );
}