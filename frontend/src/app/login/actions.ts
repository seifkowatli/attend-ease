"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData);
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      fields: { email: formValues.email }, 
    };
  }

  const { email, password } = result.data;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier: email, password }),
  });

  if (!response.ok) {
    return {
        errors: {
          email: ["Invalid email or password"],
        },
        fields: { email },
      };
   
  }

  const data = await response.json();

  await createSession(data.jwt);

  redirect("/profile");
}
