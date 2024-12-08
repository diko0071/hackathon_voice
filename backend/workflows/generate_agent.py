from temporalio import activity
from typing import List, Dict
from lesson.services import openai_call
from lesson.prompts import generate_lesson_plan_prompt
from lesson.serializers import LessonSerializer, LessonSerializerOpenAI, QuizSerializerOpenAI
from lesson.models import Lesson, LessonSection, Quiz, QuizQuestion, QuizQuestionOption
from asgiref.sync import sync_to_async

@activity.defn
async def generate_lesson_content(title: str, topic: str, description: str, avatar_face_id: str) -> Dict:
    system_message = generate_lesson_plan_prompt

    user_message = f"""
    Title: {title}
    Topic: {topic}
    Description: {description}
    Avatar Face ID: {avatar_face_id}
    """

    response = await openai_call(system_message, user_message, serializer=LessonSerializerOpenAI)

    return response

@activity.defn
async def generate_quiz_questions(title: str, topic: str, description: str) -> Dict:
    system_message = """Create a quiz with multiple-choice questions based on the given topic.
    Each question should have 4 options with exactly one correct answer."""

    user_message = f"""
    Title: {title}
    Topic: {topic}
    Description: {description}
    """

    response = await openai_call(system_message, user_message, serializer=QuizSerializerOpenAI)

    return response

@activity.defn
async def save_lesson_content(lesson_data: Dict, quiz_data: Dict) -> Dict:
    """Save the generated lesson content and quiz to Django models."""
    
    @sync_to_async
    def create_lesson():
        lesson = Lesson.objects.create(
            name=lesson_data['name'],
            description=lesson_data.get('description'),
            avatar_face_id=lesson_data.get('avatar_face_id')
        )
        
        for section in lesson_data['sections']:
            LessonSection.objects.create(
                lesson=lesson,
                title=section['title'],
                content=section['content'],
                order=section['order']
            )
            
        quiz = Quiz.objects.create(
            lesson=lesson,
            title=quiz_data['title'],
            order=quiz_data['order']
        )
        
        for question_data in quiz_data['questions']:
            question = QuizQuestion.objects.create(
                quiz=quiz,
                question=question_data['question'],
                order=question_data['order']
            )
            
            for option in question_data['options']:
                QuizQuestionOption.objects.create(
                    question=question,
                    content=option['content'],
                    is_correct=option['is_correct']
                )
                
        return lesson.id, quiz.id

    lesson_id, quiz_id = await create_lesson()
    
    return {
        "lesson_id": lesson_id,
        "quiz_id": quiz_id
    }

