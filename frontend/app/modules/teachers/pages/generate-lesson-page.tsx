'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  lessonName: z.string().min(1, "Lesson name is required"),
  description: z.string().min(1, "Description is required"),
  sectionsToCover: z.string().min(1, "Sections to cover are required"),
  infoSources: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  historicalCharacter: z.string().min(1, "Historical character is required"),
  quizQuestionCount: z.number().min(1, "At least one question is required"),
  quizComplexity: z.enum(["easy", "medium", "hard"], {
    required_error: "You need to select a quiz complexity",
  }),
})

export default function LessonGeneratorForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lessonName: "",
      description: "",
      sectionsToCover: "",
      infoSources: [],
      historicalCharacter: "",
      quizQuestionCount: 5,
      quizComplexity: "medium",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Lesson General Info</CardTitle>
            <CardDescription>Provide the basic details for your lesson.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                    <Textarea placeholder="Enter lesson description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sectionsToCover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sections to Cover</FormLabel>
                  <FormControl>
                    <Textarea placeholder="List sections to cover" {...field} />
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
                  <div className="mb-4">
                    <FormLabel className="text-base">Where to find info</FormLabel>
                    <FormDescription>
                      Select all that apply.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {["Papers", "Google Search", "Books"].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="infoSources"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lesson Lecture</CardTitle>
            <CardDescription>Specify who will teach the lesson.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="historicalCharacter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Character</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter historical character name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quiz Settings</CardTitle>
            <CardDescription>Configure the quiz for this lesson.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="quizQuestionCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quizComplexity"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Complexity</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="easy" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Easy
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medium" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Medium
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="hard" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Hard
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit">Generate Lesson</Button>
      </form>
    </Form>
  )
}

