import { User } from "@prisma/client";
import { UserModel } from "../models/User";
import bcryptAsync from "../config/bcrypt";


export async function createUserController(registerData: Omit<User, "id">) : Promise<User> {
  const { email, password} = registerData;
  
  if (!email?.length) {
    throw new Error("Could not add user - Invalid email");

  } else if (!password?.length) {
    throw new Error("Could not add user - Invalid password");
  }

  const user = await UserModel.getUser({ email });

  if (user) {
    throw new Error("Could not add user - Email already registered");
  }

  const hashedPwd = await bcryptAsync.hash(password);

  try {
    const newUser = await UserModel.createUser({
      ...registerData,
      password: hashedPwd
    });

    if (newUser) return newUser;
    throw new Error("Could not add user - fail to register user");
    
  } catch (error) {
    throw new Error("Could not add user - fail to register user");
  }
};

export function getUser() {

};

export function deleteUser() {

};

export function loginUser() {

};

export function logoutUser() {

};

export function sessionUser() {

};