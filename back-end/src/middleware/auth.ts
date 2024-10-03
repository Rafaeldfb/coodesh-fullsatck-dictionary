import { Response, NextFunction } from 'express';
import { RequestJwt } from '../@types/express';
import JwtService from '../services/jwtServices';
import { TokenUserData } from '../@types/jwt';

export default function authMiddleware(req: RequestJwt, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
  const refreshToken = req?.tokenRefresh;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const userData = JwtService.verifyToken(token, 'access'); // Use the verifyToken method

  if (!userData && !refreshToken) {
    return res.status(400).json({ message: 'Invalid token.' });
  }

  req.user = !refreshToken 
    ? userData as TokenUserData
    : undefined; // Save user data decoded in request
  
  next();
}
