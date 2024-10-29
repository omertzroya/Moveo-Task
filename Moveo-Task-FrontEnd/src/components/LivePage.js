import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import socket from '../socket';
import { Music2, Pause, Play, XCircle } from 'lucide-react';

const isHebrew = (text) => /[\u0590-\u05FF]/.test(text);

const LivePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lyricsAndChords, setLyricsAndChords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textDirection, setTextDirection] = useState('ltr');
  const [scrolling, setScrolling] = useState(false);
  const containerRef = useRef(null);

  const { fileName, songName, artist, role, instrument } = location.state || {};

  useEffect(() => {
    const fetchLyricsAndChords = async () => {
      if (fileName) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/songs/songs/${fileName}/lyrics`);
          const lyricsData = response.data;

          if (lyricsData.length > 0 && lyricsData[0].length > 0) {
            const firstLine = lyricsData[0][0].lyrics;
            setTextDirection(isHebrew(firstLine) ? 'rtl' : 'ltr');
          }

          setLyricsAndChords(lyricsData);
        } catch (error) {
          console.error('Error fetching lyrics and chords:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLyricsAndChords();
  }, [fileName]);

  useEffect(() => {
    let intervalId;
    if (scrolling && containerRef.current) {
      intervalId = setInterval(() => {
        containerRef.current.scrollTop += 1;
      }, 50);
    }
    return () => clearInterval(intervalId);
  }, [scrolling]);

  useEffect(() => {
    const handleAdminQuit = () => {
      console.log("Admin quit detected");
      if (role === 'admin') {
        navigate('/adminMain', { state: { role, instrument } });
      } else {
        navigate('/playerMain', { state: { role, instrument } });
      }
    };

    socket.on('adminQuit', handleAdminQuit);

    return () => {
      socket.off('adminQuit', handleAdminQuit);
    };
  }, [navigate, role, instrument]);

  const handleScrollToggle = () => {
    setScrolling(!scrolling);
  };

  const handleQuit = () => {
    socket.emit('adminQuit');
    console.log("Sent adminQuit event");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Music2 className="h-8 w-8 text-blue-400 animate-pulse" />
          <span className="text-xl text-gray-300">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 p-4 border-b border-gray-700">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music2 className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              {songName || 'Unknown Title'} 
              <span className="text-gray-400 ml-2">by</span>
              <span className="text-blue-400 ml-2">{artist || 'Unknown Artist'}</span>
            </h2>
          </div>
          <div className="text-gray-400">
            Playing as: <span className="text-blue-400">{instrument}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        ref={containerRef}
        className={`container mx-auto px-4 py-8 overflow-y-auto h-[calc(100vh-80px)] 
                   ${textDirection === 'rtl' ? 'rtl' : 'ltr'}`}
      >
        {lyricsAndChords.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            {lyricsAndChords.map((section, sectionIndex) => (
              <div 
                key={sectionIndex} 
                className="mb-8 flex items-end justify-center flex-wrap gap-4 
                          bg-gray-800/50 rounded-lg p-6 border border-gray-700"
              >
                {section.map((word, wordIndex) => (
                  <div 
                    key={wordIndex} 
                    className="p-2 whitespace-pre-wrap break-words"
                  >
                    {word.chords && instrument !== 'Vocals' && (
                      <div className="text-blue-400 text-lg mb-1 font-mono">
                        {word.chords}
                      </div>
                    )}
                    <p className="text-xl text-gray-200">{word.lyrics}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-12">
            No lyrics and chords available.
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-4">
        <button
          onClick={handleScrollToggle}
          className="group flex items-center gap-2 px-4 py-2.5 
                    bg-gray-800 hover:bg-gray-700
                    text-gray-300 hover:text-blue-400
                    rounded-lg border border-gray-700
                    shadow-lg transition-all duration-200
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {scrolling ? (
            <>
              <Pause className="w-5 h-5" />
              <span>Stop Scrolling</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>Start Scrolling</span>
            </>
          )}
        </button>

        {role === 'admin' && (
          <button
            onClick={handleQuit}
            className="group flex items-center gap-2 px-4 py-2.5 
                      bg-gray-800 hover:bg-red-900/50
                      text-gray-300 hover:text-red-400
                      rounded-lg border border-gray-700
                      shadow-lg transition-all duration-200
                      focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <XCircle className="w-5 h-5" />
            <span>End Session</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LivePage;