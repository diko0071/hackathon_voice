from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search_lesson_content, name='search-content'),
    path('start-workflow/', views.start_collect_info_workflow, name='start-workflow'),
]
