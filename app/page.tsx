import JobSearchHero from "@/components/SearchBar"; // ✅ Import your component
import TrendingJobs from "@/components/TrendingJobs";

export default function Home() {
  return (
    <main>
      <JobSearchHero />
      <TrendingJobs/>  {/* ✅ Render your search bar hero */}
    </main>
  );
}
