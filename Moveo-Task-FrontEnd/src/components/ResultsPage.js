import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Music2, Image as ImageIcon, Play } from 'lucide-react';
import DisconnectButton from './DisconnectButton';
import socket from '../socket';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, role, instrument } = location.state || { results: [], userRole: '', instrument: '' };

  const handleSelect = async (song) => {
    const { fileName, songName, artist } = song;
    socket.emit('song-selected', { fileName, songName, artist });
    navigate('/live', { state: { fileName, songName, artist, role, instrument } });
  };

  const handleBackToAdminMain = () => {
    navigate('/adminMain', { state: { role, instrument } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Music2 className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">Search Results</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Instrument: <span className="text-blue-400">{instrument}</span>
            </span>
            <DisconnectButton />
          </div>
        </div>

        {/* Back Button */}
        <button 
          onClick={handleBackToAdminMain}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg
                    hover:bg-gray-700 transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </button>

        {/* Results Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Song Name</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Artist</th>
                    <th className="px-6 py-4 text-center text-gray-300 font-semibold">Image</th>
                    <th className="px-6 py-4 text-right text-gray-300 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr 
                      key={index} 
                      className="border-t border-gray-700 hover:bg-gray-750 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{result.songName}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {result.artist || 'Unknown'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {result.image ? (
                            <img 
                              src={result.image} 
                              alt={result.songName} 
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-500" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleSelect(result)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg
                                    hover:bg-blue-600 transition-colors duration-200"
                        >
                          <Play className="h-4 w-4" />
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Music2 className="h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Results Found</h3>
              <p className="text-gray-500">Try adjusting your search terms or try a different query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;