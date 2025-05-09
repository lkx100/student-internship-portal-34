import express from "express"
import dotenv from "dotenv"
import path from "path"

const app = express()
dotenv.config() // Load the .env variables

const inProduction = process.env.NODE_ENV == 'production'

const __dirname = path.resolve() // BASE_DIR

const SERVER_PORT = 5000 // Port of the server

// This will run only in production
if (inProduction) {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(SERVER_PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${SERVER_PORT}`)
})
