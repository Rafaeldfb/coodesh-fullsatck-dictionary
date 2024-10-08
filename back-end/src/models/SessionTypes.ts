import { User } from "@prisma/client"

export type LoginPayload = {
  email: string,
  password: string
}

export type RegisterPayload = Omit<User, "id" | "passwordHash"> & {
  password: string
}
