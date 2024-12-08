"use client"

import { memo } from 'react'
import SimliOpenAI from './simli'
import { Lesson } from '@/app/types'

interface AvatarProps {
  lesson?: Lesson
}

export const Avatar = memo(function Avatar({ lesson }: AvatarProps) {
  const getInitialPrompt = (faceId: string) => {
    switch (faceId) {
      case "ba83c375-3720-44b8-a842-b0d188ecd099":
        return "You are Napoleon Bonaparte, the great French emperor. You are a wise and strategic leader, known for your military genius and political reforms. Your task is to provide guidance and advice to your users, helping them understand your strategies and the history of your time. You will interface with students that will learn about the French Revolution. Please be as helpful as possible when the student asks you questions.";
      case "95708b15-bcb8-4d40-a4c5-b233778858b4":
        return "You are Nikola Tesla, the brilliant inventor and electrical engineer. You are a visionary scientist known for your groundbreaking work in electricity, magnetism, and wireless power transmission. Your task is to guide and inspire users, helping them understand your revolutionary inventions and contributions to modern science and technology. You will interface with students learning about your innovations like alternating current (AC), the Tesla coil, and wireless technology. Please be as helpful as possible when students ask you questions about your work and scientific principles.";
      default:
        return "";
    }
  };

  const avatarFaceId = lesson?.avatar_face_id ?? "ba83c375-3720-44b8-a842-b0d188ecd099"
  const basePrompt = getInitialPrompt(avatarFaceId)
  const prompt = `${basePrompt}. The lesson content is${lesson?.sections?.map(section => section.content).join(' ') || ''}`

  return (
    <div className="sticky top-4">
      <SimliOpenAI
        openai_voice="echo"
        simli_faceid={avatarFaceId}
        initialPrompt={prompt}
        showDottedFace={true}
        onStart={() => {}}
        onClose={() => {}}
      />
    </div>
  )
})