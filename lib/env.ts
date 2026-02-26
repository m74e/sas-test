/**
 * API base URL from environment.
 * Use for all requests to the ERP API (e.g. fetch(`${getApiUrl()}/endpoint`)).
 */
export function getApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL is not set in .env");
  }
  return url.replace(/\/$/, ""); // ensure no trailing slash
}
