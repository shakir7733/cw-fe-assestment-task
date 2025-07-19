import { Header } from "./components/layout/header";
import { HeroSection } from "./components/sections/hero-section";
import { TagList } from "./components/feature/taglist";
import { TRENDING_TAGS } from "./lib/constants";

export default function App() {
  return (
    <main className="bg-background min-h-screen text-white font-sans antialiased">
      <Header />
      <div className="max-w-5xl mx-auto p-4">
        <HeroSection />
        <TagList title="Trending" tags={TRENDING_TAGS} />
        <TagList title="For you" tags={TRENDING_TAGS} />
      </div>
    </main>
  );
}
