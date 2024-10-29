import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Music2, LogOut } from 'lucide-react';
import DisconnectButton from './DisconnectButton';

const AdminMain = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { role, instrument } = location.state;

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/songs/search?query=${searchQuery}`);
      const results = response.data;

      if (results.length === 0) {
        alert('No results found. Please try a different search.');
      } else {
        navigate('/results', { state: { results, role, instrument} });
      }
    } catch (error) {
      console.error('Search failed:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Music2 className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">Music Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Instrument: <span className="text-blue-400">{instrument}</span>
            </span>
            <DisconnectButton />
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Search Any Song
          </h2>
          
          <div className="relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter song name or lyrics..."
                className="w-full px-6 py-4 text-lg bg-gray-800 border border-gray-700 rounded-lg 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          placeholder-gray-500 text-white transition-all duration-200
                          pr-12"
                disabled={isSearching}
              />
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-2 p-2 text-gray-400 hover:text-blue-400 
                          disabled:text-gray-600 disabled:cursor-not-allowed
                          transition-colors duration-200"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Helper Text */}
          <p className="mt-4 text-gray-400 text-sm">
            Search by song title, artist name, or lyrics
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Quick Search</h3>
            <p className="text-gray-400">Find songs instantly with our powerful search engine</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Live Session</h3>
            <p className="text-gray-400">Start a live session with your band members</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Song Management</h3>
            <p className="text-gray-400">Manage your song library with ease</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMain;