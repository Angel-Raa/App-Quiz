import { motion } from "framer-motion";

interface ResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  answers: { isCorrect: boolean }[];
}

export const Result: React.FC<ResultProps> = ({
  score,
  totalQuestions,
  onRestart,
  answers,
}) => {
    const percentage = (score / totalQuestions) * 100
  let message = "";
  if (percentage >= 80) {
    message = "¡Excelente trabajo!";
  } else if (percentage >= 60) {
    message = "¡Buen trabajo!";
  } else {
    message = "Sigue practicando.";
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-2xl font-bold mb-4">Resultados del Quiz</h2>
      <p className="text-4xl font-bold text-purple-600 mb-4">
        {score} / {totalQuestions}
      </p>
      <p className="text-xl mb-6">{message}</p>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Resumen de respuestas:</h3>
        <ul className="text-left">
          {answers.map((answer, index) => (
            <li
              key={index}
              className={`mb-2 ${
                answer.isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="font-medium">Pregunta {index + 1}:</span>{" "}
              {answer.isCorrect ? "Correcta" : "Incorrecta"}
            </li>
          ))}
        </ul>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
      >
        Reiniciar Quiz
      </motion.button>
    </motion.div>
  );
};
