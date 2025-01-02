import { useState } from "react";
import { motion } from "framer-motion";
import { InputQuestion } from "../utils";

interface CreateQuizProps {
  onSubmit: (questions: InputQuestion) => void;
  initialData?: InputQuestion | null;
}

export const CreateQuiz = ({ onSubmit, initialData = null }: CreateQuizProps): JSX.Element => {
  const [questions, setQuestions] = useState<InputQuestion>(initialData || {
    question: "",
    subject: "",
    questionType: "Multiple Choice", // replace with a valid QuestionType value
    choices: [],
    correctAnswers: [],
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuestions({ ...questions, [name]: value });
  }
  const handleChoiceChange = (value: string, index: number) => {
    setQuestions((prev) => ({
        ...prev,
        choices: prev.choices.map((choice, i) => (i === index ? value : choice)),
    }))
    
  }

  const handleCorrectAnswerChange = (value: string, index: number) => {
    setQuestions((prev) => ({
        ...prev,
        correctAnswers: prev.correctAnswers.map((answer, i) => (i === index ? value : answer)),
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(questions);
  }
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">
          Pregunta
        </label>
        <input
          type="text"
          id="question"
          name="question"
          value={questions.question}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Tema
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={questions.subject}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
     
      <div>
        <label className="block text-sm font-medium text-gray-700">Opciones</label>
        {questions.choices.map((choice, index) => (
          <input
            key={index}
            type="text"
            value={choice}
            onChange={(e) => handleChoiceChange(e.target.value, index)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        ))}
      </div>
      <div>
        <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700">
          Respuesta Correcta
        </label>
        <select
          id="correctAnswer"
          value={questions.correctAnswers[0]}
          onChange={(e) => handleCorrectAnswerChange(e.target.value, 0)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {questions.choices.map((choice, index) => (
            <option key={index} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
      >
        {initialData ? 'Actualizar Pregunta' : 'Crear Pregunta'}
      </motion.button>
    </motion.form>
  )
};
