"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export async function register(_: unknown, formData: FormData) {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, email, password } = parsed.data;

  const exists = await db.user.findUnique({ where: { email } });
  if (exists) return { error: "Email already registered" };

  const hashed = await bcrypt.hash(password, 12);
  await db.user.create({ data: { name, email, password: hashed } });

  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
}

export async function login(_: unknown, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw err;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}
