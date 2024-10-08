import UserModel from "../models/User";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { LoginPayload } from "../models/SessionTypes"; 
import { Request, Response } from "express";
import { AuthResponse, LogoutResponse } from "../@types/http";
import bcryptAsync from "../config/bcrypt";
import JwtService from "../services/jwtServices";
import { TokenUserData } from "../@types/jwt";
import { RequestJwt } from "../@types/express";

dotenv.config();

export async function LoginController(req: Request, res: Response): Promise<AuthResponse> {
  const loginPayload = req.body as LoginPayload;

  const user = await UserModel.getUserByEmail(loginPayload.email)
    .catch(error => {
      throw new Error("User not registered");
    });

  const isPasswordValid = await bcryptAsync.compare(loginPayload.email, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Create Session Jwt
  const tokenData: TokenUserData = { email: loginPayload.email };
  const token = JwtService.createAccessToken(tokenData)

  return {
    id: user.id,
    name: user.name,
    token: token.token,
  } as AuthResponse;
}

export async function LogoutController(req: Request, res: Response): Promise<LogoutResponse> {
  return {
    id: null,
    name: null,
    token: null,
    refreshToken: null,
  };
}

export async function RefreshSessionToken(req: RequestJwt, res: Response): Promise<AuthResponse> {
  const refresh = req?.tokenRefresh;
  
  if (!refresh) {
    throw new Error("Session expired");
  }

  const userData = JwtService.verifyToken(refresh, 'refresh');

  if (!userData) {
    throw new Error("Session expired");
  }

  const newTokens = JwtService.refreshToken(refresh)
  if (!newTokens) {
    throw new Error("Internal Error");
  }

  const user = await UserModel.getUserByEmail(userData.email)
    .catch(error => {
      throw new Error("User not registered");
    });

  return {
    id: user.id,
    name: user.name,
    token: newTokens.accessToken.token,
    refreshToken: newTokens.refreshToken.token
  } as AuthResponse;
}

// Old method from sessionControllers had a method called
// GetUsersSession(credentials: SessionCredentials) : Promise<Session | null>
// Should I do the same for jwt?