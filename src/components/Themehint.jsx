import {forwardRef} from "react";

const Themehint = forwardRef(function Themehint(_, ref) {
    return(
    <span ref={ref}
    className="font-pixel  text-xs text-subtextlight fixed h-screen left-1/2 -translate-x-1/2 z-50 flex flex-col justify-center items-center transition-opacity duration-500 shimmer-text"
    >double tap dino to toggle theme</span>
  );
});

export default Themehint;