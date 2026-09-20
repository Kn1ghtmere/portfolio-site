import { useState, useRef } from "react";

const PARTICLE_COUNT = 10;

function NavLink({ href, children, isActive, onClick }) {
  const [particles, setParticles] = useState([]);

  const burst = () => {
    const newParticles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
      const angle = Math.random() * Math.PI + Math.PI; // spray upward
      const distance = 16 + Math.random() * 28;
      return {
        id: `${Date.now()}-${i}`,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 2 + Math.round(Math.random() * 3),
        delay: Math.random() * 50,
      };
    });
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 500);
  };

  const handleClick = (e) => {
    burst();
    onClick?.(e);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`relative font-pixel text-[22px] flex items-center transform transition duration-200 hover:translate-y-2 active:translate-y-1
        ${isActive ? "text-dino-text opacity-100" : "text-dino-text opacity-60"}`}
    >
      {children}

      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-dino-text" />
      )}

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bg-dino-text pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: "50%",
            top: "50%",
            "--tx": `${p.x}px`,
            "--ty": `${p.y}px`,
            animation: `pixel-burst 450ms steps(6, end) ${p.delay}ms forwards`,
          }}
        />
      ))}
    </a>
  );
}

function Navbar() {
  const [active, setActive] = useState("about");

  const links = [
    { id: "about", label: "about." },
    { id: "work", label: "work." },
    { id: "contact", label: "contact." },
  ];

  return (
    <nav className="bg-dino-surface h-auto fixed top-0 inset-x-0 z-50 text-white font-pixel top-0">
      <div className="flex items-center justify-between px-8 py-9">
        <div className="flex items-center justify-center justify-end">
         <a href="#home" className="text-[26px] font-bold text-dino-text transition transform duration-200 hover:translate-y-1 active:translate-y-0.5 cursor-pointer">
            Kn1ghtmere
          </a>
        </div>

        <div className="flex gap-12">
          {links.map((link) => (
            <div key={link.id}>
              <NavLink
                href={`#${link.id}`}
                isActive={active === link.id}
                onClick={() => setActive(link.id)}
              >
                {link.label}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;