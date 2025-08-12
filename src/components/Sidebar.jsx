
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import API from '../services/api';
import {
  AiFillHome,
  AiOutlineHistory,
  AiOutlineLike,
} from 'react-icons/ai';
import { MdVideoLibrary, MdWatchLater } from 'react-icons/md';
import { FaPlusCircle } from 'react-icons/fa';
import { PiSlideshowBold } from 'react-icons/pi';
import { MdSubscriptions } from 'react-icons/md';

// Sidebar component receives isOpen prop to control visibility
export default function Sidebar({ isOpen }) {

    const { user, token } = useContext(AuthContext);
    const [myChannelId, setMyChannelId] = useState(null);

  useEffect(() => {
    const fetchMyChannel = async () => {
      try {
        const res = await API.get(`/channels/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMyChannelId(res.data._id);
      } catch (error) {
        console.error("Error fetching user's channel:", error.message);
      }
    };

    if (user) fetchMyChannel();
  }, [user, token]);



  return (
    
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-gray-400 text-black transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full' // Slide in/out based on isOpen
      }`}
    >
      {/* Header section of sidebar */}
      <div className="p-4 text-xl font-semibold border-b border-gray-700">
        Navigation
      </div>

     
      <nav className="flex flex-col p-4 gap-4">
        {/* link to homepage */}
        <Link to="/" className="flex items-center gap-3 hover:text-red-500">
          <AiFillHome size={20} />
          <span>Home</span>
        </Link>

        {/*  Shorts */}
        <div className="flex items-center gap-3 cursor-default hover:text-red-500">
          <PiSlideshowBold size={20} />
          <span>Shorts</span>
        </div>

        {/* Subscriptions */}
        <div className="flex items-center gap-3 cursor-default hover:text-red-500">
          <MdSubscriptions size={20} />
          <span>Subscriptions</span>
        </div>

        {/* Divider between sections */}
        <hr className="border-gray-700 my-2" />

        {/* link to create channel */}
        <Link to="/channel/create" className="flex items-center gap-3 hover:text-red-500">
          <FaPlusCircle size={20} />
          <span>Create Channel</span>
        </Link>

        {/* link to videos */}
        <Link to="/videos" className="flex items-center gap-3 hover:text-red-500">
          <MdVideoLibrary size={20} />
          <span>Videos</span>
        </Link>

        {/* link to Channels */}
        {myChannelId && (
        <Link to={`/channels/${myChannelId}`} className="flex items-center gap-3 hover:text-red-500">
          <MdSubscriptions size={20} />
          <span>My Channel</span>
        </Link>
      )}

        {/* link to Upload Videos */}
        <Link to="/video/upload" className="flex items-center gap-3 hover:text-red-500">
            <MdVideoLibrary size={20} />
            <span>Upload Video</span>
        </Link>


      </nav>
    </aside>
  );
}