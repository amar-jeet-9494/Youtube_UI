import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VideoPage from './pages/VideoPage';
import ChannelPage from './pages/ChannelPage';
import CreateChannelPage from './pages/CreateChannelPage';
import './App.css';
import VideoUploadPage from './pages/VideoUploadPage';

function App() {
  // State to control sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // AuthProvider wraps app to give access to user context
    <AuthProvider>
      <Router>
        {/* toggle sidebar */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} />

        <main className="main-content p-4 bg-gray-100 min-h-screen">
          <Routes>
            {/* Home route */}
            <Route path="/" element={<HomePage />} />

            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Video and Channel routes */}
            <Route path="/video/:videoId" element={<VideoPage />} />
            <Route path="/channels/:channelId" element={<ChannelPage />} />
            <Route path="/channel/create" element={<CreateChannelPage />} />
            <Route path="/video/upload" element={<VideoUploadPage />} />


          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;