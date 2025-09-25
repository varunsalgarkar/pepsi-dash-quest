import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Zap, Target, Settings, X } from "lucide-react";
import "@/styles/landing-page.css";

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
    <div className="landing-container">
      <div className="landing-particles energy-particles"></div>
      
      <div className="landing-main-card">
        <Button
          onClick={() => setShowSettings(true)}
          className="landing-settings-button"
        >
          <Settings className="w-4 h-4 mr-1" />
          Settings
        </Button>
        
        <div className="landing-inner-content">
          <div className="mb-8">
            <h1 className="landing-title">
              STING ENERGY QUIZ
            </h1>
            <p className="landing-subtitle">
              Test your energy knowledge and maximize revenue!
            </p>
            <div className="landing-revenue-info">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">Every correct answer = +$1M Revenue</span>
            </div>
          </div>

          <div className="landing-features-grid">
            <div className="landing-feature-card">
              <Trophy className="landing-feature-icon text-sting-gold" />
              <h3 className="landing-feature-title text-sting-gold">Challenge</h3>
              <p className="landing-feature-description">Answer {questionsCount} energy quiz questions correctly</p>
            </div>
            
            <div className="landing-feature-card">
              <Zap className="landing-feature-icon text-electric-cyan" />
              <h3 className="landing-feature-title text-electric-cyan">Energy Boost</h3>
              <p className="landing-feature-description">Build your revenue meter</p>
            </div>
            
            <div className="landing-feature-card">
              <Target className="landing-feature-icon text-correct" />
              <h3 className="landing-feature-title text-correct">Goal</h3>
              <p className="landing-feature-description">Maximize Sting revenue</p>
            </div>
          </div>

          <Button
            onClick={onStart}
            size="lg"
            className="landing-start-button"
          >
            ⚡ START ENERGY QUEST
          </Button>
          
          <div className="landing-info-text">
            <p>⚡ {questionsCount} questions • 💰 Revenue tracking</p>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="settings-modal">
          <div className="settings-content">
            <div className="flex justify-between items-center mb-4">
              <h2 className="settings-title">Quiz Settings</h2>
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
              <label className="settings-label">
                Number of Questions (3-10)
              </label>
              <input
                type="number"
                min="3"
                max="10"
                value={tempCount}
                onChange={(e) => setTempCount(Math.max(3, Math.min(10, parseInt(e.target.value) || 3)))}
                className="settings-input"
              />
            </div>
            
            <div className="settings-buttons">
              <button
                onClick={() => setShowSettings(false)}
                className="settings-cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="settings-save-button"
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