import useTimer from './hooks/useTimer';
import Timer from './components/Timer';
import Controls from './components/Controls';
import ProgressBar from './components/ProgressBar';

const App = () => {
  const initialTime = 25 * 60;
  const { timeLeft, isRunning, start, pause, reset, background } = useTimer(initialTime);

  return (
    <div >
      {/* <h1 className="text-5xl font-light text-gray-900 mb-12">Pomodoro</h1> */}
      <Timer timeLeft={timeLeft} />
      {/* <ProgressBar timeLeft={timeLeft} initialTime={initialTime} /> */}
      <Controls isRunning={isRunning} onStart={start} onPause={pause} onReset={reset} />
    </div>
  );
};


export default App;
