import cactus from "..assets/cactus.png";
import threecactus from "../assets/3cactus.png";
import chromedino from "../assets/chromedino.png";
import dragon from "../assets/dragon.png";
import ground from "../assets/Ground.png";

const stack = [
  { label: "React", detail: "component work, hooks, state" },
  { label: "Tailwind", detail: "styling, animation, themes, responsive" },
  { label: "Javascript", detail: "logic, automation, system design " },
  { label: " HTML", detail: "structure, body, tags" },
  { label: "CSS", detail: "basic styling, colors, themes" },
];
const stats = [
  { value: "1+", label: "years building" },
  { value: "4+", label: "shipped projects" },
  { value: "infinite", label: "dino obsession" },
];
function About() {
  return (
    <>
      <section
        id="#about"
        className="relative w-screen h-screen shrink-0 bg-backgroundlight flex flex-col justify-center py-6 px-6 border-r border-dashed overflow-hidden"
      >
        <img
          src={dragon}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-14 -bottom-10 w-56 opacity-[0.07] rotate-6"
        />
        <div className="relative z-10 flex flex-col gap-6 max-w-2xl mx-auto w-full">
          <div>
            <h1 className="font-pixel text-dino-text text-2xl">About me</h1>
            <p className="font-retro text-base text-dino-text mt-3 leading-relaxed">
              i am a developer obsessed with hardware and peak cartoons that
              were best of best in thier respective eras, im a 18 years old and
              i am persuaing a degree in Bachelors of Computer Science.
            </p>
          </div>
          <div className="flex items-center gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-pixel text-dino-text text-2xl">
                  {s.value}
                </span>
                <span className="font-retro text-md text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default About;
