import About from "../components/About";

export default function Home() {
    return (
        <div 
        id="about"
        className="w-screen h-full shrink-0 flex items-start justify-start bg-backgroundlight dark:bg-backgrounddark">
           <div className="px-6 pt-24 sm:pl-16 sm:pt-32 md:pl-40 md:pt-40">
            <h1 className="pb-6 sm:pb-12 md:pb-20 font-pixel text-2xl sm:text-4xl md:text-6xl text-foregroundlight dark:text-white">
                Wassupp...
            </h1>
            <span className="font-retro text-base sm:text-xl md:text-3xl text-textlight dark:text-foregrounddark">
               <span>Welcome to Kn1ghtmere's Archive</span><br></br>
               <span>Feel free to look around</span><br></br>
               <span></span>
               
            </span>
            <div className="mt-15 mb-20 sm:mt-6 md:mt-8">
                <About title="Who are you?">
                    Hi , im kn1ghtmere and i like to code smtimes,<br></br>
                    im kinda new to it , but im still learning alot.<br></br>
                    im majoring in cyber security , and my fav color is black :{")"}
                </About>
            </div>
            </div>
        </div>
    );
}
