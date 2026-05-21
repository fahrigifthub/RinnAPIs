const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const scrapersDir = path.join(__dirname, 'scrapers');
const apiList = [];

// Membaca semua file di dalam folder 'scrapers' secara otomatis
fs.readdirSync(scrapersDir).forEach(file => {
    if (file.endsWith('.js')) {
        const scraper = require(path.join(scrapersDir, file));
        
        // Mendaftarkan endpoint ke dalam Express
        app.get(scraper.endpoint, scraper.handler);
        
        // Menyimpan informasi API untuk dikirim ke frontend (Website)
        apiList.push({
            name: scraper.name,
            description: scraper.description,
            endpoint: scraper.endpoint,
            params: scraper.params,
            type: scraper.type || "Lainnya" // <-- Tambahkan baris ini
        });
        
        console.log(`[RinnAPIs] Berhasil memuat: ${scraper.endpoint}`);
    }
});

// Endpoint khusus untuk menyuplai data ke tampilan website
app.get('/api/list', (req, res) => {
    res.json(apiList);
});

app.listen(PORT, () => {
    console.log(`🚀 RinnAPIs berjalan di http://localhost:${PORT}`);
});
