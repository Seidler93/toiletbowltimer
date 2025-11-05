export default function EditModal({
  close,
  gameTime, setGameTime,
  playClockLength, setPlayClockLength,
  homeScore, setHomeScore,
  awayScore, setAwayScore,
  homeTimeouts, setHomeTimeouts,
  awayTimeouts, setAwayTimeouts
}) {
  const update = setter => e => setter(Number(e.target.value));

  return (
    <div className="modal">
      <div className="modal-content">

        <label>Game Time (seconds):</label>
        <input type="number" value={gameTime} onChange={update(setGameTime)}/>

        <label>Play Clock Length:</label>
        <input type="number" value={playClockLength} onChange={update(setPlayClockLength)}/>

        <label>Home Score:</label>
        <input type="number" value={homeScore} onChange={update(setHomeScore)}/>

        <label>Away Score:</label>
        <input type="number" value={awayScore} onChange={update(setAwayScore)}/>

        <label>Home Timeouts:</label>
        <input type="number" value={homeTimeouts} onChange={update(setHomeTimeouts)}/>

        <label>Away Timeouts:</label>
        <input type="number" value={awayTimeouts} onChange={update(setAwayTimeouts)}/>

        <button onClick={close}>Done</button>
      </div>
    </div>
  );
}
