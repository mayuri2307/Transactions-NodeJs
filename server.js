import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"
import userRoutes from "./routes/user.js"
import transactionRoutes from "./routes/transaction.js"
import statRoutes from "./routes/stats.js"

dotenv.config()
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use("/user", userRoutes)
app.use("/transactions", transactionRoutes)
app.use("/stats", statRoutes)

mongoose.connect(process.env.URL).then(()=>{
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT)
})
.catch((err) => console.log(err))