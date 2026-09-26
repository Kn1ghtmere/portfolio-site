import fontsiteimg from "../assets/fontsiteimg.png";
import selfonashelf from "../assets/selfonashelf.png";
import cactus from "../assets/cactus.png";
import chromedino from "../assets/chromedino.png";
import dragon from "../assets/dragon.png";

const projects = [
  {
    id: 1,
    name: "can u font?",
    line: "get ur self a handmade font (u make it urself)",
    github: "https://github.com/Kn1ghtmere/fonts",
    deployedlink: "https://fonts-nu-three.vercel.app/fonts.html",
    screenshot: fontsiteimg,
  },
  {
    id: 2,
    name: "selfonashelf",
    line: "ig this is very much creative",
    github: "https://github.com/Kn1ghtmere/selfonashelf",
    deployedlink: "https://selfonashelf.vercel.app/",
    screenshot: selfonashelf,
  },
];

function Projects() {
  return (
    <section
      className="relative w-screen h-screen shrink-0 bg-backgroundlight dark:bg-backgrounddark flex flex-col justify-center py-6 px-6 border-r border-dashed overflow-hidden"
      id="projects"
    >
      <style>{`
        @keyframes dino-hop {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>

      <img
        src={dragon}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-10 -top-10 w-48 opacity-[0.07] rotate-12"
      />

      <div className="relative z-10 flex flex-col justify-start p-2 max-w-4xl mx-auto w-full">
        <h1 className="text-textlight dark:text-white text-2xl font-pixel text-center hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)] transition transform duration-300 decoration-2 underline-offset-4">
          Kn1ghtmere's Crafted
        </h1>

        <div className="py-3 flex flex-wrap gap-6 justify-center">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative w-full max-w-sm bg-[#F7F5F0] border-2 border-dino-text rounded-2xl overflow-hidden shadow-[6px_6px_4px_0px_rgba(0,0,0,0.3)]"
            >
              <div
                className="absolute top-0 right-0 w-5 h-5 bg-backgroundlight border-b-2 border-l-2 border-dino-text dark:border-subtextdark"
                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              />

              <div className="flex items-center justify-between gap-3 px-5 py-3 border-b-2 border-dashed border-gray-400">
                <div className="flex flex-col font-mono">
                  <span className="text-xs uppercase tracking-widest text-gray-500">
                    Project
                  </span>
                  <span className="font-pixel text-lg text-black">{project.name}</span>
                </div>
                <img
                  src={chromedino}
                  alt=""
                  aria-hidden="true"
                  className="h-9 shrink-0 animate-[dino-hop_0.6s_ease-in-out_infinite]"
                />
              </div>

              {project.screenshot && (
                <div className="px-5 py-3 border-b-2 border-dashed border-gray-400">
                  <img
                    src={project.screenshot}
                    alt={project.name}
                    className="rounded-md w-full h-48 object-cover border-2 border-dino-text shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                  />
                </div>
              )}

              <div className="flex items-center justify-between gap-3 px-5 py-3">
                <p className="font-retro text-lg text-black">{project.line}</p>
                <img
                  src={cactus}
                  alt=""
                  aria-hidden="true"
                  className="h-8 opacity-70 shrink-0"
                />
              </div>
              
              <div className="flex items-center gap-4 px-5 py-3 bg-[#EFEDE7] border-t-2 border-dashed border-gray-400 font-retro text-base">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-[#4d4d4d] hover:text-dino-accent transition-colors"
                >
                  Github
                </a>
                {project.deployedlink && (
                  <a
                    href={project.deployedlink}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-[#4d4d4d] hover:text-dino-accent transition-colors"
                  >
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;