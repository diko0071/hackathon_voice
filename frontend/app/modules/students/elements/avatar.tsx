"use client"

import Image from 'next/image'

export function TeacherAvatar() {
  return (
    <div className="sticky top-4">
      <div className="rounded-lg overflow-hidden border border-border">
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
      </div>
    </div>
  )
}
