// App.jsx
import { useRef } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Dino from "./components/dino";
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
  const isRunningRef = useRef(false);

  useDinoScroll({ containerRef, trackRef, dinoRef, isRunningRef });

  return (
    <>
      <Dino ref={dinoRef} isRunningRef={isRunningRef} />
      <section ref={containerRef} className="h-screen overflow-hidden relative">
        <div ref={trackRef} className="flex h-full will-change-transform">
         <PlaceholderBlock label="section 1" />
         <PlaceholderBlock label="section 2" />
         <PlaceholderBlock label="section 3" />
         <PlaceholderBlock label="section 4" />
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