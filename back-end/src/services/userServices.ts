import UserModel from "../models/User";
import { AuthResponse } from "../@types/http";
import { RegisterPayload } from "../models/SessionTypes";
import bcryptAsync from "../config/bcrypt";
import { removeUserPwdHash } from "../helpers/userHelper";
import JwtService from "../services/jwtServices";
import { TokenUserData } from "../@types/jwt";
import { PublicUser } from "../models/UserTypes";

export default class UserService {
  static async createUserService(registerData: RegisterPayload) : Promise<AuthResponse>{
    const { email, password} = registerData;
    
    if (!email?.length || !password?.length) {
      throw new Error(`Invalid ${email?.length ? 'e-mail' : 'password'}`);
    } 
  
    const user = await UserModel.getUserByEmail(email);
    if (user) throw new Error("Email already registered");
  
    const hashedPwd = await bcryptAsync.hash(password);
  
    try {
      const newUser = await UserModel.createUser({
        ...registerData,
        passwordHash: hashedPwd
      })
        .then((user) => removeUserPwdHash(user));
  
      if (newUser) {
        const credentials = newUser as TokenUserData;
        const accessToken = JwtService.createAccessToken(credentials);
        const refreshToken = JwtService.createRefreshToken(credentials);
  
        const responseBody: AuthResponse = {
          id: newUser.id,
          name: newUser.name,
          token: accessToken.token,
          refreshToken: refreshToken.token
        };
  
        return responseBody
      };
  
      throw new Error("fail to register user");
      
    } catch (error) {
      throw new Error("fail to register user");
    }
  }

  static async getPublicUserDataByEmail(email: string): Promise<PublicUser> {
    const user: PublicUser = await UserModel.getUserByEmail(email)
      .then(userInfo => {
        return {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          lastName: userInfo?.lastName
        } as PublicUser;
      })
      .catch(error => {
        throw new Error("User not found")
      })

    return user;
  }

} 