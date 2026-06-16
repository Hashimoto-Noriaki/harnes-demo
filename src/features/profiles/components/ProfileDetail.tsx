import Image from "next/image";
import type { Profile } from "../types";

type ProfileDetailProps = {
  profile: Profile;
};

export function ProfileDetail({ profile }: ProfileDetailProps) {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="relative aspect-[3/4]">
        <Image
          src={profile.imageUrl}
          alt={profile.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-gray-500 mt-1">
            {profile.age}歳 · {profile.location}
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
        <div className="flex flex-wrap gap-2">
          {profile.hobbies.map((hobby) => (
            <span
              key={hobby}
              className="text-sm bg-rose-50 text-rose-600 px-3 py-1 rounded-full"
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
