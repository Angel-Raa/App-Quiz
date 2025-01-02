import { Data, InputQuestion, Question } from "../utils";
const API_URL: URL = new URL("http://localhost:8080/api/v1/questions");
// Servicio para obtener todas las preguntas
export const getAllQuestions = async (
  pag: number = 0,
  size: number = 10
): Promise<{ questions: Question[]; totalPages: number; currentPage: number }> => {
  try {
    const response = await fetch(`${API_URL}?page=${pag}&size=${size}`);
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const resp: Data = await response.json();

    // Ajustar para extraer las preguntas de "content"
    const questions = resp.content;
    const { totalPages, number: currentPage } = resp.page;

    console.log("Preguntas:", questions);
    console.log("Total de páginas:", totalPages);
    console.log("Página actual:", currentPage);

    return { questions, totalPages, currentPage };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Lanza el error para manejarlo en el componente
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
