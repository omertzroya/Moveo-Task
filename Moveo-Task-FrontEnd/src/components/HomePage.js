import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, User, LogIn, Music2 } from 'lucide-react';

const Homepage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo and Header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Music2 className="h-12 w-12 text-blue-400" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              JaMoveo
            </h1>
          </div>
          
          <p className="text-xl text-gray-300 mb-12">
            Welcome to JaMoveo web app, please select your desired action:
          </p>

          {/* Buttons Container */}
          <div className="grid gap-4 max-w-md mx-auto">
            <button
              onClick={() => handleNavigate('/signup-admin')}
              className="group flex items-center justify-center gap-3 px-6 py-4
                        bg-gray-800 hover:bg-gray-700
                        border border-gray-700 rounded-lg
                        transition-all duration-200
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <UserPlus className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">Signup as Admin</span>
            </button>

            <button
              onClick={() => handleNavigate('/signup-user')}
              className="group flex items-center justify-center gap-3 px-6 py-4
                        bg-gray-800 hover:bg-gray-700
                        border border-gray-700 rounded-lg
                        transition-all duration-200
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <User className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">Signup as User</span>
            </button>

            <button
              onClick={() => handleNavigate('/login')}
              className="group flex items-center justify-center gap-3 px-6 py-4
                        bg-gray-800 hover:bg-gray-700
                        border border-gray-700 rounded-lg
                        transition-all duration-200
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <LogIn className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">Login</span>
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">Easy Access</h3>
              <p className="text-gray-400">Quick login and signup options for all users</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">Admin Tools</h3>
              <p className="text-gray-400">Powerful management features for administrators</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">User Experience</h3>
              <p className="text-gray-400">Seamless interaction for regular users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;