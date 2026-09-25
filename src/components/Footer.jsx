export default function Footer() {
    return (
        <footer className="w-screen min-h-[30vh] flex flex-col items-center justify-center gap-4 bg-textdark dark:bg-subtextlight font-pixel px-6 text-center">
            <p className="text-sm opacity-70">Made by Kn1ghtmere and Subhan</p>
            <p>Project for thirdspace.hackclub.com</p>
            <p className="font-retro text-sm opacity-50 mt-6">
                © {new Date().getFullYear()} kn1ghtmere
            </p>
        </footer>
    );
}