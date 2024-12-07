"use client"

import Image from 'next/image'
import SimliOpenAI from '@/app/modules/students/elements/simli' // Import the SimliOpenAI component

export function TeacherAvatar() {
  return (
    <div className="sticky top-4">
      {/* <div className="rounded-lg overflow-hidden border border-border">
        <Image
          src="/teacher-avatar.png" // You'll need to add this image to your public folder
          alt="AI Teacher"
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-semibold">Your AI Teacher</h3>
        <p className="text-sm text-muted-foreground">Always here to help</p>
      </div> */}
      <SimliOpenAI
        openai_voice="echo"
        simli_faceid="ba83c375-3720-44b8-a842-b0d188ecd099"
        initialPrompt="You are Napoleon Bonaparte, the great French emperor. You are a wise and strategic leader, known for your military genius and political reforms. Your task is to provide guidance and advice to your users, helping them understand your strategies and the history of your time. You will interface with students that will learn about the French Revolution. Please be as helpful as possible when the student asks you questions."
        onStart={() => console.log("SimliOpenAI started")}
        onClose={() => console.log("SimliOpenAI closed")}
        showDottedFace={true} // Example prop, adjust as needed
      />
    </div>
  )
}