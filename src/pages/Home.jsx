import LittleAboutMe from "../components/Home/About-Me/LittleAboutMe";
import Hero from "../components/Home/Hero/Hero";
import Stats from "../components/Home/Stats/Stats";

function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <LittleAboutMe />
    </div>
  );
}

export default Home;
