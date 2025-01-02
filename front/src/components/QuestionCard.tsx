import { Question } from "../utils";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      <div className="space-y-2">
        {question.choices.map((choice, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onAnswer(choice === question.correctAnswers[0])}
            className="w-full text-left p-3 rounded bg-purple-100 hover-bg-purple-200 transition duration-300"
          >
            {choice}
          </motion.button>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDelete}
          className="text-sm text-red-500 hover:text-red-700 transition duration-300"
        >
          Eliminar pregunta
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEdit}
          className="text-sm text-blue-500 hover:text-blue-700 transition duration-300"
        >
          Editar pregunta
        </motion.button>
      </div>
    </div>
  );
};
