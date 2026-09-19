import { forwardRef, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

import rightLegLight from "../assets/DINO/Chrome_T-Rex_Right_Run.png";
import rightLegDark from "../assets/DINO/Chrome_T-Rex_Right_Run_forblackmode.png";
import leftLegLight from "../assets/DINO/Chrome_T-Rex_Left_Run.png";
import leftLegDark from "../assets/DINO/Chrome_T-Rex_Left_Run_forblackmode.png";

const SPRITES = {
    light: [rightLegLight, leftLegLight],
    dark: [rightLegDark, leftLegDark],
};

const Dino = forwardRef(function Dino({ isRunningRef }, ref) {
    const { theme } = useTheme();
    const imgRef = useRef(null);
    const frame = useRef(0);

useEffect(() => {
    const frames = SPRITES[theme];
    const id = setInterval(() => {
        if (!isRunningRef.current) return;
        frame.current = (frame.current + 1) % frames.length;
        if (imgRef.current) imgRef.current.src = frames[frame.current];
    }, 120);

    return () => clearInterval(id);
}, [theme, isRunningRef]);

return (
    <div
    ref={ref}
    className="fixed top-0 left-0 z-50 pointer-events-none will-change-transform"
    style={{ transformOrigin: "top left" }}
>
    <img
        ref={imgRef}
        src={SPRITES[theme][0]}
        alt="Dino"
        className="w-20 h-auto pixel-art"
    />
</div>
);
});

export default Dino;