import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isRunning, onStart, onPause, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 space-y-4">
      {isRunning ? (
        <button
          onClick={onPause}
          className="flex items-center justify-center gap-3 w-64 py-5 bg-gray-200 text-gray-800 font-medium rounded-xl shadow-lg hover:bg-gray-300 transition-all duration-300 active:scale-95"
        >
          <Pause size={24} />
          Pause
        </button>
      ) : (
        <button
          onClick={onStart}
          className="flex items-center justify-center gap-3 w-64 py-5 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 active:scale-95"
        >
          <Play size={24} />
          Start
        </button>
      )}
      {isRunning && <button
        onClick={onReset}
        className="flex items-center justify-center gap-3 w-64 py-5 bg-gray-200 text-gray-800 font-medium rounded-xl shadow-lg hover:bg-gray-300 transition-all duration-300 active:scale-95"
      >
        <RotateCcw size={24} />
        Reset
      </button>}
    </div>
  );
};

export default Controls;
