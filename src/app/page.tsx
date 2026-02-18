import { Hero } from "@/components/Hero";
import { InfoSection } from "@/components/InfoSection";
import { Footer } from "@/components/Footer";
import { ShareButtons } from "@/components/ShareButtons";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 -mt-10 relative z-20 mb-20">
        <div className="bg-white/5 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/20 dark:border-white/10 rounded-3xl p-4 shadow-xl max-w-md mx-auto">
          <ShareButtons />
        </div>
      </div>
      <InfoSection />
      <Footer />
    </main>
  );
}
