import prisma from '../config/prisma';
import { User } from '@prisma/client';

export default class UserModel {
  static async createUser(data: Omit<User, 'id'>): Promise<User> {
    const newUser = await prisma.user.create({
      data: data
    })
    
    return newUser
  };

  static async getUserByEmail(email: string): Promise<User> {
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

  static async deleteUser(id: string) : Promise<string> {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: id },
        select: { id: true },
      })

      if (deletedUser?.id) return deletedUser?.id;
      throw new Error("Fail to delete user");

    } catch (error) {
      throw new Error("Fail to delete user");
    }
  }
}
