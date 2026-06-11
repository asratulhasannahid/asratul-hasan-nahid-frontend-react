import LittleAboutMe from "../components/Home/About-Me/LittleAboutMe";
import ExpertiseSection from "../components/Home/Expertise/ExpertiseSection";
import Hero from "../components/Home/Hero/Hero";
import Stats from "../components/Home/Stats/Stats";
import TechStack from "../components/Home/TechStack/TechStack";

function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <LittleAboutMe />
      <ExpertiseSection />
      <TechStack />
    </div>
  );
}

export default Home;
