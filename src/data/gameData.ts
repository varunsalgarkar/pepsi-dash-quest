export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  gif: string;
}

export const gameQuestions: Question[] = [
  {
    id: 1,
    question: "What year was Sting Energy Drink first launched?",
    options: ["2002", "2004", "2006", "2008"],
    correctAnswer: 0, // 2002
    gif: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif"
  },
  {
    id: 2,
    question: "What is the main ingredient that gives Sting its energy boost?",
    options: ["Taurine", "Caffeine", "Ginseng", "All of the above"],
    correctAnswer: 3, // All of the above
    gif: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif"
  },
  {
    id: 3,
    question: "Which company owns the Sting Energy brand?",
    options: ["Red Bull", "PepsiCo", "Coca-Cola", "Monster"],
    correctAnswer: 1, // PepsiCo
    gif: "https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif"
  },
  {
    id: 4,
    question: "What is Sting's signature flavor profile?",
    options: ["Tropical", "Berry", "Gold Rush", "Citrus"],
    correctAnswer: 2, // Gold Rush
    gif: "https://media.giphy.com/media/3o7TKqnN349PBUtGFO/giphy.gif"
  },
  {
    id: 5,
    question: "In how many countries is Sting Energy available?",
    options: ["Over 50", "Over 100", "Over 150", "Over 200"],
    correctAnswer: 2, // Over 150
    gif: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
  }
];

// Helper function to get total number of questions/checkpoints
export const getTotalQuestions = (): number => gameQuestions.length;

export const getRevenueMessage = (score: number, total: number): string => {
  const percentage = (score / total) * 100;
  
  if (percentage === 100) {
    return "⚡ PERFECT ENERGY! Maximum revenue achieved!";
  } else if (percentage >= 75) {
    return "🔥 High Energy! Strong revenue growth!";
  } else if (percentage >= 50) {
    return "⚡ Good Energy! Decent revenue generated!";
  } else {
    return "🔋 Low Energy! Need more power to boost revenue!";
  }
};