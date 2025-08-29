const ApiKey = require("./middleware/apiKeyMiddleware")
const app = require("express")()
const cors = require('cors') // Added CORS import - critical for fixing browser errors
const bodyParser = require("body-parser")
const mangaRouter = require("./routes/mangaRouter")
const mangaListRouter = require("./routes/mangaListRouter")
const mangaSearch = require("./routes/mangaSearch")

// CRITICAL FIX: CORS middleware must be added IMMEDIATELY after creating the express app
// and BEFORE any other middleware or routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(bodyParser.json())
require('dotenv').config()

// ✅ Default welcome route
app.get("/", (req, res) => {
    res.send("📚 Welcome to MangaHook API — try /api/mangaList, /api/manga, or /api/search")
})

app.use(ApiKey)
app.use("/api/manga", mangaRouter)
app.use("/api/mangaList", mangaListRouter)
app.use("/api/search", mangaSearch)

const port = process.env.PORT || 10000
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port} 🎉✨`)
})
