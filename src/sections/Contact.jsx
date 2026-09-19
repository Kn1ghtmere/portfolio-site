import { BsGithub, BsInstagram } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { href } from "react-router-dom";


function Contact(){

    const socials = [
        {name:"Discord", icon: <FaDiscord color="#5865F2"/>, href:"https://discord.com/users/872001251502587914"},
        {name:"Github", icon: <BsGithub color="#181717"/>, href:"https://github.com/Kn1ghtmere"},
        {name:"Instagram", icon: <BsInstagram color="##E4405F"/>, href:"https://www.instagram.com/kn1ghtmere/"},
    
    ] 


    return(
        <>
        <section className="w-screen bg-backgrounddark h-screen flex py-12 px-8 shrink-0 border-r border-dashed" id="contact">
            <div className="w-1/2 flex items-start justify-end ">
            <h1 className="text-dino-surface text-3xl font-pixel  hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition transform duration-200  decoration-2 underline-offset-4 ">Socials & Ways to connect</h1>
            <div>
                
            </div>
            </div>
        </section>
        </>

    )
}
export default Contact;