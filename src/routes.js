const express = require('express');
const tiktokLogic = require('./tiktok');

const router = express.Router();

// Endpoint utama untuk TikTok
router.get('/api/tiktok', tiktokLogic);

// Endpoint sekadar untuk ngecek API hidup atau nggak
router.get('/', (req, res) => {
  res.json({ message: "API Downloader aktif bre!" });
});

module.exports = router;
