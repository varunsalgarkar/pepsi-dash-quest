import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  gif: string;
}

interface GameQuestionProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
  onRestart: () => void;
  currentScore: number;
  totalQuestions: number;
}

export const GameQuestion = ({ question, onAnswer, onRestart, currentScore, totalQuestions }: GameQuestionProps) => {
  const [showGif, setShowGif] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Reset state when question changes
  useEffect(() => {
    setShowGif(true);
    setSelectedAnswer(null);
    setAnswered(false);
    setCountdown(5);
  }, [question.id]);

  useEffect(() => {
    if (showGif && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setShowGif(false);
    }
  }, [showGif, countdown]);

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    const correct = answerIndex === question.correctAnswer;
    
    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  if (showGif) {
    return (
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4" style={{background: "var(--gradient-game)"}}>
        <Card className="max-w-xs sm:max-w-md w-full p-4 sm:p-6 md:p-8 text-center bounce-entrance">
          <div className="mb-4">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-pepsi-blue mx-auto mb-2" />
            <h3 className="text-lg sm:text-xl font-bold text-pepsi-blue">Get Ready!</h3>
            <p className="text-foreground/70 text-sm sm:text-base">Question {question.id} coming up...</p>
          </div>
          
          <div className="mb-4 sm:mb-6 relative">
            <img 
              src={question.gif} 
              alt="Question preview" 
              className="w-full h-32 sm:h-40 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-pepsi-blue/20 flex items-center justify-center rounded-lg">
              <div className="text-3xl sm:text-4xl font-bold text-pepsi-white">
                {countdown}
              </div>
            </div>
          </div>
          
          <div className="text-xs sm:text-sm text-foreground/60">
            Auto-starting in {countdown} seconds...
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4" style={{background: "var(--gradient-game)"}}>
      <div className="max-w-xs sm:max-w-2xl md:max-w-4xl w-full">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground/70">
              Question {question.id} of {totalQuestions}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-pepsi-blue">
                Revenue: ${currentScore}M
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={onRestart}
                className="border-pepsi-red text-pepsi-red hover:bg-pepsi-red/10 px-3 py-1 h-auto text-xs"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Restart
              </Button>
            </div>
          </div>
          <div className="w-full bg-neutral/30 rounded-full h-2">
            <div 
              className="revenue-gradient h-2 rounded-full transition-all duration-500"
              style={{ width: `${(question.id - 1) / totalQuestions * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-4 sm:p-6 md:p-8 text-center slide-up">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4 sm:mb-6 md:mb-8 leading-tight">
            {question.question}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = answered;
              
              let buttonClass = "p-3 sm:p-4 md:p-6 text-left h-auto bg-game-surface hover:bg-pepsi-blue/10 border-2 border-neutral/30 transition-[var(--transition-smooth)] text-sm sm:text-base";
              
              if (showResult) {
                if (isSelected && isCorrect) {
                  buttonClass = "p-3 sm:p-4 md:p-6 text-left h-auto bg-correct/20 border-2 border-correct text-correct text-sm sm:text-base";
                } else if (isSelected && !isCorrect) {
                  buttonClass = "p-3 sm:p-4 md:p-6 text-left h-auto bg-incorrect/20 border-2 border-incorrect text-incorrect text-sm sm:text-base";
                } else if (isCorrect) {
                  buttonClass = "p-3 sm:p-4 md:p-6 text-left h-auto bg-correct/10 border-2 border-correct/50 text-correct text-sm sm:text-base";
                }
              }
              
              return (
                <Button
                  key={index}
                  variant="outline"
                  className={buttonClass}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                >
                  <div className="flex items-center gap-2 sm:gap-3 w-full">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-pepsi-blue/20 flex items-center justify-center font-bold text-pepsi-blue text-xs sm:text-sm md:text-base">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1 text-left">{option}</span>
                    {showResult && isSelected && (
                      isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-correct" />
                      ) : (
                        <XCircle className="w-5 h-5 text-incorrect" />
                      )
                    )}
                    {showResult && !isSelected && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-correct" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};