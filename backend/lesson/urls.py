from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'lessons', views.LessonViewSet, basename='lesson')

urlpatterns = [
    path('', include(router.urls)),
    path('start-workflow/', views.start_collect_info_workflow, name='start-workflow'),
]
