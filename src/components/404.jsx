import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import rightLegLight from "../assets/DINO/Chrome_T-Rex_Right_Run.png";
import rightLegDark from "../assets/DINO/Chrome_T-Rex_Right_Run_forblackmode.png";
import leftLegLight from "../assets/DINO/Chrome_T-Rex_Left_Run.png";
import leftLegDark from "../assets/DINO/Chrome_T-Rex_Left_Run_forblackmode.png";
import horizon from "../assets/DINO/Chromium_T-Rex-horizon.png";
import cactus from "../assets/cactus.png";

const Sprites = {
  light: [rightLegLight, leftLegLight],
  dark: [rightLegDark, leftLegDark],
};

const Gravity = 0.9;
const Jump_velocity = -15;
const Ground_y = 0;
const Dino_size = 48;
const Obstacle_width = 28;
const Base_speed = 6;

export default function Notfound() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() =>
    Number(localStorage.getItem("dino-best") || 0),
  );
  const dinoYRef = useRef(0);
  const velocityRef = useRef(0);
  const isJumpingRef = useRef(false);
  const frameIndexRef = useRef(0);
  const obstaclesRef = useRef([]);
  const speedRef = useRef(Base_speed);
  const scoreRef = useRef(0);
  const rafRef = useRef(null);
  const spawnTimerRef = useRef(0);
  const nextSpawnRef = useRef(60);

  const dinoElRef = useRef(null);
  const playAreaRef = useRef(null);
  const obstacleElsRef = useRef(new Map());

  const resetGame = () => {
    dinoYRef.current = 0;
    velocityRef.current = 0;
    isJumpingRef.current = false;
    obstaclesRef.current = [];
    speedRef.current = Base_speed;
    scoreRef.current = 0;
    spawnTimerRef.current = 0;
    nextSpawnRef.current = 60 + Math.random() * 40;
    setScore(0);
    setGameOver(false);
  };

  const startGame = () => {
    resetGame();
    setRunning(true);
  };

  const jump = () => {
    if (isJumpingRef.current || !running || gameOver) return;
    isJumpingRef.current = true;
    velocityRef.current = Jump_velocity;
  };
  useEffect(() => {
    const onKeydown = (e) => {
      if (e.code !== "Space" && e.code !== "ArrowUp") return;
      e.preventDefault();
      if (!running && !gameOver) startGame();
      else if (gameOver) startGame();
      else jump();
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [running, gameOver]);
  useEffect(() => {
    if (!running) return;
    let obstacleIdCounter = 0;

    const tick = () => {
      if (isJumpingRef.current) {
        velocityRef.current += Gravity;
        dinoYRef.current += velocityRef.current;
        if (dinoYRef.current >= Ground_y) {
          dinoYRef.current = Ground_y;
          isJumpingRef.current = false;
          velocityRef.current = 0;
        }
      }

      frameIndexRef.current += isJumpingRef.current ? 0 : 0.2;
      if (dinoElRef.current) {
        dinoElRef.current.style.transform = `translateY(${dinoYRef.current}px)`;
        const frames = Sprites[theme];
        dinoElRef.current.src =
          frames[Math.floor(frameIndexRef.current) % frames.length];
      }

      spawnTimerRef.current += 1;
      if (spawnTimerRef.current >= nextSpawnRef.current) {
        spawnTimerRef.current = 0;
        nextSpawnRef.current = 55 + Math.random() * 45;
        const playWidth = playAreaRef.current?.clientWidth ?? 800;
        obstaclesRef.current.push({ id: obstacleIdCounter++, x: playWidth });
      }

      const dinoLeft = 24;
      const dinoRight = dinoLeft + Dino_size;
      const dinoTop = -dinoYRef.current;
      const dinoBottom = dinoTop + Dino_size;

      let collided = false;
      obstaclesRef.current = obstaclesRef.current.filter((ob) => {
        ob.x -= speedRef.current;

        const obLeft = ob.x;
        const obRight = ob.x + Obstacle_width;
        const obTop = 0;
        const obBottom = Dino_size * 0.8;

        const overlapX = obRight > dinoLeft && obLeft < dinoRight;
        const overlapY = obBottom > dinoTop && obTop < dinoBottom;
        if (overlapX && overlapY) collided = true;

        return ob.x > -Obstacle_width;
      });

      obstaclesRef.current.forEach((ob) => {
        const el = obstacleElsRef.current.get(ob.id);
        if (el) el.style.transform = `translateX(${ob.x}px)`;
      });

      if (collided) {
        setRunning(false);
        setGameOver(true);
        const finalScore = Math.floor(scoreRef.current);
        setBest((b) => {
          const nb = Math.max(b, finalScore);
          localStorage.setItem("dino-best", nb);
          return nb;
        });
        return;
      }

      scoreRef.current += 0.15;
      speedRef.current = Base_speed + scoreRef.current * 0.01;
      setScore(Math.floor(scoreRef.current));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, theme]);
  return (
    <>
      <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-backgrounddark px-6 overflow-hidden">
        <h1 className="font-pixel text-6xl text-dino-text mb-2">404</h1>
        <p className="font-retro text-3xl text-textdark mb-6">
          {" "}
          oh i think ur off the page
        </p>
        <div
          ref={playAreaRef}
          className="relative w-full max-w-2xl h-40 border-2 border-dashed border-gray-400 rounded-lg overflow-hidden bg-backgrounddark "
          onClick={() => (!running && !gameOver ? startGame() : jump())}
        >
          <div
            className="absolute bottom-0 left-0 w-full h-6"
            style={{
              backgroundImage: `url(${horizon})`,
              backgroundRepeat: "repeat-x",
              imageRendering: "pixelated",
            }}
          />
          <img
            className="absolute bottom-6 left-6 pixel-art select-none"
            style={{ width: Dino_size, height: Dino_size }}
            ref={dinoElRef}
            src={Sprites[theme][0]}
            alt="dino"
          />

          {obstaclesRef.current.map((ob) => (
            <img
              key={ob.id}
              ref={(el) => {
                if (el) obstacleElsRef.current.set(ob.id, el);
                else obstacleElsRef.current.delete(ob.id);
              }}
              src={cactus}
              alt=""
              className="absolute bottom-6 pixel-art select-none"
              style={{
                width: Obstacle_width,
                transform: `translateX(${ob.x}px)`,
              }}
            />
          ))}

          {!running && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center font-pixel text-dino-text bg-backgrounddark/70">
              click or press space to start :3{" "}
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 font-pixel text-dino-text bg-backgrounddark/80 dark:bg-backgroundlight/80">
              <span>game over — {score}</span>
              <span className="text-sm opacity-70">best: {best}</span>
              <span className="text-sm">press space to retry</span>
            </div>
          )}
        </div>
        <div className="font-pixel text-lg text-dino-text mt-4">
          ur score: {score}{" "}
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 font-pixel text-base bg-subtextdark text-textdark px-6 py-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition transform duration-150 hover:-translate-y-1 active:translate-y-0 active:shadow-none"
        >
          back home
        </button>
      </div>
    </>
  );
}