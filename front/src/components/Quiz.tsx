import { useCallback, useEffect, useState } from "react";
import { Question } from "../utils";
import { getAllQuestions, deleteQuestion } from "../service";
import { AnimatePresence, motion } from "motion/react";
import { QuestionCard } from "./QuestionCard";

interface QuizProps {
  onEnd: (
    score: number,
    totalQuestions: number,
    answers: Array<{ questionId: number; answer: string; isCorrect: boolean }>
  ) => void;
  onCreateQuiz: () => void;
  onEditQuiz: (question: Question) => void;
}

export const Quiz: React.FC<QuizProps> = ({
  onEnd,
  onCreateQuiz,
  onEditQuiz,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [timeStarted, setTimeStarted] = useState<number>(Date.now());
  const [answers, setAnswers] = useState<
    Array<{ questionId: number; answer: string; isCorrect: boolean }>
  >([]);

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const {
        questions,
        totalPages: pages,
        currentPage: page,
      } = await getAllQuestions(currentPage);
      console.log("Preguntas cargadas:", questions);
      console.log("Total de páginas:", pages);
      console.log("Página actual:", page);

      setQuestions(questions);
      setTotalPages(pages);
      setCurrentPage(page);

      // Extract subjects from questions
      const uniqueSubjects = [...new Set(questions.map((q) => q.subject))];
      setSubjects(["All", ...uniqueSubjects]);
      // Shuffle questions
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      setQuestions(shuffled);
    } catch {
      setError(
        "Error al cargar las preguntas. Por favor, inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleAnswer = (isCorrect: boolean, selectedAnswer: string) => {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    if (!currentQuestion) return;

    const timeTaken = (Date.now() - timeStarted) / 1000;
    const timeBonus = Math.max(10 - timeTaken, 0);
    const questionScore = isCorrect ? Math.round(10 + timeBonus) : 0;

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.questionId,
        answer: selectedAnswer,
        isCorrect,
      },
    ]);

    setScore(score + questionScore);
    nextQuestion();
  };
  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeStarted(Date.now());
    } else {
      onEnd(score, filteredQuestions.length, answers);
    }
  };
  const handleDeleteQuestion = async (id: number) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((question) => question.questionId !== id));
      if (currentQuestionIndex >= questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    } catch {
      setError(
        "Error al eliminar la pregunta. Por favor, inténtalo nuevamente."
      );
    }
  };

  const filteredQuestions =
    selectedSubject === "All"
      ? questions
      : questions.filter((q) => q.subject === selectedSubject);

  useEffect(() => {
    if (filteredQuestions.length > 0) {
      setTimeStarted(Date.now());
    }
  }, [filteredQuestions]);

  useEffect(() => {
    setCurrentQuestionIndex(0); // Reinicia el índice cuando cambian las preguntas.
  }, [selectedSubject, questions]);
  if (loading) {
    return <div className="text-center">Cargando preguntas...</div>;
  }

  
  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={loadQuestions}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / filteredQuestions.length) * 100
              }%`,
            }}
          ></div>
        </div>
        <button
          onClick={onCreateQuiz}
          className="ml-4 bg-green-500 text-white font-semibold py-1 px-2 rounded text-sm hover:bg-green-600 transition duration-300"
        >
          Crear
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          Pregunta {currentQuestionIndex + 1} de {filteredQuestions.length}
        </p>
        <select
          value={selectedSubject ?? ""}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-white border border-gray-300 rounded-md text-gray-700 py-1 px-2 text-sm"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              onAnswer={(isCorrect, selectedAnswer) =>
                handleAnswer(isCorrect, selectedAnswer)
              }
              onDelete={() => handleDeleteQuestion(currentQuestion.questionId)}
              onEdit={() => onEditQuiz(currentQuestion)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
