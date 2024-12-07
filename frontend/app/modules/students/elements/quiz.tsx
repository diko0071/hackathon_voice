"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export function DoQuiz() {
  const [quizState, setQuizState] = useState<'start' | 'inProgress' | 'completed'>('start')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  const questions = [
    {
      question: "What is the primary purpose of React?",
      options: [
        "Server-side rendering",
        "Building user interfaces",
        "Database management",
        "Network protocols"
      ],
      correctAnswer: 1
    },
    {
      question: "Which of the following is NOT a key feature of React?",
      options: [
        "Virtual DOM",
        "Component-based architecture",
        "Two-way data binding",
        "JSX syntax"
      ],
      correctAnswer: 2
    },
    {
      question: "What is a 'prop' in React?",
      options: [
        "A built-in React function",
        "A type of React component",
        "A way to pass data to components",
        "A styling attribute"
      ],
      correctAnswer: 2
    },
    {
      question: "Which lifecycle method is called after a component is rendered for the first time?",
      options: [
        "componentDidMount",
        "componentWillMount",
        "componentDidUpdate",
        "componentWillUnmount"
      ],
      correctAnswer: 0
    },
    {
      question: "What is the purpose of state in React?",
      options: [
        "To store component styles",
        "To make API calls",
        "To pass data to child components",
        "To hold data that may change over time"
      ],
      correctAnswer: 3
    }
  ]

  const startQuiz = () => {
    setQuizState('inProgress')
    setCurrentQuestion(0)
    setAnswers([])
  }

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizState('completed')
    }
  }

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (Number(answer) === questions[index].correctAnswer ? 1 : 0)
    }, 0)
  }

  if (quizState === 'start') {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <h2 className="text-3xl font-bold mb-6">React Fundamentals Quiz</h2>
        <p className="text-lg text-muted-foreground mb-8">Test your knowledge of React basics with this quick quiz.</p>
        <Button size="lg" onClick={startQuiz}>Start Quiz</Button>
      </div>
    )
  }

  if (quizState === 'inProgress') {
    const question = questions[currentQuestion]
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Question {currentQuestion + 1} of {questions.length}</h2>
          <Progress value={(currentQuestion + 1) / questions.length * 100} className="h-2" />
        </div>
        <h3 className="text-xl mb-6">{question.question}</h3>
        <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-4">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button 
          onClick={nextQuestion} 
          disabled={answers[currentQuestion] === undefined}
          className="mt-6"
        >
          {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
        </Button>
      </div>
    )
  }

  if (quizState === 'completed') {
    const score = calculateScore()
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <h2 className="text-3xl font-bold mb-6">Quiz Completed!</h2>
        <p className="text-2xl mb-4">Your Score: {score} out of {questions.length}</p>
        <Progress value={score / questions.length * 100} className="w-64 h-4 mb-8" />
        {score === questions.length ? (
          <p className="text-lg text-green-600 mb-8">Congratulations! Perfect score!</p>
        ) : score >= questions.length / 2 ? (
          <p className="text-lg text-yellow-600 mb-8">Good job! You passed the quiz.</p>
        ) : (
          <p className="text-lg text-red-600 mb-8">Keep studying and try again!</p>
        )}
        <Button onClick={startQuiz}>Retake Quiz</Button>
      </div>
    )
  }

  return null
}