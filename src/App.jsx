// App.jsx
import { useRef } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Dino from "./components/dino";
import Ground from "./components/ground";
import ScrollHint from "./components/ScrollHint"
import Home from "./sections/Home";
import { useDinoScroll } from "./hooks/useDinoScroll";
import {useIsMobile} from "./hooks/useIsMobile";
import Navbar from "./sections/Navbar";
import Contact from "./sections/Contact"
import Footer from "./components/Footer";
import Projects from "./sections/Projects";
import Welcometext from "./components/Welcometext";
import Themehint from "./components/Themehint"
function PlaceholderBlock({ label }) {
  return (
    <div className="w-screen h-full flex items-center justify-center shrink-0 bg-backgroundlight dark:bg-backgrounddark">
      <span className="text-xl opacity-40">{label}</span>
    </div>
  );
}

function HorizontalPortfolio() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const dinoRef = useRef(null);
  const frameSetterRef = useRef(null);
  const groundRef = useRef(null);
  const facingSetterRef = useRef(null);
  const hintRef = useRef(null);
  const secondHintRef = useRef(null);
  const navRef = useRef(null);
  const scrollApiRef = useRef(null);
  const thirdhintRef = useRef(null)


  useDinoScroll({ containerRef, trackRef, dinoRef, groundRef, frameSetterRef, facingSetterRef, hintRefs:[hintRef, secondHintRef, thirdhintRef], navRef, scrollApiRef });

  return (
    <>
       <Navbar ref={navRef} scrollApiRef={scrollApiRef}/>
      <Dino ref={dinoRef} frameSetterRef={frameSetterRef} facingSetterRef={facingSetterRef}/>
      <Ground ref={groundRef} />
      <ScrollHint ref={hintRef} />
      <Welcometext ref={secondHintRef}/>
      <Themehint ref={thirdhintRef}/>

      <section ref={containerRef} className="h-screen overflow-hidden relative">
        <div ref={trackRef} className="flex h-full will-change-transform">
         <PlaceholderBlock/>
         <Home />
         <Projects/>
         <Contact />
        </div>
      </section>
      <Ground static/>
      <Footer/>
    </>
  );
}

function VerticalPortfolio() {
  return (
    <>
    <Navbar mobile/>
    <Home />
    <Projects />
    <Contact/>
    <Ground static/>
    <Footer/>
    </>
  );
}

export default function App() {
  const isMobile = useIsMobile();
  return (
    <ThemeProvider>
      {isMobile ? <VerticalPortfolio /> : <HorizontalPortfolio/>}
    </ThemeProvider>
  );
}