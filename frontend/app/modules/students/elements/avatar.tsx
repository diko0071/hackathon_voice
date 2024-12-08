"use client"

import { memo } from 'react'
import SimliOpenAI from './simli'
import { Lesson } from '@/app/types'

interface AvatarProps {
  lesson?: Lesson
}

export const Avatar = memo(function Avatar({ lesson }: AvatarProps) {
  const prompt = `You are Napoleon Bonaparte, the great French emperor. You are a wise and strategic leader, known for your military genius and political reforms. Your task is to provide guidance and advice to your users, helping them understand your strategies and the history of your time. You will interface with students that will learn about the French Revolution. Please be as helpful as possible when the student asks you questions.${lesson?.sections?.map(section => section.content).join(' ') || ''}`

  return (
    <div className="sticky top-4">
      <SimliOpenAI
        openai_voice="echo"
        simli_faceid="ba83c375-3720-44b8-a842-b0d188ecd099"
        initialPrompt={prompt}
        showDottedFace={true}
        onStart={() => {}}
        onClose={() => {}}
      />
    </div>
  )
})