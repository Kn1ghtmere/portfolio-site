import { forwardRef } from "react";

const ScrollHint = forwardRef(function ScrollHint(_,ref) {
    return (
        <div
        ref={ref}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 transition-opacity duration-500"
        >
            <span className="font-pixel text-3xl text-foregroundlight dark:text-foregrounddark shimmer-text">
               {">>>"}
            </span>
            
        </div>
    );
});

export default ScrollHint;