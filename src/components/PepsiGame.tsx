import { useState } from "react";
import { GameStart } from "./GameStart";
import { GameQuestion } from "./GameQuestion";
import { GameResults } from "./GameResults";
import { TruckPath } from "./TruckPath";
import { gameQuestions } from "@/data/gameData";

type GameState = "start" | "playing" | "results";

export const PepsiGame = () => {
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [truckPosition, setTruckPosition] = useState(0);

  const handleStart = () => {
    setGameState("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
    setTruckPosition(0);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
      setTruckPosition(truckPosition + 1);
    }
    // Always move to next question regardless of answer (Enhancement 1)
    
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
    setTruckPosition(0);
  };

  if (gameState === "start") {
    return <GameStart onStart={handleStart} />;
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
    <div className="min-h-screen" style={{background: "var(--gradient-game)"}}>
      {/* Truck Path Component */}
      <div className="p-2 sm:p-4">
        <TruckPath
          currentCheckpoint={truckPosition}
          totalCheckpoints={gameQuestions.length}
          isMoving={true}
        />
      </div>

      {/* Question Component */}
      <GameQuestion
        question={gameQuestions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        onRestart={handleRestart}
        currentScore={score}
        totalQuestions={gameQuestions.length}
      />
    </div>
  );
};