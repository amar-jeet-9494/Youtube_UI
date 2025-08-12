import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/authContext';

export default function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Send login credentials to backend API
      const res = await API.post('/auth/login', { email, password });
      login(res.data); // Save user data to context
      navigate('/');   // Redirect to homepage after successful login
    } catch (err) {
      console.error('Login failed:', err); // Catch errors
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg border border-gray-200 space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

      {/* Email Input */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Password Input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Login
      </button>

      {/* Register Link */}
      <p className="text-sm text-center text-gray-700">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}