from django.urls import path
from . import views

urlpatterns = [
    path('start-workflow/', views.start_collect_info_workflow, name='start-workflow'),
]
