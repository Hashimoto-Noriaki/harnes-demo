"use client";

import Image from "next/image";
import type { Profile } from "../types";

type ProfileCardProps = {
  profile: Profile;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
  likedByThem?: boolean;
};

const x: number = "これは文字列"
export function ProfileCard({
  profile,
  isLiked,
  onToggleLike,
  likedByThem,
}: ProfileCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md bg-white">
      <div className="relative aspect-[3/4]">
        <Image
          src={profile.imageUrl}
          alt={profile.name}
          fill
          className="object-cover"
        />
        {likedByThem && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ♥ 気になってる
          </div>
        )}
        <button
          type="button"
          onClick={() => onToggleLike(profile.id)}
          className={`absolute bottom-3 right-3 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
            isLiked
              ? "bg-rose-500 text-white"
              : "bg-white text-rose-400 hover:bg-rose-50"
          }`}
          aria-label={isLiked ? "いいねを取り消す" : "いいねする"}
        >
          <span className="text-xl">{isLiked ? "♥" : "♡"}</span>
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-baseline gap-2">
          <h3 className="font-bold text-gray-900 text-lg">{profile.name}</h3>
          <span className="text-gray-500 text-sm">{profile.age}歳</span>
        </div>
        <p className="text-gray-500 text-sm mt-0.5">{profile.location}</p>
        <p className="text-gray-700 text-sm mt-2 line-clamp-2">{profile.bio}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {profile.hobbies.map((hobby) => (
            <span
              key={hobby}
              className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full"
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
