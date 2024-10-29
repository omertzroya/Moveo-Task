import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackToHomepageButton from './BackToHomepageButton';
import { Music2 } from 'lucide-react';

const SignupAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup/admin`, { 
        username, 
        password, 
        instrument 
      });
      const role = 'admin';
      navigate('/adminMain', { state: { role, instrument } });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Music2 className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">Music Admin Panel</h1>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="mb-6">
              <BackToHomepageButton />
            </div>
            
            <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Sign Up as Admin
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           placeholder-gray-400 text-white transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           placeholder-gray-400 text-white transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Instrument
                </label>
                <select
                  value={instrument}
                  onChange={(e) => setInstrument(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-white transition-all duration-200"
                >
                  <option value="">Select an instrument</option>
                  <option value="Drums">Drums</option>
                  <option value="Guitar">Guitar</option>
                  <option value="Bass">Bass</option>
                  <option value="Saxophone">Saxophone</option>
                  <option value="Keyboards">Keyboards</option>
                  <option value="Vocals">Vocals</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 
                         text-white font-medium rounded-lg transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         focus:ring-offset-gray-800"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupAdmin;