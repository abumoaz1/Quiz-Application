import React from 'react';

const Question = ({ questionData, selectAnswer }) => {
  const alphabet = ['A', 'B', 'C', 'D'];

  return (
    <div>
      <div className="question">{questionData.question}</div>
      <div className="choices">
        {questionData.choices.map((choice, index) => (
          <button key={index} onClick={() => selectAnswer(index)}>
            <strong>{alphabet[index]}.</strong> {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
