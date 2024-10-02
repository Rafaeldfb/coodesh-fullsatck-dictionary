import prisma from '../config/prisma';
import { Session } from '@prisma/client';
import bcryptAsync from '../config/bcrypt';

export default class SessionModel {
  static async getSession(userId?: string, sessionId?: string): Promise<Session | null> {
    if (!userId && !sessionId) {
      throw new Error("Invalid session parameters");
    };

    const filter = userId?.length 
      ? {loggerId: userId} 
      : {id: sessionId};
    
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

  static async setSession(userId: string, state: boolean) : Promise<Session> {
    let session: Session;

    if (state) { // creates a new session
      const newSession: Omit<Session, "id" | "createdAt" > = {
        loggerId: userId,
        token: await bcryptAsync.hash(userId)
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
        where: { loggerId: userId },
      });

    } catch (error) {
      throw new Error(`Session - Could not remove session \nReason: ${error.message}`);
    }

    return session;
  }
}