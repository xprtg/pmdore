import React from 'react';

interface ProgressBarProps {
  timeLeft: number;
  initialTime: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ timeLeft, initialTime }) => {
  const progress = (timeLeft / initialTime) * 100;

  return (
    <div className="w-full max-w-lg bg-gray-200 h-3 rounded-full overflow-hidden mt-8">
      <div
        className="h-3 bg-blue-600 transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
