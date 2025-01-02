type QuestionType = "Multiple Choice" | "True/False";

// Data interface: make it more generic and reusable
export interface Data {
    question: Question[];
    page:    Page;
}

export interface Question {
    questionId:     number;
    question:       string;
    subject:        string;
    questionType:   QuestionType;
    choices:        string[];
    correctAnswers: string[];
    createAt:       Date;
    updatedAt:      Date;
}

export interface Page {
    size:          number;
    number:        number;
    totalElements: number;
    totalPages:    number;
}
  
  // InputQuestion interface: No changes needed, but we can make the status optional or more specific
  export interface InputQuestion {
    question:       string;
    subject:        string;
    questionType:   QuestionType;
    choices:        string[];
    correctAnswers: string[];
  }