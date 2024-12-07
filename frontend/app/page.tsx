import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction, ExternalLink } from "lucide-react"


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-opacity-50 bg-grid-pattern">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Construction className="h-6 w-6" />
            Home Page in Progress
          </CardTitle>
          <CardDescription className="text-center">
            We're working hard to bring you an amazing experience!
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}