import { Request, Response } from "express";
import UserModel from "../models/User";
import { CreateUserService} from "../services/userServices";
import { PublicUser } from "../models/UserTypes";
import { RegisterPayload } from "../models/SessionTypes"
import { removeUserPwdHash } from "../helpers/userHelper";
import { AuthResponse } from "../@types/http";

export async function CreateUserController(req: Request, res: Response) : Promise<AuthResponse> {
  const registerPayload = req.body as RegisterPayload;

  const response = await CreateUserService(registerPayload)
    .catch(err => {
      throw new Error(`Could not add user - ${err.message}`);
    });

  return response;
};

export async function GetUserByIdController(id: string): Promise<PublicUser> {
  try {
    const user = await UserModel.getUserById(id)
      .then((user) => removeUserPwdHash(user));
    
    if (user) return user;
    throw new Error("User not found");

  } catch {
    throw new Error(`Fail to get user`);
  }
};

export async function GetUserController(id?: string, email?: string) : Promise<PublicUser> {
  if (id?.length) return GetUserByIdController(id);

  else if (email?.length) {
    try {
      const user = await UserModel.getUserByEmail(email)
        .then((user) => removeUserPwdHash(user));
      
      if (user) return user;
      throw new Error("User not found");

    } catch {
      throw new Error(`Fail to get user`);
    }
  };

  throw new Error(`Invalid user identifiers`);
};

export async function DeleteUserController(id: string) : Promise<string> {
  try {
    const user = await UserModel.getUserById(id);

    if (!user) throw new Error("Fail to remove user - User not found");
  
    const deletedUserId = await UserModel.deleteUser(id)

    return deletedUserId;

  } catch {
    throw new Error("Internal error");
  }
};

