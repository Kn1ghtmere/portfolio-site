import { useEffect, useRef } from "react";
const SPAWN_INTERVAL_MS = 40;
const PARTICLE_LIFETIME_MS = 500;
const PARTICLE_SIZE = 4;


export default function CursorTrial(){
    const lastSpawnRef = useRef(0);

    useEffect(() =>{
        const onMouseMove = (e) => {
            const now = performance.now();
            if (now - lastSpawnRef.current < SPAWN_INTERVAL_MS) return;
            lastSpawnRef.current = now;
            const particle = document.createElement("div");
            particle.className = "pixel-trial-particle";

            const angle = Math.random() * Math.PI * 2;
            const distance = 12 + Math.random() * 10;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;


            
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      particle.style.setProperty("--tx", `${tx}px`);
      particle.style.setProperty("--ty", `${ty}px`);

      document,body.appendChild(particle);

      setTimeout(() => particle.remove(), PARTICLE_LIFETIME_MS);

        };
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);

    }, [])
}