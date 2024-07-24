import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import usersRouter from './routes/usersRouter.js';

const app = express();
dotenv.config();

const addMiddleWares = () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

const startServer = () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(` Server is runnig on port: ${port}`);
  });
};

const loadRoutes = () => {
  app.use('/blogit/users', usersRouter);
};

const connectingWithMongoDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_DB);
    if (res) {
      console.log('Connection with MongoDB established!'.bgBlue);
    }
  } catch (error) {
    console.log('Connection failed!'.bgRed);
  }
};

(async function controller() {
  await connectingWithMongoDB();
  addMiddleWares();
  loadRoutes();
  startServer();
})();
