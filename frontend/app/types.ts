export interface QuizOption {
    id: number;
    content: string;
    is_correct: boolean;
  }
  
  export interface QuizQuestion {
    id: number;
    question: string;
    order: number;
    options: QuizOption[];
  }
  
  export interface Quiz {
    id: number;
    title: string;
    order: number;
    questions: QuizQuestion[];
  }
  
  export interface LessonSection {
    id: number;
    title: string;
    content: string;
    order: number;
  }
  
  export interface Lesson {
    id: number;
    name: string;
    description: string | null;
    avatar_face_id: string | null;
    sections: LessonSection[];
    quizzes: Quiz[];
  }