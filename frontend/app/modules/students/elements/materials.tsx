"use client"

import ReactMarkdown from 'react-markdown'
import { ScrollArea } from "@/components/ui/scroll-area"
import { TeacherAvatar } from './avatar'
import { LessonSection } from '../types'

interface ReadMaterialsProps {
  section: LessonSection
}

export function ReadMaterials({ section }: ReadMaterialsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
      <div className="lg:col-span-3">
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown>{section.content}</ReactMarkdown>
          </div>
        </ScrollArea>
      </div>
      <div className="lg:col-span-1">
        <TeacherAvatar />
      </div>
    </div>
  )
}