export default function Footer() {
  const links = [
    { label: "Github", href: "https://github.com/Kn1ghtmere" },
    { label: "thirdspace.hackclub.com", href: "https://thirdspace.hackclub.com" },
  ];

  return (
    <footer className="relative w-screen bg-backgroundlight dark:bg-backgrounddark text-foregroundlight dark:text-subtextdark font-pixel px-8 py-14 border-t border-dashed">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10 text-center">
        <a
          href="#home"
          className="text-[32px] font-bold text-subtextlight dark:text-white transition transform duration-200 hover:translate-y-1 active:translate-y-0.5 cursor-pointer"
        >
          Kn1ghtmere
        </a>

        <div className="flex flex-wrap items-center justify-center gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="relative text-[20px] text-dino-text opacity-60 hover:opacity-100 transform transition duration-200 hover:-translate-y-1 active:translate-y-0"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="w-full max-w-xs h-px border-t border-dashed border-gray-400 dark:border-gray-600" />

        <div className="flex flex-col sm:flex-row items-center gap-2 text-sm opacity-60">
          <span>Made by Kn1ghtmere &amp; Subhan</span>
          <span className="hidden sm:inline">•</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}