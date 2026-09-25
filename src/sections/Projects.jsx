import fontsiteimg from "../assets/fontsiteimg.png";
import selfonashelf from "../assets/selfonashelf.png";

function Projects() {
  const projects = [
    {
      id: 1,
      name: "can u font?",
      line: "get ur self a handmade font(u make it urself)",
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

  return (
    <section
      className="relative w-screen dark:bg-backgrounddark items-center h-screen shrink-0 bg-backgroundlight flex flex-col justify-center py-6 px-6 border-r border-dashed overflow-hidden"
      id="projects"
    >
      <div>
        <h1 className="font-pixel text-dino-text dark:text-backgroundlight text-3xl p-5 hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)] transition transform duration-300">
          Kn1ghtmere's Crafted
        </h1>

        <div className=" dark:bg-itemsdark dark:border-foregrounddark  h-auto w-auto p-4 bg-itemslight  rounded-lg border-2 border-black shadow-[6px_6px_4px_0px_rgba(0,0,0,0.3)]">
          <div className="flex flex-row gap-4">
            {projects.map((project) => (
              <div key={project.id} className="w-auto  shrink-0">
                {project.screenshot && (
                  <>
                    <h2 className="font-pixel dark:text-foregrounddark text-[25px] p-5  px-40 text-backgrounddark">{project.name}</h2>
                    <img
                      src={project.screenshot}
                      alt={project.name}
                      className="rounded-md w-full shadow-[0_0_10px_rgba(0,0,0,0.3)] border-2 border-[#123123] size-60 object-cover"
                    />
                  </>
                )}

                <p className="font-retro text-backgrounddark dark:text-foregrounddark text-xl">{project.line}</p>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-lg dark:text-foregrounddark font-retro text-[#4d4d4d]"
                >
                  Github
                </a>

                {project.deployedlink && (
                  <a
                    href={project.deployedlink}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-lg dark:text-foregrounddark font-retro text-[#4d4d4d] ml-2"
                  >
                    Live
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;