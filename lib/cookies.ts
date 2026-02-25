const TOKEN_KEY = "token";

export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2];
}

export function setCookie(
  name: string,
  value: string,
  options?: { maxAge?: number; path?: string }
): void {
  if (typeof document === "undefined") return;
  let cookie = `${name}=${encodeURIComponent(value)}`;
  if (options?.maxAge) cookie += `; max-age=${options.maxAge}`;
  cookie += `; path=${options?.path ?? "/"}`;
  document.cookie = cookie;
}

export function deleteCookie(name: string, path = "/"): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=${path}; max-age=0`;
}

export function getToken(): string | undefined {
  return getCookie(TOKEN_KEY);
}

export function setToken(value: string, maxAge?: number): void {
  setCookie(TOKEN_KEY, value, { maxAge, path: "/" });
}

export function clearToken(): void {
  deleteCookie(TOKEN_KEY);
}
