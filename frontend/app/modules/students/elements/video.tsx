"use client"

import { PlayCircle, Volume2, Settings, Maximize2 } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

export function WatchLecture() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="relative">
          <div className="aspect-video bg-black rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="w-16 h-16 text-white opacity-80" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-4 text-white">
            <div className="flex-grow h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-white" />
            </div>
            <span className="text-sm tabular-nums">0:00 / 45:00</span>
            <Volume2 className="w-5 h-5" />
            <Settings className="w-5 h-5" />
            <Maximize2 className="w-5 h-5" />
          </div>
        </div>
        <h2 className="text-xl font-medium mt-4">Introduction to React Fundamentals</h2>
        <p className="text-muted-foreground mt-2">Learn the core concepts of React, including components, props, and state management.</p>
      </div>
      <div className="lg:col-span-1">
        <h3 className="font-medium mb-4">Lecture Contents</h3>
        {[
          "1. Getting Started (5:00)",
          "2. Components and Props (10:00)",
          "3. State and Lifecycle (15:00)",
          "4. Handling Events (8:00)",
          "5. Conditional Rendering (7:00)",
        ].map((section, index) => (
          <div key={index} className="group">
            <div className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer">
              <PlayCircle className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              <span className="text-sm">{section}</span>
            </div>
            {index < 4 && <Separator className="my-1" />}
          </div>
        ))}
      </div>
    </div>
  )
}
