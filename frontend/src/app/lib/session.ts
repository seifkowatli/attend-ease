import "server-only";
import { cookies } from "next/headers";


export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

   (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
   (await cookies()).delete("session");
}


export async function fetchCurrentUser() {
  const jwt = (await cookies()).get("session")?.value;
  if (!jwt) return null;

  const res = await fetch(`${process.env.API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  
  return await res.json();
}
