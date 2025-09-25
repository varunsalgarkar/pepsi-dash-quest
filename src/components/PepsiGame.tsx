import { useState, useEffect } from "react";
import { GameStart } from "./GameStart";
import { GameQuestion } from "./GameQuestion";
import { GameResults } from "./GameResults";
import { fetchQuestions, getRandomQuestions, Question } from "@/data/gameData";

type GameState = "start" | "playing" | "results";

export const StingGame = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(5);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  // Load questions on component mount and when questions count changes
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      const allQuestions = await fetchQuestions();
      const selectedQuestions = getRandomQuestions(allQuestions, questionsCount);
      setGameQuestions(selectedQuestions);
      setLoading(false);
    };
    
    loadQuestions();
  }, [questionsCount]);

  const handleStart = async () => {
    // Refresh questions for new game
    setLoading(true);
    const allQuestions = await fetchQuestions();
    const selectedQuestions = getRandomQuestions(allQuestions, questionsCount);
    setGameQuestions(selectedQuestions);
    setGameState("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
    setLoading(false);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }
    
    // Move to next question or end game
    if (currentQuestionIndex + 1 < gameQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTimeout(() => {
        setGameState("results");
      }, 1000);
    }
  };

  const handleRestart = () => {
    setGameState("start");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center sting-bg">
        <div className="text-sting-gold text-lg">Loading questions...</div>
      </div>
    );
  }

  if (gameState === "start") {
    return (
      <GameStart 
        onStart={handleStart} 
        questionsCount={questionsCount}
        onQuestionsCountChange={setQuestionsCount}
      />
    );
  }

  if (gameState === "results") {
    return (
      <GameResults
        score={score}
        totalQuestions={gameQuestions.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <GameQuestion
      question={gameQuestions[currentQuestionIndex]}
      onAnswer={handleAnswer}
      onRestart={handleRestart}
      currentScore={score}
      totalQuestions={gameQuestions.length}
      currentQuestionIndex={currentQuestionIndex}
    />
  );
};