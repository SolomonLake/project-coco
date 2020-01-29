import jwt from "jsonwebtoken";
import { processEnv } from "../../processEnv";

export type CookieClaims = { userId: string };

export function encodeJwt(claims: CookieClaims) {
  return jwt.sign(claims, processEnv.JWT_SECRET, {
    expiresIn: "30d",
  });
}

export function decodeJwt(jwtCookie: string): CookieClaims {
  return <CookieClaims>jwt.verify(jwtCookie, processEnv.JWT_SECRET);
}
