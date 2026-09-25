import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { SiChessdotcom } from "react-icons/si";
import cactus from "../assets/cactus.png";
import threeCactus from "../assets/3cactus.png";
import chromedino from "../assets/chromedino.png";
import dragon from "../assets/dragon.png";
import ground from "../assets/Ground.png";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const socials = [
  {
    name: "Discord",
    icon: <FaDiscord />,
    href: "https://discord.com/users/872001251502587914",
  },
  {
    name: "Github",
    icon: <BsGithub />,
    href: "https://github.com/Kn1ghtmere",
  },
  {
    name: "Instagram",
    icon: <BsInstagram />,
    href: "https://www.instagram.com/kn1ghtmere/",
  },
  {
    name: "Chess",
    icon: <SiChessdotcom />,
    href: "https://www.chess.com/member/kn1ghtmeere",
  },
];

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, { publicKey: PUBLIC_KEY })
      .then(
        () => {
          setStatus("sent");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error?.text);
          setStatus("error");
        }
      );
  };

  return (
    <section
      className="relative w-screen h-screen shrink-0 bg-backgroundlight flex flex-col justify-center py-6 px-6 border-r border-dashed overflow-hidden"
      id="contact"
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

      <div className="relative z-10 flex flex-col justify-start p-2 max-w-2xl mx-auto w-full">
        <h1 className="text-dino-text text-3xl font-pixel hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)] transition transform duration-300 decoration-2 underline-offset-4">
          Socials & ways to connect
        </h1>

        <div className="py-3">
          <div className="bg-[#EAEAEA] flex flex-wrap shadow-[6px_6px_4px_0px_rgba(0,0,0,0.3)] justify-center items-center gap-6 md:gap-10 p-4 rounded-lg">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="group flex flex-col items-center justify-center gap-2 transform transition duration-200 hover:-translate-y-2 active:translate-y-0 font-bold"
              >
                <div className="text-4xl text-[#535353] transition-colors duration-200 group-hover:text-dino-accent">
                  {social.icon}
                </div>
                <p className="font-retro text-center text-base">{social.name}</p>
              </a>
            ))}
          </div>
        </div>

        <h1 className="font-pixel py-2 text-dino-text text-2xl">Email me</h1>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="relative bg-[#F7F5F0] border-2 border-dino-text rounded-2xl overflow-hidden shadow-[6px_6px_4px_0px_rgba(0,0,0,0.3)]"
        >
          <div
            className="absolute top-0 right-0 w-5 h-5 bg-backgroundlight border-b-2 border-l-2 border-dino-text"
            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
          />

          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b-2 border-dashed border-gray-400">
            <div className="flex flex-col w-full font-mono">
              <label htmlFor="user_name" className="text-xs uppercase tracking-widest text-gray-500">
                Your Name
              </label>
              <input
                id="user_name"
                type="text"
                name="user_name"
                required
                disabled={status === "sending"}
                className="bg-transparent border-none outline-none w-full text-lg text-dino-text placeholder-gray-400"
                placeholder="enter yo name"
              />
            </div>
            <img
              src={chromedino}
              alt=""
              aria-hidden="true"
              className="h-9 shrink-0 animate-[dino-hop_0.6s_ease-in-out_infinite]"
            />
          </div>

          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b-2 border-dashed border-gray-400">
            <div className="flex flex-col w-full font-mono">
              <label htmlFor="user_email" className="text-xs uppercase tracking-widest text-gray-500">
                Email Address
              </label>
              <input
                id="user_email"
                type="email"
                name="user_email"
                required
                disabled={status === "sending"}
                className="bg-transparent border-none outline-none w-full text-lg text-dino-text placeholder-gray-400"
                placeholder="whats yo email"
              />
            </div>
            <img className="h-8 opacity-70 shrink-0" src={cactus} alt="" />
          </div>

          <div className="flex items-center justify-between gap-3 px-5 py-3">
            <div className="flex flex-col w-full font-mono">
              <label htmlFor="message" className="text-xs uppercase tracking-widest text-gray-500">
                Subject
              </label>
              <input
                id="message"
                type="text"
                name="message"
                required
                disabled={status === "sending"}
                className="bg-transparent border-none outline-none w-full text-lg text-dino-text placeholder-gray-400"
                placeholder="the reason u want to send the email"
              />
            </div>
            <img className="h-9 opacity-80 shrink-0" src={threeCactus} alt="" aria-hidden="true" />
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap px-5 py-3 bg-[#EFEDE7] border-t-2 border-dashed border-gray-400">
            <button
              type="submit"
              disabled={status === "sending"}
              className="font-pixel text-base bg-dino-text text-backgroundlight px-5 py-2 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition transform duration-150 hover:-translate-y-1 active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:pointer-events-none"
            >
              {status === "sending" ? "Sending..." : "Send it"}
            </button>

            {status === "sent" && (
              <p className="font-retro text-base text-green-700">Sent! les talk soon 🌵</p>
            )}
            {status === "error" && (
              <p className="font-retro text-base text-red-600">
                That didn't go through — try again?
              </p>
            )}
          </div>
        </form>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-6 bg-repeat-x bg-bottom opacity-80"
        style={{ backgroundImage: `url(${ground})`, backgroundSize: "auto 100%" }}
        aria-hidden="true"
      />
    </section>
  );
}

export default Contact;