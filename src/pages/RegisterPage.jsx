import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function RegisterPage() {
  // State to store user input
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  // Handle form submission and API call
  const handleSubmit = async e => {
    e.preventDefault();
    await API.post('/auth/signup', data); // send data to backend
    navigate('/login'); // redirect to login after successful registration
  };

  return (
    <form
      className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg border border-gray-200 space-y-5"
      onSubmit={handleSubmit}
    >
      {/* Page title */}
      <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

      {/* Username Input */}
      <input
        type="text"
        placeholder="Username"
        value={data.username}
        onChange={e => setData({ ...data, username: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Email Input */}
      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={e => setData({ ...data, email: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Password Input */}
      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={e => setData({ ...data, password: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Register
      </button>
    </form>
  );
}