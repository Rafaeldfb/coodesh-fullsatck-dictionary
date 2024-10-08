import { User } from "@prisma/client";
import { PublicUser } from "../models/UserTypes";

export function removeUserPwdHash(user: Partial<User>): PublicUser {
  const copy: Partial<User> = {...user};
  delete copy.passwordHash;

  return copy as PublicUser;
}