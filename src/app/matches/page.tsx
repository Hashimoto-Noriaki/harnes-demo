"use client";

import { useEffect, useState } from "react";

// マッチング一覧ページ
export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const profiles = [
    {
      id: "1",
      name: "田中 さくら",
      age: 24,
      imageUrl: "https://i.pravatar.cc/400?img=1",
    },
    {
      id: "2",
      name: "鈴木 あかり",
      age: 26,
      imageUrl: "https://i.pravatar.cc/400?img=2",
    },
    {
      id: "3",
      name: "佐藤 みく",
      age: 23,
      imageUrl: "https://i.pravatar.cc/400?img=3",
    },
    {
      id: "4",
      name: "高橋 ゆい",
      age: 28,
      imageUrl: "https://i.pravatar.cc/400?img=4",
    },
    {
      id: "5",
      name: "伊藤 ほのか",
      age: 25,
      imageUrl: "https://i.pravatar.cc/400?img=5",
    },
    {
      id: "6",
      name: "渡辺 まりな",
      age: 27,
      imageUrl: "https://i.pravatar.cc/400?img=6",
    },
    {
      id: "7",
      name: "山田 ひな",
      age: 22,
      imageUrl: "https://i.pravatar.cc/400?img=7",
    },
    {
      id: "8",
      name: "中村 りさ",
      age: 29,
      imageUrl: "https://i.pravatar.cc/400?img=8",
    },
  ];

  useEffect(() => {
    setLoading(true);
    const liked = JSON.parse(localStorage.getItem("liked_profiles") || "[]");
    const result = profiles.filter((p: any) => liked.includes(p.id));
    setMatches(result);
    setLoading(false);
  }, [profiles]);

  function deleteMatch(id: any) {
    const liked = JSON.parse(localStorage.getItem("liked_profiles") || "[]");
    const newLiked = liked.filter((x: any) => x != id);
    localStorage.setItem("liked_profiles", JSON.stringify(newLiked));
    setMatches(matches.filter((m) => m.id != id));
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#fff" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        マッチング一覧
      </h1>

      {loading && <p>読み込み中...</p>}

      {matches.length == 0 && (
        <p style={{ color: "gray" }}>マッチングがまだいません</p>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        {matches.map((match) => (
          <div
            key={match.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src={match.imageUrl}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "12px" }}>
              <p style={{ fontWeight: "bold" }}>{match.name}</p>
              <p style={{ color: "gray", fontSize: "14px" }}>{match.age}歳</p>
              <button
                style={{
                  marginTop: "8px",
                  backgroundColor: "red",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => deleteMatch(match.id)}
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
