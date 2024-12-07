from django.contrib import admin
from .models import Lesson, LessonSection, Quiz, QuizQuestion, QuizQuestionOption

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')

@admin.register(LessonSection)
class LessonSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'lesson', 'order')
    list_filter = ('lesson',)
    ordering = ('lesson', 'order')

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'lesson', 'order')
    list_filter = ('lesson',)
    ordering = ('lesson', 'order')

@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'quiz', 'order')
    list_filter = ('quiz',)
    ordering = ('quiz', 'order')

@admin.register(QuizQuestionOption)
class QuizQuestionOptionAdmin(admin.ModelAdmin):
    list_display = ('content', 'question', 'is_correct')
    list_filter = ('question', 'is_correct')