from temporalio import workflow, activity
import random
import asyncio
from datetime import timedelta

# Activity functions
@activity.defn
async def generate_random_text() -> str:
    texts = ["Hello", "World", "Temporal", "Python", "Workflow"]
    return random.choice(texts)

@activity.defn
async def generate_random_number() -> int:
    return random.randint(1, 100)

# Workflow definition
@workflow.defn
class RandomPrinterWorkflow:
    @workflow.run
    async def run(self) -> str:
        results = []
        
        # Run 5 times instead of time-based loop
        for _ in range(5):
            # Execute activities
            text = await workflow.execute_activity(
                generate_random_text,
                start_to_close_timeout=timedelta(seconds=5)
            )
            
            number = await workflow.execute_activity(
                generate_random_number,
                start_to_close_timeout=timedelta(seconds=5)
            )
            
            result = f"{text}: {number}"
            print(result)  # This will show in worker logs
            results.append(result)
            
            await asyncio.sleep(1)  # Wait 1 second between iterations
            
        return "\n".join(results)