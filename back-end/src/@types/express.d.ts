import { Request } from "express";
import { TokenUserData } from "./jwt";

export type TokenJwt = string

export type RequestJwt = Request & {
  user?: TokenUserData
  tokenRefresh?: TokenJwt
}
