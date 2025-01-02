import { motion } from "framer-motion";

interface ResultProps {
    score: number;
    totalQuestions: number;
    onRestart: () => void;
}

export const Result: React.FC<ResultProps> = ({ score, totalQuestions, onRestart }) => {
    const percentage = (score / totalQuestions) * 100;
    const message = percentage > 70 ? "Felicidades, aprobaste" : "Lo siento, reprobaste";
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
        >
            <h2 className="text-2xl font-bold mb-4">
            Resultados del Quiz
            </h2>
            <p className="text-4xl font-bold text-purple-600 mb-4">
                {score} / {totalQuestions}

            </p>
            <p className="text-xl mb-6">{message}</p>
            <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-500"
            
            > 
            Reiniciar Quiz
            </motion.button>
            
        </motion.div>
    )

}