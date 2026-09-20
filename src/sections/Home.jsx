import About from "../components/About";

export default function Home() {
    return (
        <div className="w-screen h-full shrink-0 flex items-start justify-start border-r border-dashed border-gray-400">
           <div className="pl-60 pt-50">
            <h1 className="pb-20 font-pixel text-6xl text-foregroundlight dark:text-white">
                Wassupp...
            </h1>
            <span className="font-retro text-3xl text-textlight dark:text-foregrounddark">
               <span>Welcome to Kn1ghtmere's Archive</span><br></br>
               <span>Feel free to look around</span><br></br>
               <span></span>
               
            </span>
            <div className="mt-8">
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
