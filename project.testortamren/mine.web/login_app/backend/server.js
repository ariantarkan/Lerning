
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';

const app=express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/loginapp');
app.use('/', authRouter);
app.listen(5000,()=>console.log('Running 5000'));
