import React from 'react';

const Timer = ({ timeLeft }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="timer">Time Left: {formatTime(timeLeft)}</div>
  );
};

export default Timer;
