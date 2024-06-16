import React from 'react';

const QuizEnd = ({ score, totalQuestions }) => {
  return (
    <div className="quiz-end">
      <h2>Quiz Ended</h2>
      <p>Your Score: {score} / {totalQuestions}</p>
    </div>
  );
};

export default QuizEnd;
