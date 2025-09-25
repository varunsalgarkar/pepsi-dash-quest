export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  gif: string;
}

// Function to fetch questions from JSON file
export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch('/questions.json');
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching questions:', error);
    // Fallback questions if fetch fails
    return [
      {
        id: 1,
        question: "What year was Sting Energy Drink first launched?",
        options: ["2002", "2004", "2006", "2008"],
        correctAnswer: 0,
        gif: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif"
      },
      {
        id: 2,
        question: "What is the main ingredient that gives Sting its energy boost?",
        options: ["Taurine", "Caffeine", "Ginseng", "All of the above"],
        correctAnswer: 3,
        gif: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif"
      }
    ];
  }
};

// Function to get random questions without repetition
export const getRandomQuestions = (allQuestions: Question[], count: number): Question[] => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, allQuestions.length));
};

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