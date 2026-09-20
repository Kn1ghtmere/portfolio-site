import { BsGithub, BsInstagram } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { SiChessdotcom } from "react-icons/si";
import { href } from "react-router-dom";

function Contact() {
  const socials = [
    {
      name: "Discord",
      icon: <FaDiscord color="#5865F2" />,
      href: "https://discord.com/users/872001251502587914",
    },
    {
      name: "Github",
      icon: <BsGithub color="#181717" />,
      href: "https://github.com/Kn1ghtmere",
    },
    {
      name: "Instagram",
      icon: <BsInstagram color="#E4405F" />,
      href: "https://www.instagram.com/kn1ghtmere/",
    },
    {
      name: "Chess",
      icon: <SiChessdotcom color="#81B64C" />,
      href: "https://www.chess.com/member/kn1ghtmeere",
    },
  ];

  return (
    <>
      <section
        className="w-screen bg-backgroundlight h-screen flex py-12 px-8 shrink-0 border-r border-dashed"
        id="contact"
      >
        <div className="flex flex-col justify-start gap-6">
          <h1 className="text-dino-text text-3xl font-pixel  hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)] transition transform duration-300  decoration-2 underline-offset-4 ">
            Socials & Ways to connect
          </h1>
          <div className="">
          <div className="bg-[#EAEAEA] flex grid-cols-4 drop-shadow-[7px_7px_2.6px_3px_rgba(0,0,0,1)] justify-between gap-20  p-5 rounded-2xl">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                className="text-6xl hover:translate-y-2 transform transition duration-200 active:translate-y-1 font-bold"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Contact;
