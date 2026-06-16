export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-pink-500">Harnes</h1>
          <p className="mt-1 text-sm text-gray-500">新しい出会いを見つけよう</p>
        </div>
        {children}
      </div>
    </div>
  );
}
