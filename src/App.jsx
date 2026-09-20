// App.jsx
import { useRef } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Dino from "./components/dino";
import Ground from "./components/ground";
import ScrollHint from "./components/ScrollHint"
import Home from "./sections/Home";
import { useDinoScroll } from "./hooks/useDinoScroll";


function PlaceholderBlock({ label }) {
  return (
    <div className="w-screen h-full flex items-center justify-center shrink-0 border-r border-dashed border-gray-400">
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

  useDinoScroll({ containerRef, trackRef, dinoRef, groundRef, frameSetterRef, facingSetterRef, hintRef });

  return (
    <>
      <Dino ref={dinoRef} frameSetterRef={frameSetterRef} facingSetterRef={facingSetterRef}/>
      <Ground ref={groundRef} />
      <ScrollHint ref={hintRef} />
      <section ref={containerRef} className="h-screen overflow-hidden relative">
        <div ref={trackRef} className="flex h-full will-change-transform">
         <PlaceholderBlock label="" />
         <Home />
         <PlaceholderBlock label="work/projects" />
         <PlaceholderBlock label="contact page" />
        </div>
      </section>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HorizontalPortfolio />
    </ThemeProvider>
  );
}