import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useAuth } from "./useAuth";

beforeEach(() => {
  localStorage.clear();
});

describe("useAuth", () => {
  describe("signup", () => {
    it("新規ユーザーを登録してセッションを保存する", async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signup({
          email: "test@example.com",
          password: "password123",
          name: "テストユーザー",
        });
      });

      expect(result.current.user?.email).toBe("test@example.com");
      expect(result.current.user?.name).toBe("テストユーザー");
    });

    it("同じメールアドレスで再登録するとエラーを返す", async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signup({
          email: "test@example.com",
          password: "password123",
          name: "テストユーザー",
        });
      });

      let response: { success: boolean; error?: string } = { success: false };
      await act(async () => {
        response = await result.current.signup({
          email: "test@example.com",
          password: "other",
          name: "別ユーザー",
        });
      });

      expect(response.success).toBe(false);
      expect(response.error).toBeDefined();
    });
  });

  describe("login", () => {
    it("正しい認証情報でログインできる", async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signup({
          email: "test@example.com",
          password: "password123",
          name: "テストユーザー",
        });
      });

      act(() => result.current.logout());

      let response = { success: false };
      await act(async () => {
        response = await result.current.login({
          email: "test@example.com",
          password: "password123",
        });
      });

      expect(response.success).toBe(true);
      expect(result.current.user?.email).toBe("test@example.com");
    });

    it("パスワードが違う場合はエラーを返してユーザーを null にする", async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signup({
          email: "test@example.com",
          password: "password123",
          name: "テストユーザー",
        });
      });

      act(() => result.current.logout());

      let response = { success: true };
      await act(async () => {
        response = await result.current.login({
          email: "test@example.com",
          password: "wrong",
        });
      });

      expect(response.success).toBe(false);
      expect(result.current.user).toBeNull();
    });
  });

  describe("logout", () => {
    it("ログアウトするとユーザーが null になる", async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signup({
          email: "test@example.com",
          password: "password123",
          name: "テストユーザー",
        });
      });

      expect(result.current.user).not.toBeNull();

      act(() => result.current.logout());

      expect(result.current.user).toBeNull();
    });
  });
});
