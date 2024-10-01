import { Router, Request, Response } from 'express';

const router = Router();

// Exemplo de rota GET
router.get('/users', (req: Request, res: Response) => {
  res.send('Hello from users API - GET');
});

// Exemplo de rota POST
router.post('/users', (req: Request, res: Response) => {
  res.send('Hello from users API - POST');
});

export default router;
