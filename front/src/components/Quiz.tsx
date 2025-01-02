import { useEffect, useState } from "react";
import { Question } from "../utils";
import { getAllQuestions, deleteQuestion } from "../service";
import { AnimatePresence, motion } from "motion/react";
import { QuestionCard } from "./QuestionCard";

interface QuizProps {
  onEnd: (score: number, totalQuestions: number) => void;
  onCreateQuiz: () => void;
  onEditQuiz: (question: Question) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onEnd, onCreateQuiz, onEditQuiz }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, []);
  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedQuestions = await getAllQuestions();
      setQuestions(fetchedQuestions);
    } catch {
      setError(
        "Error al cargar las preguntas. Por favor, inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      onEnd(score, questions.length);
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
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      <button
        onClick={onCreateQuiz}
        className="ml-4 bg-green-500 text-white font-semibold py-1 px-2 rounded text-sm hover:bg-green-600 transition duration-300"
      >
        Crear
      </button>
    </div>
    <p className="text-right text-sm text-gray-600 mt-1">
      {currentQuestionIndex + 1} / {questions.length}
    </p>
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          onDelete={() => handleDeleteQuestion(currentQuestion.questionId)}
          onEdit={() => onEditQuiz(currentQuestion)}
        />
      </motion.div>
    </AnimatePresence>
  </div>
  );
};
