import asyncio
from temporalio.client import Client
from temporalio.worker import Worker
from workflows.collect_info import (
    RandomPrinterWorkflow,
    generate_random_text,
    generate_random_number
)
import os
from dotenv import load_dotenv

load_dotenv()

async def run_worker():
    while True:
        try:
            client = await Client.connect(os.getenv("TEMPORAL_SERVER_URL"))
            break
        except Exception as e:
            print("Waiting for Temporal server to be ready...")
            await asyncio.sleep(5)
    
    worker = Worker(
        client,
        task_queue=os.getenv("TEMPORAL_TASK_QUEUE"),
        workflows=[RandomPrinterWorkflow],
        activities=[generate_random_text, generate_random_number]
    )

    print(f"Starting worker, connecting to task queue: {os.getenv('TEMPORAL_TASK_QUEUE')}")
    await worker.run()

if __name__ == "__main__":
    asyncio.run(run_worker())