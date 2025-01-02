import { useState } from "react";
import { Home, Result } from "./components";
import { CreateQuiz } from "./components/CreateQuiz";
import { Question, InputQuestion } from "./utils";
import { Quiz } from "./components/Quiz";

function App() {
  const [screen, setScreen] = useState("home");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<
    { questionId: number; answer: string; isCorrect: boolean }[]
  >([]);

  const startQuiz = () => {
    setScreen("quiz");
    setScore(0);

    setAnswers([]);
  };
  const endQuiz = (
    finalScore: number,
    totalQuestions: number,
    quizAnswers: { questionId: number; answer: string; isCorrect: boolean }[]
  ) => {
    setScore(finalScore);
    setTotalQuestions(totalQuestions);
    setAnswers(quizAnswers);
    setScreen("result");
  };
  const restartQuiz = () => setScreen("home");
  const handleCreateQuiz = (newQuiz: InputQuestion) => {
    // Lógica para crear una nueva pregunta
    // Esto se implementará en el módulo API
    console.log("Save question:", newQuiz);
    setShowCreateQuiz(false);
  };

  const handleUpdateQuiz = (question: InputQuestion) => {
    // Lógica para actualizar una pregunta existente
    // Esto se implementará en el módulo API
    console.log("Updating question:", question);
    setEditingQuestion(null);
    setShowCreateQuiz(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        {showCreateQuiz ? (
          <CreateQuiz
            onSubmit={editingQuestion ? handleUpdateQuiz : handleCreateQuiz}
            initialData={editingQuestion}
          />
        ) : (
          <>
            {screen === "home" && <Home onStart={startQuiz} />}
            {screen === "quiz" && (
              <Quiz
                onEnd={endQuiz}
                onCreateQuiz={() => setShowCreateQuiz(true)}
                onEditQuiz={(question) => {
                  setEditingQuestion(question);
                  setShowCreateQuiz(true);
                }}
              />
            )}
            {screen  === 'result'&& (
              <Result
                score={score}
                totalQuestions={totalQuestions}
                onRestart={restartQuiz}
                answers={answers}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
