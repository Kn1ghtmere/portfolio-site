import {forwardRef} from "react";

const Welcometext = forwardRef(function Welcometext(_,ref) {
    return (
        <div
        ref={ref}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 transition-opacity duration-500">
            <span
            className="font-pixel text-3x text-foregroundlight dark:text-foregrounddark shimmer-text">
                Scroll to continue{" >>"}
            </span>
        </div>
    );
});

export default Welcometext;