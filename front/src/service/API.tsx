import { InputQuestion, Question } from "../utils";
const API_URL: URL = new URL("http://localhost:8080/api/v1/questions");

export const getAllQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    // Filtrar solo las preguntas y devolverlas
    const questions: Question[] = data.content.map((question: Question) => {
      return {
        questionId: question.questionId,
        question: question.question,
        subject: question.subject,
        questionType: question.questionType,
        choices: question.choices,
        correctAnswers: question.correctAnswers,
        createAt: question.createAt,
        updatedAt: question.updatedAt,
      };
    });
    return questions;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

export const createQuestion = async (
  input: InputQuestion
): Promise<Question | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const data: Question = await response.json();
    return {
      questionId: data.questionId,
      question: data.question,
      subject: data.subject,
      questionType: data.questionType,
      choices: data.choices,
      correctAnswers: data.correctAnswers,
      createAt: data.createAt,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.error("Error creating question: ", error);
    return null;
  }
};

export const deleteQuestion = async (id: number): Promise<void> => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting question: ", error);
  }
};
