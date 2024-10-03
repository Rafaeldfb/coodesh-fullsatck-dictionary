import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para analisar JSON
app.use(express.json());

// BASE route handlers
app.get('/', (req, res) => {
  res.send({
    "message": "Fullstack Challenge 🏅 - Dictionary",
  })
});

// AUTH
app.use('/auth', userRoutes)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});