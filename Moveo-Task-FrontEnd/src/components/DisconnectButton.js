import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import socket from '../socket';

const DisconnectButton = () => {
  const navigate = useNavigate();

  const handleDisconnect = () => {
    socket.disconnect();
    navigate('/');
  };

  return (
    <button
      onClick={handleDisconnect}
      className="group flex items-center gap-2 px-4 py-2 
                bg-gray-800 hover:bg-red-900/50
                text-gray-300 hover:text-red-400
                rounded-lg border border-gray-700
                shadow-lg transition-all duration-200
                focus:ring-2 focus:ring-red-500 focus:border-transparent"
    >
      <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      <span className="font-medium">Disconnect</span>
    </button>
  );
};

export default DisconnectButton;