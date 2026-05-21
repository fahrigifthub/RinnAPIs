const yt = require("@vreden/youtube_scraper");

module.exports = {
    name: "YouTube Search",
    description: "Mencari video di YouTube berdasarkan kata kunci (query).",
    endpoint: "/api/yt-search",
    params: ["query"], // Parameter yang dibutuhkan dari URL
    type: "Search", // Masuk ke kategori "Search" di Sidebar
    
    handler: async (req, res) => {
        const query = req.query.query;

        // Validasi jika parameter query tidak dikirim
        if (!query) {
            return res.status(400).json({ 
                status: false, 
                code: 400,
                msg: "Parameter 'query' wajib diisi",
                result: []
            });
        }

        try {
            // Menjalankan pencarian menggunakan modul dari vreden
            const result = await yt.search(query);
            
            return res.status(200).json({
                status: true,
                code: 200,
                query: query,
                result: result
            });
        } catch (error) {
            // Menangkap error jika pencarian gagal
            return res.status(500).json({ 
                status: false,
                code: 500,
                query: query,
                result: [],
                error: String(error?.message || error)
            });
        }
    }
};
