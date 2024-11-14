import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/data/db';
import authRoutes from './src/routes/authRoutes';
import missilesRoutes from './src/routes/missilesRoutes';
import { initializeSocketServer } from './socketServer';
import { createServer } from 'http';




dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);

const io = initializeSocketServer(httpServer);
connectDB();


app.use('/api/', authRoutes);
app.use('/api/', missilesRoutes);



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


