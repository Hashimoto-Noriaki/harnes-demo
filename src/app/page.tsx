import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white px-6">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl">❤</span>
          <h1 className="text-4xl font-bold text-rose-500">Harnes</h1>
          <p className="text-gray-500">あなたの出会いをサポートします</p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link
            href="/login"
            className="rounded-full bg-rose-500 py-3 text-center text-sm font-bold text-white hover:bg-rose-600"
          >
            ログイン
          </Link>
          <Link
            href="/profiles"
            className="rounded-full border border-rose-300 py-3 text-center text-sm font-bold text-rose-500 hover:bg-rose-50"
          >
            プロフィールを見る
          </Link>
        </div>
      </div>
    </div>
  );
}
