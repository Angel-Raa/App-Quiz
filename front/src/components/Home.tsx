import { motion } from "framer-motion";



interface HomeProps {
  onStart: () => void;
}

export const Home = ({ onStart }: HomeProps): JSX.Element => {
    
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Bienvenido al Quiz App
      </h1>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-800 transition duration-300"
      >
        Comenzar Quiz
      </motion.button>
    </motion.div>
  );
};
