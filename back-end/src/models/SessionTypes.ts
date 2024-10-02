import { User } from "@prisma/client"
import { Session } from "@prisma/client"

/**takes a type and makes at least one field as required ando others optionals */
type RequireSingleProp<T> = {
  [K in keyof T]: 
      Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];


type SessionKeys = Pick<Session, "loggerId" | "token">
/** Requre at least one session identifier, loggerId  or token */
export type SessionCredentials = RequireSingleProp<SessionKeys>

export type LoginPayload = {
  email: string,
  password: string
}

export type RegisterPayload = Omit<User, "id" | "passwordHash"> & {
  password: string
}
