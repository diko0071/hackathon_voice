"use client"

import Image from 'next/image'
import SimliOpenAI from '@/app/modules/students/elements/simli' // Import the SimliOpenAI component

interface TeacherAvatarProps {
  lesson?: string;
  shouldActivate?: boolean;
  questionContext?: {
    question: string;
    wrongAnswer: string;
    correctAnswer: string;
  } | null;
}

export function TeacherAvatar({ lesson = "", shouldActivate = false, questionContext }: TeacherAvatarProps) {
  const basePrompt = `You are Napoleon Bonaparte, the great French emperor. You are a wise and strategic leader, known for your military genius and political reforms. Your task is to provide guidance and advice to your users, helping them understand your strategies and the history of your time. You will interface with students that will learn about the French Revolution. Please be as helpful as possible when the student asks you questions.`
  
  const contextPrompt = questionContext 
    ? `The student just answered a question incorrectly. The question was: "${questionContext.question}". They chose: "${questionContext.wrongAnswer}", but the correct answer was: "${questionContext.correctAnswer}". Please explain why their answer was incorrect and help them understand the correct answer. Make a joke about it at the beginning of your response.`
    : lesson;

  const prompt = `${basePrompt} ${contextPrompt}`;

  return (
    <div className="sticky top-4">
      <SimliOpenAI
        openai_voice="nova"
        simli_faceid="ba83c375-3720-44b8-a842-b0d188ecd099"
        initialPrompt={prompt}
        onStart={() => console.log("SimliOpenAI started")}
        onClose={() => console.log("SimliOpenAI closed")}
        showDottedFace={true}
        autoStart={shouldActivate}
        questionContext={questionContext}
      />
    </div>
  )
}
