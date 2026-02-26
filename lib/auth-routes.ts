import { TOKEN_KEY } from "./cookies";

export const AUTH_COOKIE_NAME = TOKEN_KEY;

export const PUBLIC_PATHS = ["/login" ,"/" ,"/home"] as const;

export const LOGIN_PATH = "/login";

export const DEFAULT_AUTHED_REDIRECT = "/";

export function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
