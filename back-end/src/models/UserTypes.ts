import { User } from "@prisma/client"

// Never return a User obj to outter layers with passwordHash hash
export type PublicUser = Omit<User, "passwordHash">
