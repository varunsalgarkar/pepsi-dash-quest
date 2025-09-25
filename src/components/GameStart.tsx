import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Zap, Target, Settings, X } from "lucide-react";

interface GameStartProps {
  onStart: () => void;
  questionsCount: number;
  onQuestionsCountChange: (count: number) => void;
}

export const GameStart = ({ onStart, questionsCount, onQuestionsCountChange }: GameStartProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [tempCount, setTempCount] = useState(questionsCount);

  const handleSaveSettings = () => {
    onQuestionsCountChange(tempCount);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sting-bg relative">
      <div className="energy-particles"></div>
      
      <div className="electric-border max-w-2xl w-full bounce-entrance relative">
        <Button
          onClick={() => setShowSettings(true)}
          className="absolute top-4 right-4 glass-button border-sting-orange text-sting-orange hover:bg-sting-orange/10 px-3 py-2 text-sm"
        >
          <Settings className="w-4 h-4 mr-1" />
          Settings
        </Button>
        
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
              <p className="text-sm text-sting-white/70">Answer {questionsCount} energy quiz questions correctly</p>
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
            <p>⚡ {questionsCount} questions • 💰 Revenue tracking</p>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="glass-card p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-sting-gold mb-4">Quiz Settings</h2>
              <Button
                onClick={() => setShowSettings(false)}
                variant="ghost"
                size="sm"
                className="text-sting-white hover:bg-sting-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-sting-white mb-2">
                Number of Questions (3-10)
              </label>
              <input
                type="number"
                min="3"
                max="10"
                value={tempCount}
                onChange={(e) => setTempCount(Math.max(3, Math.min(10, parseInt(e.target.value) || 3)))}
                className="w-full px-3 py-2 bg-sting-black/30 border border-sting-white/20 rounded-lg text-sting-white focus:border-sting-gold focus:outline-none"
              />
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 px-4 py-2 bg-transparent border border-sting-white/30 text-sting-white rounded-lg hover:bg-sting-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="flex-1 px-4 py-2 sting-gradient text-sting-black rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};