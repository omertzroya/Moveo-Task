import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Music2, User, Lock, Guitar } from 'lucide-react';
import BackToHomepageButton from './BackToHomepageButton';

const SignupUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup/user`, { 
        username, 
        password, 
        instrument 
      });
      const role = 'player';
      navigate('/MainPlayer', { state: { role, instrument } });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-4">
      {/* Logo Section */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Music2 className="h-10 w-10 text-blue-400" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Music Player
          </h1>
        </div>
        <p className="text-gray-400">Join live music sessions as a band member</p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8">
        <div className="absolute top-4 left-4">
          <BackToHomepageButton />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up as Player</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required 
                placeholder="Enter your username"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 pl-10
                         text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                         transition duration-200"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="Enter your password"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 pl-10
                         text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                         transition duration-200"
              />
            </div>
          </div>

          {/* Instrument Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Instrument</label>
            <div className="relative">
              <Guitar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <select 
                value={instrument} 
                onChange={(e) => setInstrument(e.target.value)} 
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 pl-10
                         text-white appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                         transition duration-200"
              >
                <option value="">Select your instrument</option>
                <option value="Drums">Drums</option>
                <option value="Guitar">Guitar</option>
                <option value="Bass">Bass</option>
                <option value="Saxophone">Saxophone</option>
                <option value="Keyboards">Keyboards</option>
                <option value="Vocals">Vocals</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg
                     transition duration-200 transform hover:translate-y-px flex items-center justify-center gap-2"
          >
            <Music2 className="h-5 w-5" />
            Join as Player
          </button>
        </form>
      </div>

      {/* Footer Text */}
      <p className="mt-8 text-sm text-gray-400">
        Ready to play? Join the band and start jamming
      </p>
    </div>
  );
};

export default SignupUser;