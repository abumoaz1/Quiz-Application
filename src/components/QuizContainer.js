import React, { useEffect, useState, useCallback } from 'react';
import Question from './Question';
import Timer from './Timer';
import FullScreenPrompt from './FullScreenPrompt';
import QuizEnd from './QuizEnd';
import '../Quiz.css';

const QuizContainer = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('/questions.json')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        loadState();
        startTimer();
      });

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  useEffect(() => {
    saveState();
  }, [currentQuestionIndex, timeLeft, userAnswers]);

  const handleFullScreenChange = () => {
    setIsFullScreen(!!document.fullscreenElement);
  };

  const requestFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    }
  };

  const loadState = useCallback(() => {
    const savedIndex = localStorage.getItem('currentQuestionIndex');
    const savedTime = localStorage.getItem('timeLeft');
    const savedAnswers = localStorage.getItem('userAnswers');

    if (savedIndex !== null) {
      setCurrentQuestionIndex(parseInt(savedIndex, 10));
    }
    if (savedTime !== null) {
      setTimeLeft(parseInt(savedTime, 10));
    }
    if (savedAnswers !== null) {
      setUserAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const saveState = useCallback(() => {
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    localStorage.setItem('timeLeft', timeLeft);
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  }, [currentQuestionIndex, timeLeft, userAnswers]);

  const startTimer = useCallback(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          endQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, []);

  const selectAnswer = (choiceIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = choiceIndex;
    setUserAnswers(newAnswers);

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex >= questions.length - 1) {
      endQuiz();
    }
  };

  const endQuiz = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        score++;
      }
    });
    setScore(score);
    setShowResult(true);
  };

  if (!isFullScreen) {
    return <FullScreenPrompt requestFullScreen={requestFullScreen} />;
  }

  if (showResult) {
    return <QuizEnd score={score} totalQuestions={questions.length} />;
  }

  if (currentQuestionIndex >= questions.length) {
    return <div className="quiz-end">Quiz ended. Thank you for participating!</div>;
  }

  return (
    <div className="quiz-container">
      <Timer timeLeft={timeLeft} />
      <div className="question-number">Question {currentQuestionIndex + 1} of {questions.length}</div>
      {questions.length > 0 && (
        <Question 
          questionData={questions[currentQuestionIndex]} 
          selectAnswer={selectAnswer} 
        />
      )}
    </div>
  );
};

export default QuizContainer;
