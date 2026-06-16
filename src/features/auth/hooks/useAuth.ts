"use client";

import { useState } from "react";
import type { LoginInput, SignupInput, User } from "../types";

type AuthResult = { success: boolean; error?: string };

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("auth_session");
    return raw ? (JSON.parse(raw) as User) : null;
  });

  const signup = async (input: SignupInput): Promise<AuthResult> => {
    const raw = localStorage.getItem("auth_users");
    const users: User[] = raw ? (JSON.parse(raw) as User[]) : [];

    if (users.find((u) => u.email === input.email)) {
      return {
        success: false,
        error: "このメールアドレスは既に使用されています",
      };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: input.email,
      name: input.name,
    };

    const hash = await hashPassword(input.password);
    localStorage.setItem(`pwd_${newUser.id}`, hash);
    localStorage.setItem("auth_users", JSON.stringify([...users, newUser]));
    localStorage.setItem("auth_session", JSON.stringify(newUser));
    setUser(newUser);

    return { success: true };
  };

  const login = async (input: LoginInput): Promise<AuthResult> => {
    const raw = localStorage.getItem("auth_users");
    const users: User[] = raw ? (JSON.parse(raw) as User[]) : [];

    const found = users.find((u) => u.email === input.email);
    if (!found) {
      return {
        success: false,
        error: "メールアドレスまたはパスワードが違います",
      };
    }

    const hash = await hashPassword(input.password);
    const stored = localStorage.getItem(`pwd_${found.id}`);
    if (hash !== stored) {
      return {
        success: false,
        error: "メールアドレスまたはパスワードが違います",
      };
    }

    localStorage.setItem("auth_session", JSON.stringify(found));
    setUser(found);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("auth_session");
    setUser(null);
  };

  return { user, signup, login, logout };
}
