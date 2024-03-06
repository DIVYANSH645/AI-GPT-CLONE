import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
// routes path
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';
import openaiRoutes from './routes/openaiRoutes.js';
dotenv.config(); // Load environment variables first

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", openaiRoutes);


app.get("/", (req, res) => {
    res.send("<h1>Hi!</h1>")
});
connectDB();

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
