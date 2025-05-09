import express from "express"
import dotenv from "dotenv"
import path from "path"
import cors from 'cors'
import mongoose from 'mongoose'
import internshipRoutes from './routes/internshipRoutes.js'

const app = express()
dotenv.config()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/internships', internshipRoutes)

const inProduction = process.env.NODE_ENV == 'production'
const __dirname = path.resolve()
const SERVER_PORT = 5000

// Database connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

// This will run only in production
if (inProduction) {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(SERVER_PORT, () => {
    connectDB()
    console.log(`Server started at http://localhost:${SERVER_PORT}`)
})
