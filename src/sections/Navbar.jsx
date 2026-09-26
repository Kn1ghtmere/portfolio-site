import { forwardRef, useState } from "react";
import { scrollToId } from "../hooks/useDinoScroll";

function NavLink({ id, children, isActive, onClick }) {
  return (
    <button
      onClick={() => {
        scrollToId(id);
        onClick?.();
      }}
      className={`relative font-pixel text-[22px] flex items-center transform transition duration-200 hover:translate-y-2 active:translate-y-1
        ${isActive ? "text-dino-text opacity-100" : "text-dino-text opacity-60"}`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-dino-text" />
      )}
    </button>
  );
}

const Navbar = forwardRef(function Navbar(_, ref) {
  const [active, setActive] = useState("about");

  const links = [
    { id: "about", label: "about." },
    { id: "work", label: "work." },
    { id: "contact", label: "contact." },
  ];

  return (
    <nav
      ref={ref}
      className="bg-backgroundlight dark:bg-backgrounddark h-auto fixed top-0 inset-x-0 z-50 text-foregroundlight dark:text-subtextdark font-pixel"
    >
      <div className="flex items-center justify-between px-8 py-9">
        <button
          onClick={() => {
            scrollToId("about");
            setActive("about");
          }}
          className="text-[26px] font-bold text-subtextlight dark:text-white transition transform duration-200 hover:translate-y-1 active:translate-y-0.5 cursor-pointer"
        >
          Kn1ghtmere
        </button>

        <div className="flex gap-12">
          {links.map((link) => (
            <NavLink
              key={link.id}
              id={link.id}
              isActive={active === link.id}
              onClick={() => setActive(link.id)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
});

export default Navbar;