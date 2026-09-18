import chromedinopng from "../assets/chromedino.png";
import cactus from "../assets/cactus.png";

function Navbar() {
  return (
    <>
      <nav className="bg-dino-bg h-auto sticky text-white font-pixel top-0">
        <div className="flex items-center justify-between px-8 py-3 ">
          <div className="flex items-center justify-end ">
            <img src={chromedinopng} alt="chromedinoimageeee" className="size-18"></img>
          </div>

          <div className=" flex gap-12">
            <div className="flex items-center ">
              <img src={cactus} alt="cactus imggggggggggg"className="h-12"></img>
            </div>
            <div>
              <a
                className="font-pixel text-[22px] text-dino-text flex items-center transform transition duration-200 hover:translate-y-2 active:translate-y-1"
                href="#about"
              >
                about.
              </a>
            </div>
            <div>
              <a className="font-pixel text-[22px] text-dino-text flex items-center  transform transition duration-200 hover:translate-y-2 active:translate-y-1 
              " href="#about">
                work.
              </a>
            </div>
            <div>
              <a className="font-pixel text-[22px] text-dino-text flex items-center  transform transition duration-200 hover:translate-y-2 active:translate-y-1 " href="#about">
                contact.
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
