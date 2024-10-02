import { User } from "@prisma/client"

// Never return a User obj to outter layers with password hash
export type PublicUser = Omit<User, "password">