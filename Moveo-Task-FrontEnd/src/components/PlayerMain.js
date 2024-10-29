import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Music2, Radio, Wifi, WifiOff } from 'lucide-react';
import socket from '../socket';
import DisconnectButton from './DisconnectButton';

const MainPlayer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, instrument } = location.state || {};
  const [message, setMessage] = useState('Connecting...');
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (role && instrument) {
      localStorage.setItem('playerRole', role);
      localStorage.setItem('playerInstrument', instrument);
    }

    const ensureConnection = () => {
      if (!socket.connected) {
        socket.connect();
      }
      if (socket.connected && role && instrument) {
        socket.emit('registerPlayer', { role, instrument });
      }
    };

    const connectionInterval = setInterval(ensureConnection, 2000);

    const handleConnect = () => {
      console.log('Connected with socket ID:', socket.id);
      setIsConnected(true);
      setMessage('Waiting for the next song...');

      if (role && instrument) {
        socket.emit('registerPlayer', { role, instrument });
      }
    };

    const handleDisconnect = () => {
      console.log('Disconnected, attempting to reconnect...');
      setIsConnected(false);
      setMessage('Reconnecting...');
      socket.connect();
    };

    const handleSongSelected = (data) => {
      console.log('Song selected:', data);
      if (data?.fileName) {
        navigate('/live', { 
          state: { 
            fileName: data.fileName, 
            songName: data.songName, 
            artist: data.artist, 
            role, 
            instrument 
          }
        });
      }
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('song-selected', handleSongSelected);

    ensureConnection();

    return () => {
      clearInterval(connectionInterval);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('song-selected', handleSongSelected);
    };
  }, [instrument, navigate, role]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Music2 className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">Music Player Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Instrument: <span className="text-blue-400">{instrument}</span>
            </span>
            <DisconnectButton />
          </div>
        </div>

        {/* Status Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Live Session Status
          </h2>
          
          <div className={`bg-gray-800 border ${isConnected ? 'border-green-500' : 'border-red-500'} rounded-lg p-6 mb-6`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              {isConnected ? (
                <Wifi className="h-8 w-8 text-green-500" />
              ) : (
                <WifiOff className="h-8 w-8 text-red-500" />
              )}
              <h3 className="text-xl font-semibold">
                {isConnected ? 'Connected' : 'Connecting...'}
              </h3>
            </div>
            <p className="text-lg text-gray-300 mb-2">{message}</p>
            <p className="text-sm text-gray-400">Socket ID: {socket.id || 'Establishing...'}</p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Live Updates</h3>
            <p className="text-gray-400">Receive real-time song selections from the admin</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Auto-Reconnect</h3>
            <p className="text-gray-400">Automatic connection recovery if disconnected</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Session Info</h3>
            <p className="text-gray-400">View your current session details and status</p>
          </div>
        </div>

        {/* Connection Status Indicator */}
        <div className="fixed bottom-4 right-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            <Radio className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-medium">
              {isConnected ? 'Live' : 'Connecting...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPlayer;