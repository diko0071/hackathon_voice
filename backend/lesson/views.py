from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from temporalio.client import Client
import asyncio
import os
from workflows.collect_info import RandomPrinterWorkflow

@api_view(["POST"])
@permission_classes([])
@authentication_classes([])
def run_workflow(request):
    async def start_workflow():
        client = await Client.connect(os.getenv("TEMPORAL_SERVER_URL"))
        
        handle = await client.start_workflow(
            RandomPrinterWorkflow.run,
            id=f"random-printer-{os.urandom(4).hex()}",
            task_queue=os.getenv("TEMPORAL_TASK_QUEUE")
        )
        
        return handle.id
    
    workflow_id = asyncio.run(start_workflow())
    
    return JsonResponse({
        "status": "success",
        "workflow_id": workflow_id,
        "message": "Workflow started successfully"
    })



