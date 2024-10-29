const express = require('express');
const fs = require('fs');
const path = require('path');
const songMapping = require('../utils/songMapping'); 

const router = express.Router();

// Search Songs
router.get('/search', async (req, res) => {
  const { query } = req.query;
  const lowerQuery = query.toLowerCase();

  try {
    const songFiles = fs.readdirSync(path.join(__dirname, '../data'));

    const results = songFiles
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const content = JSON.parse(fs.readFileSync(path.join(__dirname, '../data', file), 'utf-8'));
        const { songName, artist, image } = songMapping[file] || {};

        // Flatten lyrics to search
        const lyrics = content.flat().map(line => line.lyrics.toLowerCase()).join(' ');

        if (lyrics.includes(lowerQuery)) {
          return {
            songName,
            artist,
            image,
            fileName: file 
          };
        }
        return null;
      })
      .filter(result => result !== null);

    res.json(results);
  } catch (error) {
    console.error('Error searching songs:', error);
    res.status(500).json({ error: 'Error searching songs' });
  }
});

// Get Lyrics and Chords for a Song
router.get('/songs/:songName/lyrics', async (req, res) => {
  const { songName } = req.params;
  const filePath = path.join(__dirname, '../data', songName);

  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      res.json(JSON.parse(content));
    } else {
      res.status(404).json({ error: 'Song not found' });
    }
  } catch (error) {
    console.error('Error fetching lyrics and chords:', error);
    res.status(500).json({ error: 'Error fetching lyrics and chords' });
  }
});

module.exports = router;