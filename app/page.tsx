import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <AboutMe />
      <Projects />
      <Contact />
    </main>
  );
}
