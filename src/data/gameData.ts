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
    question: "What year was Pepsi-Cola first invented?",
    options: ["1886", "1893", "1898", "1903"],
    correctAnswer: 2, // 1898
    gif: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif"
  },
  {
    id: 2,
    question: "Which famous singer starred in Pepsi's 'Generation Next' campaign?",
    options: ["Madonna", "Michael Jackson", "Britney Spears", "Beyoncé"],
    correctAnswer: 1, // Michael Jackson
    gif: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif"
  },
  {
    id: 3,
    question: "What is Pepsi's main competitor brand?",
    options: ["Sprite", "Coca-Cola", "Dr Pepper", "Mountain Dew"],
    correctAnswer: 1, // Coca-Cola
    gif: "https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif"
  },
  {
    id: 4,
    question: "In which decade did Pepsi launch the 'Pepsi Challenge'?",
    options: ["1960s", "1970s", "1980s", "1990s"],
    correctAnswer: 1, // 1970s
    gif: "https://media.giphy.com/media/3o7TKqnN349PBUtGFO/giphy.gif"
  }
];

export const getRevenueMessage = (score: number, total: number): string => {
  const percentage = (score / total) * 100;
  
  if (percentage === 100) {
    return "🎉 PERFECT SCORE! Maximum revenue achieved!";
  } else if (percentage >= 75) {
    return "🌟 Excellent performance! Strong revenue growth!";
  } else if (percentage >= 50) {
    return "👍 Good job! Decent revenue generated!";
  } else {
    return "📈 Room for improvement! Let's boost that revenue!";
  }
};