import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const BackToHomepageButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed top-4 left-4 z-10">
      <button 
        onClick={() => navigate('/')} 
        className="group flex items-center gap-2 px-4 py-2.5 
                  bg-gray-800 hover:bg-gray-700 
                  text-gray-300 hover:text-blue-400
                  rounded-lg border border-gray-700
                  shadow-lg transition-all duration-200
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <Home className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </button>
    </div>
  );
};

export default BackToHomepageButton;