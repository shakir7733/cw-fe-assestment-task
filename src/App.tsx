import { HeroSection } from "./components/sections/hero-section";
import { TagList } from "./components/feature/taglist";
import { TRENDING_TAGS } from "./lib/constants";
import { Layout } from "./components/layout/layout";
import { SearchProvider } from "./contexts/search-context";

export default function App() {
  return (
    <SearchProvider>
      <Layout>
        <HeroSection />
        <TagList title="Trending" tags={TRENDING_TAGS} />
        <TagList title="For you" tags={TRENDING_TAGS} />
      </Layout>
    </SearchProvider>
  );
}
