export default function PlayClock({ playClock, resetPlayClock }) {
  return (
    <div className="play-clock" onClick={resetPlayClock}>
      {playClock}s
    </div>
  );
}
