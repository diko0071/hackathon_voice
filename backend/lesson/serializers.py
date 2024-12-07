
from typing import TypedDict, Literal, Optional, Annotated
from rest_framework import serializers
from .models import Lesson, LessonSection, Quiz, QuizQuestion, QuizQuestionOption

class QueriesListSerializer(TypedDict):
    queries: list[str]

class QuizQuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestionOption
        fields = ['id', 'content', 'is_correct']

class QuizQuestionSerializer(serializers.ModelSerializer):
    options = QuizQuestionOptionSerializer(many=True, read_only=True)
    
    class Meta:
        model = QuizQuestion
        fields = ['id', 'question', 'order', 'options']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuizQuestionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'order', 'questions']

class LessonSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonSection
        fields = ['id', 'title', 'content', 'order']

class LessonSerializer(serializers.ModelSerializer):
    sections = LessonSectionSerializer(many=True, read_only=True)
    quizzes = QuizSerializer(many=True, read_only=True)
    
    class Meta:
        model = Lesson
        fields = ['id', 'name', 'description', 'avatar_face_id', 'sections', 'quizzes']
