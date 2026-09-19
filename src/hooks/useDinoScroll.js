import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SETTLE_FRACTION = 0.15;
const RUN_VELOCITY_THRESHOLD = 50;

export function useDinoScroll({ containerRef, trackRef, dinoRef, isRunningRef }) {
    useGSAP(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        const dino = dinoRef.current;
        if (!container || !track || !dino) return;

        let st;

        const build = () => {
            const totalScroll = track.scrollWidth - window.innerWidth;
            const dinoWidth = dino.offsetWidth;
            const dinoHeight = dino.offsetHeight;
            const margin = 24;

            
            const introY = window.innerHeight * 0.55;
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
                    const settle = gsap.utils.clamp(0, 1, p / SETTLE_FRACTION);

                    gsap.set(track, { x: -totalScroll * p });

                    gsap.set(dino, {
                        x: gsap.utils.interpolate(walkerStartX, walkerEndX, p),
                        y: gsap.utils.interpolate(introY, footerY, settle),
                        scale: gsap.utils.interpolate(introScale, footerScale, settle),
                    });

                    isRunningRef.current = Math.abs(self.getVelocity()) > RUN_VELOCITY_THRESHOLD;
                },
            });
        };

        build();


        const onResize = () => {
            st.kill();
            build();
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            st?.kill();
        };
    },[]);
}