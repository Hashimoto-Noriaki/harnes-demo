import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Profile } from "../types";
import { ProfileCard } from "./ProfileCard";

const mockProfile: Profile = {
  id: "1",
  name: "田中 さくら",
  age: 24,
  location: "東京都",
  bio: "カフェ巡りが好きです。",
  imageUrl: "https://example.com/image.jpg",
  hobbies: ["読書", "カフェ巡り"],
};

describe("ProfileCard", () => {
  it("プロフィールの名前・年齢・居住地を表示する", () => {
    render(
      <ProfileCard
        profile={mockProfile}
        isLiked={false}
        onToggleLike={vi.fn()}
      />,
    );

    expect(screen.getByText("田中 さくら")).toBeInTheDocument();
    expect(screen.getByText("24歳")).toBeInTheDocument();
    expect(screen.getByText("東京都")).toBeInTheDocument();
  });

  it("いいねボタンをクリックすると onToggleLike が profile.id で呼ばれる", () => {
    const onToggleLike = vi.fn();
    render(
      <ProfileCard
        profile={mockProfile}
        isLiked={false}
        onToggleLike={onToggleLike}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "いいねする" }));
    expect(onToggleLike).toHaveBeenCalledWith("1");
  });

  it("isLiked=true のとき「いいねを取り消す」ボタンを表示する", () => {
    render(
      <ProfileCard
        profile={mockProfile}
        isLiked={true}
        onToggleLike={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: "いいねを取り消す" }),
    ).toBeInTheDocument();
  });

  it("likedByThem=true のとき「気になってる」バッジを表示する", () => {
    render(
      <ProfileCard
        profile={mockProfile}
        isLiked={false}
        onToggleLike={vi.fn()}
        likedByThem={true}
      />,
    );

    expect(screen.getByText(/気になってる/)).toBeInTheDocument();
  });

  it("likedByThem が未指定のとき「気になってる」バッジを表示しない", () => {
    render(
      <ProfileCard
        profile={mockProfile}
        isLiked={false}
        onToggleLike={vi.fn()}
      />,
    );

    expect(screen.queryByText(/気になってる/)).not.toBeInTheDocument();
  });
});
