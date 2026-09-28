import {useTheme} from "../context/ThemeContext"

export default function ThemeToggle(){
    const {theme, toggleTheme} = useTheme();
    const isDark = theme === "dark";

    return (
        <>
        <button onClick={toggleTheme} aria-label="Toggle Theme" className="relative rounded-[5px] w-12 h-12 border-4 border-dino-text bg-backgroundlight dark:bg-backgrounddark shadow-[3px_3px_0px_0px_rgba(0,0,0,0,0.3)] transition transform duration-150   active:shadow-none flex items-center justify-center">
            <span className="font-pixel rounded-sm text-lg text-dino-text">
                {isDark ? "☾" : "☀" }
            </span>
        </button>
        </>
    )
}