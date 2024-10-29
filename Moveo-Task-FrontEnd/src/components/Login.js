import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Music2, LogIn } from 'lucide-react';
import BackToHomepageButton from './BackToHomepageButton';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password });
      const { role, instrument } = response.data;

      if (role === 'admin') {
        navigate('/adminMain', { state: { role, instrument } });
      } else if (role === 'player') {
        navigate('/MainPlayer', { state: { role, instrument } });
      }
    } catch (error) {
      alert('Username or password is incorrect. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <BackToHomepageButton />
        
        <div className="max-w-md mx-auto">
          {/* Logo and Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Music2 className="h-12 w-12 text-blue-400" />
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                JaMoveo
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Login to your account
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg
                            text-white placeholder-gray-400
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            transition duration-200"
                  placeholder="Enter your username"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg
                              text-white placeholder-gray-400
                              focus:ring-2 focus:ring-blue-500 focus:border-transparent
                              transition duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center
                              text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 
                          px-4 py-3 bg-blue-600 hover:bg-blue-700
                          text-white font-medium rounded-lg
                          transition duration-200
                          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                          focus:ring-offset-gray-800
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogIn className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} />
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>

          {/* Help Text */}
          <p className="mt-6 text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;