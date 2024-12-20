
from typing import TypedDict, Optional, List
from typing import TypedDict, Literal, Optional, Annotated
from rest_framework import serializers
from .models import Lesson, LessonSection, Quiz, QuizQuestion, QuizQuestionOption

class QueriesListSerializerOpenAI(TypedDict):
    queries: list[str]

class QuizQuestionOptionSerializerOpenAI(TypedDict):  
    content: str
    is_correct: bool

class QuizQuestionSerializerOpenAI(TypedDict):
    question: str
    order: int
    options: List[QuizQuestionOptionSerializerOpenAI]

class QuizSerializerOpenAI(TypedDict):
    title: str
    order: int
    questions: List[QuizQuestionSerializerOpenAI]

class LessonSectionSerializerOpenAI(TypedDict):
    title: str
    content: Optional[str]
    order: int

class LessonSerializerOpenAI(TypedDict):
    name: str
    avatar_face_id: Optional[str]
    description: Optional[str]
    sections: List[LessonSectionSerializerOpenAI]
    quizzes: List[QuizSerializerOpenAI]

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
        fields = ['id', 'name', 'description', 'avatar_face_id', 'initial_prompt', 'sections', 'quizzes']
