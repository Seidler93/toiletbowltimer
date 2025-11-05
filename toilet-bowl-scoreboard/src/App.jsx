import { useState, useEffect } from "react";
import "./App.css";
import EditModal from "./components/Editmodal";
import GameClock from "./components/Gameclock";
import ScoreBoard from "./components/Scoreboard";
import PlayClock from "./components/Playclock";

export default function App() {
  const [gameTime, setGameTime] = useState(20 * 60); // 20 min default
  const [running, setRunning] = useState(false);

  const [playClock, setPlayClock] = useState(25);
  const [playClockLength, setPlayClockLength] = useState(25);

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const [homeTimeouts, setHomeTimeouts] = useState(3);
  const [awayTimeouts, setAwayTimeouts] = useState(3);

  const [showTimeoutOverlay, setShowTimeoutOverlay] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Game Clock Running Logic
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setGameTime(t => Math.max(t - 1, 0)), 1000);
    return () => clearInterval(interval);
  }, [running]);

  // Play Clock Running Logic
  useEffect(() => {
    if (!running || showTimeoutOverlay || playClock <= 0) return;
    const interval = setInterval(() => setPlayClock(c => c - 1), 1000);
    return () => clearInterval(interval);
  }, [running, showTimeoutOverlay, playClock]);

  // Sound Cue at <= 5 seconds
  useEffect(() => {
    if (playClock <= 5 && playClock > 0) new Audio("/beep5s.mp3").play();
  }, [playClock]);

  const toggleGameClock = () => setRunning(r => !r);
  const resetPlayClock = () => setPlayClock(playClockLength);

  const triggerTimeout = (team) => {
    if (team === "home" && homeTimeouts <= 0) return;
    if (team === "away" && awayTimeouts <= 0) return;

    if (team === "home") setHomeTimeouts(t => t - 1);
    if (team === "away") setAwayTimeouts(t => t - 1);

    setRunning(false);
    setShowTimeoutOverlay(true);
  };

  const resumeFromTimeout = () => setShowTimeoutOverlay(false);

  const formatTime = secs =>
    `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;

  return (
    <div className="app">

      {showTimeoutOverlay && (
        <div className="timeout-overlay" onClick={resumeFromTimeout}>
          TIMEOUT
        </div>
      )}

      <GameClock
        gameTime={gameTime}
        toggleGameClock={toggleGameClock}
      />

      <PlayClock
        playClock={playClock}
        resetPlayClock={resetPlayClock}
      />

      <ScoreBoard
        homeScore={homeScore} setHomeScore={setHomeScore}
        awayScore={awayScore} setAwayScore={setAwayScore}
        homeTimeouts={homeTimeouts} awayTimeouts={awayTimeouts}
        triggerTimeout={triggerTimeout}
      />

      <button className="edit-btn" onClick={() => setShowEditModal(true)}>EDIT</button>

      {showEditModal && (
        <EditModal
          close={() => setShowEditModal(false)}
          gameTime={gameTime} setGameTime={setGameTime}
          playClockLength={playClockLength} setPlayClockLength={setPlayClockLength}
          homeScore={homeScore} setHomeScore={setHomeScore}
          awayScore={awayScore} setAwayScore={setAwayScore}
          homeTimeouts={homeTimeouts} setHomeTimeouts={setHomeTimeouts}
          awayTimeouts={awayTimeouts} setAwayTimeouts={setAwayTimeouts}
        />
      )}
    </div>
  );
}
