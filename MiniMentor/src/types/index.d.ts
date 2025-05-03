export interface Card {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  dateAdded: Date;
  content?: {
    sections?: {
      title: string;
      content: string;
    }[];
    references?: {
      title: string;
      url: string;
    }[];
  };
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface QuizQuestion {
  id: string;
  cardId: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

export interface UserData {
  name: string;
  email: string;
  joinDate: string;
  streak: number;
  totalCards: number;
  completedQuizzes: number;
  averageScore: number;
  preferredCategories: string[];
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
  progress: number;
} 