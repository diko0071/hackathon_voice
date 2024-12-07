from temporalio import workflow
from datetime import timedelta
from typing import List, Dict

@workflow.defn
class CollectInfoWorkflow:
    @workflow.run
    async def run(self, title: str, description: str) -> List[Dict]:
        queries = await workflow.execute_activity(
            "generate_queries",
            args=[title, description],
            start_to_close_timeout=timedelta(minutes=2)
        )
        
        results = await workflow.execute_activity(
            "scrape_content",
            args=[queries],
            start_to_close_timeout=timedelta(minutes=5)
        )
        
        return results