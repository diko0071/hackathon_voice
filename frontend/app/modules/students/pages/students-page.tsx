"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ReadMaterials } from "../elements/materials"
import { DoQuiz } from "../elements/quiz"
import { lessonApi } from "@/app/api"
import { Lesson } from "@/app/types"
import { Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function StudentWizardFlow({ lectureId }: { lectureId: string }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await lessonApi.getLesson(lectureId)
        setLesson(data)
      } catch (err) {
        setError('Failed to load lesson')
      } finally {
        setLoading(false)
      }
    }

    fetchLesson()
  }, [lectureId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || 'Lesson not found'}</p>
      </div>
    )
  }

  const steps = [
    ...lesson.sections.map(section => section.title),
    "Quiz"
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-4">
        <div className="w-full max-w-7xl mx-auto">
          {currentStep < lesson.sections.length && (
            <div className="mb-8">
              <Progress 
                value={(currentStep / lesson.sections.length) * 100} 
                className="h-2" 
              />
              <p className="text-sm text-muted-foreground mt-2">
                Section {currentStep + 1} of {lesson.sections.length}
              </p>
            </div>
          )}
          <div className="space-y-4">
            {currentStep < lesson.sections.length ? (
              <ReadMaterials lesson={lesson} section={lesson.sections[currentStep]} />
            ) : (
              <DoQuiz quiz={lesson.quizzes[0]} />
            )}
          </div>
          <div className="flex justify-between mt-8">
            <Button onClick={prevStep} disabled={currentStep === 0} variant="outline">
              Previous
            </Button>
            <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
              {currentStep === steps.length - 1 
                ? "Finish" 
                : currentStep === lesson.sections.length - 1
                  ? "Take Quiz" 
                  : "Next"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}