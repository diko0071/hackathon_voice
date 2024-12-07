"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TeacherAvatar } from './avatar'

export function DoQuiz() {
  const [quizState, setQuizState] = useState<'not-started' | 'in-progress' | 'completed'>('not-started')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])

  const questions = [
    {
      question: "What is React primarily used for?",
      options: [
        "Building user interfaces",
        "Database management",
        "Server configuration",
        "Network protocols"
      ],
      correctAnswer: 0
    },
    // Add more questions as needed
    
  ]

  const startQuiz = () => {
    setQuizState('in-progress')
    setCurrentQuestion(0)
    setUserAnswers([])
  }

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0)
    }, 0)
  }

  if (quizState === 'not-started') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
              This quiz will test your understanding of React fundamentals. Take your time and answer carefully!
            </p>
            <Button onClick={startQuiz}>Start Quiz</Button>
          </div>
        </div>
        <div className="lg:col-span-1">
          <TeacherAvatar />
        </div>
      </div>
    )
  }

  if (quizState === 'in-progress') {
    const question = questions[currentQuestion]
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="space-y-8">
            <div className="space-y-4">
              <Progress value={(currentQuestion / questions.length) * 100} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{question.question}</h3>
              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-4"
                    onClick={() => {
                      const newAnswers = [...userAnswers, index]
                      setUserAnswers(newAnswers)
                      
                      if (currentQuestion < questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1)
                      } else {
                        setQuizState('completed')
                      }
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <TeacherAvatar />
        </div>
      </div>
    )
  }

  if (quizState === 'completed') {
    const score = calculateScore()
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
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
        </div>
        <div className="lg:col-span-1">
          <TeacherAvatar />
        </div>
      </div>
    )
  }

  return null
}