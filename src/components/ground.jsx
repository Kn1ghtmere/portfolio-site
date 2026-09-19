import { forwardRef } from "react";
import horizon from "../assets/DINO/Chromium_T-Rex-horizon.png";

const Ground = forwardRef(function Ground(_, ref) {
    return (
        <div
         ref={ref}
         className="fixed top-0 left-0 w-screen z-40 pointer-events-none will-change-transform"
         style={{
            height: "24px",
            backgroundImage: `url(${horizon})`,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "left top",
            imageRendering: "pixelated",        
         }}
        />
    );
});

export default Ground;
