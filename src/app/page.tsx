import { Hero } from "@/components/Hero";
import { InfoSection } from "@/components/InfoSection";
import { Footer } from "@/components/Footer";
import { ShareButtons } from "@/components/ShareButtons";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 -mt-20 relative z-20 mb-12">
        <ShareButtons />
      </div>
      <InfoSection />
      <Footer />
    </main>
  );
}
