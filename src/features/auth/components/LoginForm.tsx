"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login({ email, password });

    if (!result.success) {
      setError(result.error ?? "ログインに失敗しました");
      setLoading(false);
      return;
    }

    router.push("/profiles");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-rose-400 focus:outline-none"
          placeholder="example@mail.com"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          パスワード
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-rose-400 focus:outline-none"
          placeholder="パスワードを入力"
        />
      </div>
      {error && <p className="text-sm text-rose-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-rose-500 py-2 text-sm font-bold text-white hover:bg-rose-600 disabled:opacity-50"
      >
        {loading ? "ログイン中..." : "ログイン"}
      </button>
    </form>
  );
}
