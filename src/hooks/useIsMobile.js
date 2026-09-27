import {useState, useEffect} from "react";

export function useIsMobile(breakpoint = 768){
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== "undefined" && window.innerWidth < breakpoint
    );

    useEffect(() => {
        const mq = window.matchMedia('(max-width: ${breakpoint - 1}px)');
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        setIsMobile(mq.matches);
        return () => mq.removeEventListener("change", handler);
    }, [breakpoint]);

    return isMobile;
}