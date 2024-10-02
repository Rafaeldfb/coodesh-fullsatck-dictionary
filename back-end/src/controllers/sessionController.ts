import { Session } from "@prisma/client";
import SessionModel from "../models/Session";
import UserModel from "../models/User";
import { LoginPayload, SessionCredentials } from "../models/SessionTypes";

export async function LoginController(loginPayload: LoginPayload) : Promise<Session> {
  const user = await UserModel.getUserByEmail(loginPayload.email)
    .catch(error => {
      throw new Error("Login failed - User not registered");
    });

  const session = await SessionModel.getSession({ loggerId: user.id })
    .catch(error => {
      throw new Error(`Login failed - Reason: ${error.message}`)
    });

  if (session) return session

  const newSession = await SessionModel.setSession({ loggerId: user.id }, true)
    .catch(error => {
      throw new Error(`Login failed - Reason: ${error.message}`)
    });

  return newSession;
};

export async function LogoutController(logoutPayload: SessionCredentials): Promise<Session | SessionCredentials> {
  const { loggerId, token } = logoutPayload;

  if (!loggerId && !token) {
    throw new Error(`Logout failed - invalid arguments`);
  }

  const session = await SessionModel.getSession(logoutPayload)
    .catch(error => {
      throw new Error(`Logout failed - Reason: ${error.message}`)
    });
  
  if (session) {
    const sessionDone = await SessionModel.setSession(logoutPayload, false);
    
    return sessionDone;
  }

  // No session found, return credentials to be cleared where possible.
  return logoutPayload;
};

export async function GetUsersSession(credentials: SessionCredentials) : Promise<Session | null> {
  const session = await SessionModel.getSession(credentials)
    .catch(error => {
      throw new Error(`Fail to get Session - Reason: ${error.message}`)
    });
  
  return session;
};