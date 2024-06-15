import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to mongoDB!');
}).catch((err) => {
    console.log(err);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000 !!');
});
