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
      <div className="min-h-screen flex items-center justify-center p-4" style={{background: "var(--gradient-game)"}}>
        <Card className="max-w-md w-full p-8 text-center bounce-entrance">
          <div className="mb-4">
            <Clock className="w-8 h-8 text-pepsi-blue mx-auto mb-2" />
            <h3 className="text-xl font-bold text-pepsi-blue">Get Ready!</h3>
            <p className="text-foreground/70">Question {question.id} coming up...</p>
          </div>
          
          <div className="mb-6 relative">
            <img 
              src={question.gif} 
              alt="Question preview" 
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-pepsi-blue/20 flex items-center justify-center rounded-lg">
              <div className="text-4xl font-bold text-pepsi-white">
                {countdown}
              </div>
            </div>
          </div>
          
          <div className="text-sm text-foreground/60">
            Auto-starting in {countdown} seconds...
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background: "var(--gradient-game)"}}>
      <div className="max-w-4xl w-full">
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
        <Card className="p-8 text-center slide-up">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            {question.question}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = answered;
              
              let buttonClass = "p-6 text-left h-auto bg-game-surface hover:bg-pepsi-blue/10 border-2 border-neutral/30 transition-[var(--transition-smooth)]";
              
              if (showResult) {
                if (isSelected && isCorrect) {
                  buttonClass = "p-6 text-left h-auto bg-correct/20 border-2 border-correct text-correct";
                } else if (isSelected && !isCorrect) {
                  buttonClass = "p-6 text-left h-auto bg-incorrect/20 border-2 border-incorrect text-incorrect";
                } else if (isCorrect) {
                  buttonClass = "p-6 text-left h-auto bg-correct/10 border-2 border-correct/50 text-correct";
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
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 rounded-full bg-pepsi-blue/20 flex items-center justify-center font-bold text-pepsi-blue">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
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