from backend.lesson.models import Lesson
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Lesson
from .serializers import LessonSerializer
from temporalio.client import Client
import asyncio
import os
from .services import search_content
from rest_framework.response import Response
import json
from django.http import JsonResponse
from workflows.collect_info_workflow import CollectInfoWorkflow

class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Lesson.objects.prefetch_related(
            'sections',
            'quizzes',
            'quizzes__questions',
            'quizzes__questions__options'
        ).all()
        return queryset

@api_view(["POST"])
@permission_classes([])
@authentication_classes([])
def start_collect_info_workflow(request):
    try:
        title = request.data.get("title")
        description = request.data.get("description")
        avatar_face_id = request.data.get("avatar_face_id")
        
        if not title or not description:
            return JsonResponse({
                "error": "Both title and description are required"
            }, status=400)

        async def start_workflow():
            client = await Client.connect(os.getenv("TEMPORAL_HOST"))
            return await client.start_workflow(
                CollectInfoWorkflow.run,
                args=[title, description, avatar_face_id],
                id=f"collect-info-{title[:30]}-{os.urandom(4).hex()}",
                task_queue=os.getenv("TEMPORAL_TASK_QUEUE")
            )

        handle = asyncio.run(start_workflow())
        
        return JsonResponse({
            "status": "workflow_started",
            "workflow_id": handle.id
        })
        
    except Exception as e:
        return JsonResponse({
            "error": str(e)
        }, status=500)