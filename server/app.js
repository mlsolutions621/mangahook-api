const ApiKey = require("./middleware/apiKeyMiddleware")
const app = require("express")()
const bodyParser = require("body-parser")
const mangaRouter = require("./routes/mangaRouter")
const mangaListRouter = require("./routes/mangaListRouter")
const mangaSearch = require("./routes/mangaSearch")

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

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT} 🎉✨`)
})
