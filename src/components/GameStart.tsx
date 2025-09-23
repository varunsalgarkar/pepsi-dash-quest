import { Button } from "@/components/ui/button";
import { Trophy, Zap, Target } from "lucide-react";

interface GameStartProps {
  onStart: () => void;
}

export const GameStart = ({ onStart }: GameStartProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background: "var(--gradient-game)"}}>
      <div className="game-card max-w-2xl w-full text-center bounce-entrance">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 pepsi-gradient bg-clip-text text-transparent">
            PEPSI QUIZ
          </h1>
          <p className="text-xl text-foreground/80 mb-2">
            Test your knowledge and maximize revenue!
          </p>
          <div className="flex items-center justify-center gap-2 text-pepsi-blue">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Every correct answer = +$1M Revenue</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-pepsi-blue/10 border-2 border-pepsi-blue/20">
            <Trophy className="w-8 h-8 text-pepsi-blue mx-auto mb-2" />
            <h3 className="font-semibold text-pepsi-blue">Challenge</h3>
            <p className="text-sm text-foreground/70">Answer quiz questions correctly</p>
          </div>
          
          <div className="p-4 rounded-xl bg-pepsi-red/10 border-2 border-pepsi-red/20">
            <Zap className="w-8 h-8 text-pepsi-red mx-auto mb-2" />
            <h3 className="font-semibold text-pepsi-red">Rewards</h3>
            <p className="text-sm text-foreground/70">Build your revenue meter</p>
          </div>
          
          <div className="p-4 rounded-xl bg-correct/10 border-2 border-correct/20">
            <Target className="w-8 h-8 text-correct mx-auto mb-2" />
            <h3 className="font-semibold text-correct">Goal</h3>
            <p className="text-sm text-foreground/70">Maximize Pepsi revenue</p>
          </div>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="pepsi-gradient text-pepsi-white hover:shadow-[var(--glow-pepsi)] transition-[var(--transition-bounce)] text-lg px-8 py-6 rounded-xl font-bold"
        >
          🚛 START JOURNEY
        </Button>
        
        <div className="mt-6 text-sm text-foreground/60">
          <p>🎯 4 questions • 🚛 Animated truck journey • 💰 Revenue tracking</p>
        </div>
      </div>
    </div>
  );
};