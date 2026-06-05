"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";


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
