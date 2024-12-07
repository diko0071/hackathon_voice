from django.urls import path
from . import views

urlpatterns = [
    path('run-workflow/', views.run_workflow, name='run-workflow'),
]