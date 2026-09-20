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

const Dino = forwardRef(function Dino({ frameSetterRef, facingSetterRef}, ref) {
    const { theme, toggleTheme } = useTheme();
    const imgRef = useRef(null);

useEffect(() => {
    const frames = SPRITES[theme];
    frameSetterRef.current = (index) => {
        if (imgRef.current) imgRef.current.src = frames[index % frames.length];
    };
    return () => {
        frameSetterRef.current = null;
    };
}, [theme, frameSetterRef]);

useEffect(() => {
    facingSetterRef.current = (facing) => {
        if (imgRef.current) {
            imgRef.current.style.transform = facing === -1 ? "scaleX(-1)" : "scaleX(1)";
        }
    };
    return () => {
        facingSetterRef.current = null;
    };
}, [facingSetterRef]);

return (
    <div
    ref={ref}
    onDoubleClick={toggleTheme}
    className="fixed top-0 left-0 z-50 cursor-grab active:cursor-grabbing will-change-transform"
    style={{ transformOrigin: "top left" }}
>
    <img
        ref={imgRef}
        src={SPRITES[theme][0]}
        alt="Dino"
        className="w-20 h-auto pixel-art select-none"
        style = {{WebkitUserDrag: "none", touchAction: "none"}}
    />
</div>
);
});

export default Dino;