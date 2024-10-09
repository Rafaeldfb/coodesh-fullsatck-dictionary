import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import entriesRoutes from './routes/entriesRoutes';
import userProfileRoutes from './routes/userProfileRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://127.0.0.1:3000',
}));

// Middleware para analisar JSON
app.use(express.json());

// BASE route handlers
app.get('/', (req, res) => {
  res.send({
    "message": "Fullstack Challenge 🏅 - Dictionary",
  })
});

// AUTH
app.use('/auth', userRoutes);

// Words entries routes
app.use('/entries', entriesRoutes);

// User' Profile routes
app.use('/user', userProfileRoutes);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});