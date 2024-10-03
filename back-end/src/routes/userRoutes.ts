import { Request, Response, NextFunction, Router } from 'express';
import authMiddleware from '../middleware/auth';
import { LoginController, LogoutController, RefreshSessionToken } from '../controllers/authController';
import { CreateUserController } from '../controllers/userControllers';
import { RequestJwt } from '../@types/express';
import { LoginPayload, RegisterPayload } from '../models/SessionTypes';
import { AuthResponse } from '../@types/http';

const router = Router();

// user register route
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const newUser: AuthResponse = await CreateUserController(req, res);
    res.status(201).json(newUser); // Successfully created

  } catch (error) {
    console.error('Signup error:', error);

    res.status(500).json({ message: 'Internal server error' });
  }
});

// user login / logout routes
router.post('/signin', async (req: Request, res: Response) => {
  try {
    const userResponse = await LoginController(req, res);
    res.status(200).json(userResponse);

  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: 'Invalid credentials.' });
  }
});

router.post('/signout', async (req: Request, res: Response) => {
  const signout = await LogoutController(req, res);

  res.status(200).json(signout);
});

router.get('/refresh', 
  (req: RequestJwt, res: Response, next: NextFunction) => {
    // refresh tokens sent to controller;
    req.tokenRefresh = req.headers['authorization']?.split(' ')[1];

    authMiddleware(req, res, next)
  }, 
  async (req: RequestJwt, res: Response) => {
    try {
      const response = await RefreshSessionToken(req, res)
      res.status(200).json(response);
      
    } catch (error) {
      res.status(401).json({ message: 'Invalid session.' });
    }
  }
)

export default router;