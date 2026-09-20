import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from "@gsap/react";
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, Draggable);

const RUN_FRACTION = 0.1;
const SETTLE_END_FRACTION = 0.2;
const STEP_PX = 35;
const DRAG_MULTIPLIER = 3.1;
const DIRECTION_LIMIT = 0.012;
const SCROLL_MATCH = 0.002;
const SPACE_SCROLL_VALUE = 30;
const SPACE_SCROLL_DURATION = 1.5; 

export function useDinoScroll({ containerRef, trackRef, dinoRef, groundRef, frameSetterRef, facingSetterRef, hintRef }) {
    useGSAP(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        const dino = dinoRef.current;
        const ground = groundRef.current;
        if (!container || !track || !dino || !ground) return;
        

        let st;
        let draggable;
        let facing = 1;
        let facingAnchorP = 0;
        let hintHidden = false;


        const hideHint = () => {
            if(hintHidden) return;
            hintHidden = true;
            const hint = hintRef?.current;
            if (hint) {
                hint.style.opacity = "0";
                hint.style.pointerEvents = "none";
            }
        };

        const lenis = new Lenis({
            duration: 1.1,
            lerp: 3,
            smoothWheel: true,
            wheelMultiplier: 1.3,
            touchMultiplier: 1.5,
        }); 
        lenis.on("scroll", ScrollTrigger.update);

        const tickerCallback = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        const onKeydown = (e) => {
            if (e.code !== "Space") return;
            const target = document.activeElement;
            const tag = target?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
            e.preventDefault();
            hideHint();
            const current = st.scroll();
            lenis.scrollTo(current + SPACE_SCROLL_VALUE, {
                duration: SPACE_SCROLL_DURATION,
                easing: (t) => 1 - Math.pow(1 - t, 3),
            });
        };
        window.addEventListener("keydown" , onKeydown);
        const onFirstScrollSignal = () => hideHint();
        window.addEventListener("wheel", onFirstScrollSignal, {passive: true, once: true});
        window.addEventListener("touchstart", onFirstScrollSignal, { passive: true, once: true});

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
                scrub: true,
                onUpdate: (self) => {
                   const p = self.progress;

                   const facingDelta = p - facingAnchorP;
                   if (Math.abs(facingDelta) > DIRECTION_LIMIT) {
                    const newFacing = facingDelta > 0 ? 1 : -1;
                    facingAnchorP = p;
                    if (newFacing !== facing) {
                        facing = newFacing;
                        facingSetterRef.current?.(facing);
                    }
                   }

                   if( p <= SCROLL_MATCH && facing !== 1) {
                    facing = 1;
                    facingAnchorP = p;
                    facingSetterRef.current?.(facing);
                   } else if (p >= 1 - SCROLL_MATCH && facing !== -1) {
                    facing = -1;
                    facingAnchorP = p;
                    facingSetterRef.current?.(facing);
                   }
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
                    hideHint();
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
            window.removeEventListener("keydown", onKeydown);
            window.removeEventListener("wheel", onFirstScrollSignal);
            window.removeEventListener("touchstart", onFirstScrollSignal);
            st?.kill();
            draggable?.kill();
            dragProxy.remove();
        };
    }, []);
}
