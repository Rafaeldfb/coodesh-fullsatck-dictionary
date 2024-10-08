import { PublicUser } from '../models/UserTypes'

export type  AuthResponse = {
  id: string
  name: string
  token: string
  refreshToken?: string
};

export type LogoutResponse = {
  [K in keyof AuthResponse]-? : null
}