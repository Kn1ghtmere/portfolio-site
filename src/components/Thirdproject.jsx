import {useState} from "react";

export default function Thirdproject({title, children}) {
    const [open, setOpen] = useState(false);

    return(
        <div className= "flex flex-row items-center">
            <button
            onClick={() => setOpen((o) => !o)}
            className="flex flex-row items-center gap-3 font-pixel text-foregroundlight dark:text-foregrounddark whitespace-nowrap"
            >
                <span>{title}</span>
                <span
                className={'inline-block transition-transform duration-300 ${ open ? "rotate-180" : "rotate-0"}'}
                >
                    {"›"}
                </span>
            </button>

            <div
                className="grid transition-[grid-template-columns] duration-300 ease-in-out"
                style={{gridTemplateColumns:open ? "1fr" : "0fr"}}
            >
                <div className="overflow-hidden">
                    <p className="font-retro text-2xl text-subtextlight dark:text-subtextdark pl-3 whitespace-nowrap">
                        {children}
                    </p>
                </div>
            </div>
        </div>
    );
}