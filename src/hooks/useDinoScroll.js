import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, Draggable);

const RUN_FRACTION = 0.02;
const SETTLE_END_FRACTION = 0.13;
const STEP_PX = 45;
const DRAG_MULTIPLIER = 3.1;

export function useDinoScroll({ containerRef, trackRef, dinoRef, groundRef, frameSetterRef }) {
    useGSAP(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        const dino = dinoRef.current;
        const ground = groundRef.current;
        if (!container || !track || !dino || !ground) return;
        

        let st;
        let draggable;

        const dragProxy = document.createElement("div");
        dragProxy.style.cssText = 
        "position:fixed; top:0; left:0; width:1px; height:1px; pointer-events:none;";
        document.body.appendChild(dragProxy);

        const build = () => {
            const totalScroll = track.scrollWidth - window.innerWidth;
            const dinoWidth = dino.offsetWidth;
            const dinoHeight = dino.offsetHeight;
            const margin = 24;

            
            const introY = window.innerHeight * 0.4;
            const footerY = window.innerHeight - dinoHeight - margin;
            const introScale = 2;
            const footerScale = 1;
            const walkerStartX = margin;
            const walkerEndX = window.innerWidth - dinoWidth - margin;

            st = ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: () => `+=${totalScroll}`,
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                    const p = self.progress;
                    const settle = gsap.utils.clamp(
                         0,
                         1,
                         ( p - RUN_FRACTION) / (SETTLE_END_FRACTION - RUN_FRACTION)
                    );
                    
                    const dinoX = gsap.utils.interpolate(walkerStartX, walkerEndX, p);
                    const dinoY = gsap.utils.interpolate(introY, footerY, settle);
                    const dinoScale = gsap.utils.interpolate(introScale, footerScale, settle);

                    gsap.set(track, { x: -totalScroll * p });

                    gsap.set(dino, {
                        x: dinoX,
                        y: dinoY,
                        scale: dinoScale,
                    });

                    gsap.set(ground, {
                        y: dinoY + dinoHeight * dinoScale });

                        
                 const distanceTravelled = totalScroll * p;
                const frameIndex = Math.floor(distanceTravelled / STEP_PX);
                 frameSetterRef.current?.(frameIndex);
                },
            });

            draggable?.kill();
            draggable = Draggable.create(dragProxy, {
                type: "x",
                trigger: dino,
                cursor: "grab",
                activeCursor: "grabbing",
                onDrag: function () {
                    st.scroll(st.scroll() + this.deltaX * DRAG_MULTIPLIER);
                },
            })[0];
        };

        build();


        const onResize = () => {
            st.kill();
            draggable?.kill();
            build();
            ScrollTrigger.refresh();
        };
      window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            st?.kill();
            draggable?.kill();
            dragProxy.remove();
        };
    }, []);
}
