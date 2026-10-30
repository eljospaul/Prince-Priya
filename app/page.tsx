import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Welcome } from "@/components/sections/welcome";
import { StoryPreview } from "@/components/sections/story-preview";
import { WishesPreview } from "@/components/sections/wishes-preview";
import { Closing } from "@/components/sections/closing";

export const metadata: Metadata = {
  title: "Home — A Little Forever",
  description:
    "A wedding memory website celebrating Jabez & Priya — photographs, their story, and heartfelt wishes from friends and family.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <StoryPreview />
      <WishesPreview />
      <Closing />
    </>
  );
}
