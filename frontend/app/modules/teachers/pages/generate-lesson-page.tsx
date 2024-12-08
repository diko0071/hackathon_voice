'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { lessonApi } from '@/app/api'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { useState } from "react"

const formSchema = z.object({
  lessonName: z.string().min(1, "Lesson name is required"),
  description: z.string().min(1, "Description is required"),
  avatarFaceId: z.string().optional(),
  // Additional fields for UI only
  infoSources: z.array(z.string()).optional(),
  historicalCharacter: z.string().optional(),
  quizQuestionCount: z.string().optional(),
  quizComplexity: z.string().optional(),
})

const infoSourceOptions = [
  { id: "papers", label: "Academic Papers" },
  { id: "google", label: "Google Search" },
  { id: "books", label: "Books" },
]

const characterOptions = [
  { value: "einstein", label: "Albert Einstein" },
  { value: "curie", label: "Marie Curie" },
  { value: "newton", label: "Isaac Newton" },
  { value: "napoleon", label: "Napoleon Bonaparte", avatarFaceId: "ba83c375-3720-44b8-a842-b0d188ecd099" },
  { value: "tesla", label: "Nikola Tesla", avatarFaceId: "95708b15-bcb8-4d40-a4c5-b233778858b4" },
]

export default function LessonGeneratorForm() {
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lessonName: "",
      description: "",
      avatarFaceId: "",
      infoSources: [],
      historicalCharacter: "",
      quizQuestionCount: "5",
      quizComplexity: "medium",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const selectedCharacter = characterOptions.find(c => c.value === values.historicalCharacter);
      const response = await lessonApi.startWorkflow({
        title: values.lessonName,
        description: values.description,
        avatarFaceId: values.avatarFaceId || selectedCharacter?.avatarFaceId
      })
      setAlert({
        type: 'success',
        message: 'Lesson generation started successfully!'
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to start lesson generation. Please try again.'
      });
      console.error('Error starting workflow:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Generate New Lesson</h1>

        {alert && (
          <Alert variant={alert.type === 'success' ? 'default' : 'destructive'} className="mb-6">
            {alert.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="lessonName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter lesson name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter lesson description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="infoSources"
            render={() => (
              <FormItem>
                <FormLabel>Information Sources</FormLabel>
                <div className="grid grid-cols-3 gap-8">
                  {infoSourceOptions.map((source) => (
                    <FormField
                      key={source.id}
                      control={form.control}
                      name="infoSources"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(source.id)}
                              onCheckedChange={(checked) => {
                                const value = field.value || []
                                if (checked) {
                                  field.onChange([...value, source.id])
                                } else {
                                  field.onChange(value.filter((v) => v !== source.id))
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {source.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="historicalCharacter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Historical Character Teacher</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a character" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {characterOptions.map((character) => (
                      <SelectItem key={character.value} value={character.value}>
                        {character.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="quizQuestionCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Quiz Questions</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select question count" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[5, 10, 15, 20].map((count) => (
                        <SelectItem key={count} value={count.toString()}>
                          {count} Questions
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quizComplexity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Complexity</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      {['easy', 'medium', 'hard'].map((complexity) => (
                        <FormItem key={complexity} className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value={complexity} />
                          </FormControl>
                          <FormLabel className="font-normal capitalize">
                            {complexity}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full">Generate Lesson</Button>
      </form>
    </Form>
  )
}