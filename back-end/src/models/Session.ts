import prisma from '../config/prisma';
import { Session } from '@prisma/client';
import bcryptAsync from '../config/bcrypt';
import { SessionCredentials } from './SessionTypes';

export default class SessionModel {
  static async getSession(credentials: SessionCredentials): Promise<Session | null> {
    const { loggerId, token } = credentials;

    if (!loggerId && !token) {
      throw new Error("Invalid session parameters");
    };

    const filter = loggerId?.length 
      ? {loggerId: loggerId} 
      : {id: token};
    
    try {
      const session = await prisma.session.findUnique({
        where: filter
      });

      if (session) return session;
      
    } catch (error) {
      throw new Error("Fail to get session");
    }

    return null;
  }

  static async setSession(credentials: SessionCredentials, state: boolean) : Promise<Session> {
    const { loggerId } = credentials;
    let session: Session;

    // State true means to create a new session.
    if (state && loggerId) { // creates a new session
      const newSession: Omit<Session, "id" | "createdAt" > = {
        loggerId,
        token: await bcryptAsync.hash(
          `${Date.now()}&${loggerId}`
        )
      };

      try {
        session = await prisma.session.create({
          data: newSession
        });

      } catch (error) {
        throw new Error(`Session - Could not create session \nReason: ${error.message}`);  
      }
    };

    // Remove active session
    try {
      session =  await prisma.session.delete({
        where: { ...credentials },
      });

    } catch (error) {
      throw new Error(`Session - Could not remove session \nReason: ${error.message}`);
    }

    return session;
  }
}