
from typing import TypedDict, Optional, List

class QueriesListSerializer(TypedDict):
    queries: list[str]

class QuizQuestionOptionSerializer(TypedDict):  
    content: str
    is_correct: bool

class QuizQuestionSerializer(TypedDict):
    question: str
    order: int
    options: List[QuizQuestionOptionSerializer]

class QuizSerializer(TypedDict):
    title: str
    order: int
    questions: List[QuizQuestionSerializer]

class LessonSectionSerializer(TypedDict):
    title: str
    content: Optional[str]
    order: int

class LessonSerializer(TypedDict):
    name: str
    avatar_face_id: Optional[str]
    description: Optional[str]
    sections: List[LessonSectionSerializer]
    quizzes: List[QuizSerializer]


