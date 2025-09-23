import { Button } from "@/components/ui/button";
import { Trophy, Zap, Target } from "lucide-react";

interface GameStartProps {
  onStart: () => void;
}

export const GameStart = ({ onStart }: GameStartProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sting-bg">
      <div className="energy-particles"></div>
      <div className="electric-border max-w-2xl w-full bounce-entrance">
        <div className="electric-border-inner p-8 text-center energy-pulse">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 sting-gradient bg-clip-text text-transparent">
            STING ENERGY QUIZ
          </h1>
          <p className="text-xl text-sting-gold mb-2">
            Test your energy knowledge and maximize revenue!
          </p>
          <div className="flex items-center justify-center gap-2 text-electric-cyan">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Every correct answer = +$1M Revenue</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-4">
            <Trophy className="w-8 h-8 text-sting-gold mx-auto mb-2" />
            <h3 className="font-semibold text-sting-gold">Challenge</h3>
            <p className="text-sm text-sting-white/70">Answer energy quiz questions correctly</p>
          </div>
          
          <div className="glass-card p-4">
            <Zap className="w-8 h-8 text-electric-cyan mx-auto mb-2" />
            <h3 className="font-semibold text-electric-cyan">Energy Boost</h3>
            <p className="text-sm text-sting-white/70">Build your revenue meter</p>
          </div>
          
          <div className="glass-card p-4">
            <Target className="w-8 h-8 text-correct mx-auto mb-2" />
            <h3 className="font-semibold text-correct">Goal</h3>
            <p className="text-sm text-sting-white/70">Maximize Sting revenue</p>
          </div>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="sting-gradient text-sting-black hover:shadow-[var(--glow-sting)] transition-[var(--transition-bounce)] text-lg px-8 py-6 rounded-xl font-bold glass-button"
        >
          ⚡ START ENERGY QUEST
        </Button>
        
        <div className="mt-6 text-sm text-sting-white/60">
          <p>⚡ 5 questions • 🚛 Animated journey • 💰 Revenue tracking</p>
        </div>
        </div>
      </div>
    </div>
  );
};