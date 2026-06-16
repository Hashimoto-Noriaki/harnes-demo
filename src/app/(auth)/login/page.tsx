import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h2 className="mb-6 text-center text-xl font-semibold text-gray-800">
        ログイン
      </h2>
      <LoginForm />
    </>
  );
}
