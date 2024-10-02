import UserModel from "../models/User";
import SessionModel from "../models/Session";
import { LoginUser, PublicUser } from "../models/UserTypes";
import bcryptAsync from "../config/bcrypt";
import { removeUserPwdHash } from "../helpers/userHelper";

export async function CreateUserController(registerData: LoginUser) : Promise<PublicUser> {
  const { email, password} = registerData;
  
  if (!email?.length) {
    throw new Error("Could not add user - Invalid email");

  } else if (!password?.length) {
    throw new Error("Could not add user - Invalid password");
  }

  const user = await UserModel.getUserByEmail(email);

  if (user) {
    throw new Error("Could not add user - Email already registered");
  }

  const hashedPwd = await bcryptAsync.hash(password);

  try {
    const newUser = await UserModel.createUser({
      ...registerData,
      passwordHash: hashedPwd
    })
      .then((user) => removeUserPwdHash(user));

    if (newUser) return newUser;
    throw new Error("Could not add user - fail to register user");
    
  } catch (error) {
    throw new Error("Could not add user - fail to register user");
  }
};

export async function GetUserByIdController(id: string): Promise<PublicUser> {
  try {
    const user = await UserModel.getUserById(id)
    .then((user) => removeUserPwdHash(user));
    
    if (user) return user;
    throw new Error("User not found");

  } catch (error) {
    throw new Error(`Fail to get user - reason: ${error?.message}`);
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

    } catch (error) {
      throw new Error(`Fail to get user - reason: ${error?.message}`);
    }
  };

  throw new Error(`Invalid user identifiers`);
};

export async function DeleteUserController(id: string) : Promise<string> {
  try {
    const user = await UserModel.getUserById(id);

    if (!user) throw new Error("Fail to remove user - User not found");
    
    const activeSession = SessionModel.getSession(id)
      .then((session) => {
        if (session) {
          return SessionModel.setSession(session.loggerId, false)
        }
        return null;
      })
      .catch((error) => {
        throw new Error(`Session error \nReason: ${error.message}`); 
      });

    const [, deletedUserId] = await Promise.all([
      activeSession, 
      UserModel.deleteUser(id)
    ])

    return deletedUserId;

  } catch (error) {
    throw new Error(error.message);
  }
};

