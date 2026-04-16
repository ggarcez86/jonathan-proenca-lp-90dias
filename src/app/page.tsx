import UrgencyBar from "@/sections/UrgencyBar";
import Hero from "@/sections/Hero";
import Learnings from "@/sections/Learnings";
import TargetAudience from "@/sections/TargetAudience";
import ExpertBio from "@/sections/ExpertBio";
import WhyFree from "@/sections/WhyFree";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      <UrgencyBar />
      <Hero />
      <Learnings />
      <TargetAudience />
      <ExpertBio />
      <WhyFree />
      <FinalCTA />
      <Footer />
    </main>
  );
}
