import prisma from '../config/prisma';
import { User, Session } from '@prisma/client';
import bcryptAsync from '../config/bcrypt';

export class UserModel {
  static async createUser(data: Omit<User, 'id'>): Promise<User> {
    const newUser = await prisma.user.create({
      data: data
    })
    
    return newUser
  };

  static async getUser(user: Partial<User>): Promise<User> {
    const { email, id } = user;

    if (id?.length) return this.getUserById(id);

    try {
      const userByEmail = await prisma.user.findUnique({
        where: { email }
      });
  
      if (userByEmail) return userByEmail
      throw new Error(`User not found`);

    } catch (error) {
      throw new Error(`User not found`);
    }
  }

  static async getUserById(id: string) : Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
      });

      if (user) return user;
      throw new Error("User not found");
    } catch (error) {
      throw new Error("User not found");
    }
  }

  static async deleteUser(id: string) : Promise<string | null> {
    try {
      const user = await this.getUserById(id);

      if (!Object.keys(user)) return null;

      const deletedUser = await prisma.user.delete({
        where: { id: id },
        select: { id: true },
      })

      if (deletedUser?.id) {
        await this.setSession(deletedUser.id, false)
        
        return deletedUser?.id
      }

      return  null;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async setSession(userId: string, state: boolean) : Promise<Session | null> {
    if (state) { // creates a new session
      const newSession: Omit<Session, "id" | "createdAt" > = {
        loggerId: userId,
        token: await bcryptAsync.hash(userId)
      };

      try {
        const session = await prisma.session.create({
          data: newSession
        });
  
        return session;

      } catch (error) {
        throw new Error(`DB.setSession - Could not create session \nReason: ${error.message}`);  
      }
    };

    // Remove active session
    try {
      await prisma.session.delete({
        where: { loggerId: userId },
      });

    } catch (error) {
      throw new Error(`DB.setSession - Could not remove session \nReason: ${error.message}`);
    }
    
    return null;
  }
}
