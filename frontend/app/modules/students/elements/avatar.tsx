"use client"

import { memo } from 'react'
import SimliOpenAI from './simli'
import { Lesson } from '@/app/types'

interface AvatarProps {
  lesson?: Lesson
}

export const Avatar = memo(function Avatar({ lesson }: AvatarProps) {
  const prompt = `${lesson?.initial_prompt || ''}. The lesson content is${lesson?.sections?.map(section => section.content).join(' ') || ''}`

  const avatarFaceId = lesson?.avatar_face_id ?? "ba83c375-3720-44b8-a842-b0d188ecd099"

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