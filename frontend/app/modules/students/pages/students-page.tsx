"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WatchLecture } from "../elements/video"
import { ReadMaterials } from "../elements/materials"
import { DoQuiz } from "../elements/quiz"

const steps = ["Watch Lecture", "Read Materials", "Do Quiz"]

export default function StudentWizardFlow({ lectureId }: { lectureId: string }) {
  const [currentStep, setCurrentStep] = useState(0)

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
          <div className="mb-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`h-1 ${
                  index <= currentStep ? "bg-primary" : "bg-muted"
                } ${index > 0 ? "mt-2" : ""}`}
              />
            ))}
          </div>
          <div className="space-y-4">
            {currentStep === 0 && <WatchLecture />}
            {currentStep === 1 && <ReadMaterials />}
            {currentStep === 2 && <DoQuiz />}
          </div>
          <div className="flex justify-between mt-8">
            <Button onClick={prevStep} disabled={currentStep === 0} variant="outline">
              Previous
            </Button>
            <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}