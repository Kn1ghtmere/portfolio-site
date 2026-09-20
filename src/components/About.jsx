import { useState } from "react";

export default function About({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-md">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 font-pixel text-foregroundlight dark:text-foregrounddark"
      >
        <span>{title}</span>
        <span
          className={`inline-block transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ˅
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="font-retro text-2xl text-subtextlight dark:text-subtextdark pt-3">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}