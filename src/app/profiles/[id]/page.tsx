import { notFound } from "next/navigation";
import { ProfileDetail } from "@/features/profiles/components/ProfileDetail";
import { dummyProfiles } from "@/features/profiles/data/profiles";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProfileDetailPage({ params }: Props) {
  const { id } = await params;
  const profile = dummyProfiles.find((p) => p.id === id);

  if (!profile) notFound();

  return <ProfileDetail profile={profile} />;
}
