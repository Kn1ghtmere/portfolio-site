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

const Gravityy = 0.9;
const Jump_velocity = -15;
const Ground_y = 0;
const Dino_size = 48;
const Obstacle_width = 28;
const Base_speed = 6;

export default function () {
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
  const speedRef = useRef(BASE_SPEED);
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
    obstacleRef.current = [];
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
    window.addEventListener("keydown", onkeydown);
    return () => window.removeEventListener("keydown", onkeydown);
  }, [running, gameOver]);

  useEffect(() =>{
    if (!running) return;
    let obstacleIdCounter = 0;

  })



}
