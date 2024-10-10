import jwt from 'jsonwebtoken';
import { AccessToken, TokenType, TokenUserData } from '../@types/jwt';
import dotenv from 'dotenv';

dotenv.config();

export default class JwtService {
  static createAccessToken(credentials: TokenUserData): AccessToken {
    const accessToken = jwt.sign(
      credentials, 
      process.env.JWT_SECRET as string, 
      { expiresIn: process.env.JWT_EXPIRES_IN as string }
    );

    return { token: accessToken }
  
  }

  static createRefreshToken(credentials: TokenUserData): AccessToken {
    const refreshToken = jwt.sign(
      credentials, 
      process.env.REFRESH_TOKEN_SECRET as string, 
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string }
    );

    return { token: refreshToken }
  }


  static verifyToken(token: string, type: TokenType): TokenUserData | null {
    try {
      const secret = type === 'access' 
        ? process.env.JWT_SECRET 
        : process.env.REFRESH_TOKEN_SECRET;

      if (!secret) {
        throw new Error('Secret not defined');
      }

      const verifiedData = jwt.verify(token, secret as string);
      return verifiedData as TokenUserData; // Cast to the appropriate type

    } catch (error) {
      console.error('Token verification failed:', error);
      return null; // Return null if verification fails
    }
  }

  static refreshToken(oldRefreshToken: string): { 
    accessToken: AccessToken; 
    refreshToken: AccessToken 
  } | null {
    const userData = this.verifyToken(oldRefreshToken, 'refresh');
    
    if (!userData) return null; // Invalid refresh token

    const newAccessToken = this.createAccessToken(userData);
    const newRefreshToken = this.createRefreshToken(userData);
    
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  }
}
