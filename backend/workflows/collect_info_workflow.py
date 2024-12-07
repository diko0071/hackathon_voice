from temporalio import workflow
from datetime import timedelta
from typing import List, Dict
import pymongo


@workflow.defn
class CollectInfoWorkflow:
    @workflow.run
    async def run(self, title: str, description: str, avatar_face_id: str) -> Dict:
        queries = await workflow.execute_activity(
            "generate_queries",
            args=[title, description],
            start_to_close_timeout=timedelta(minutes=2),
        )

        results = await workflow.execute_activity(
            "scrape_content",
            args=[queries],
            start_to_close_timeout=timedelta(minutes=5),
        )

        lesson_content = await workflow.execute_activity(
            "generate_lesson_content",
            args=[title, description, str(results), avatar_face_id],
            start_to_close_timeout=timedelta(minutes=10)
        )

        quiz_questions = await workflow.execute_activity(
            "generate_quiz_questions",
            args=[title, description, str(results)],
            start_to_close_timeout=timedelta(minutes=10)
        )

        saved_content = await workflow.execute_activity(
            "save_lesson_content",
            args=[lesson_content, quiz_questions],
            start_to_close_timeout=timedelta(minutes=2)
        )

        return {
            "collected_info": results,
            "lesson_content": lesson_content,
            "quiz_questions": quiz_questions,
            "saved_ids": saved_content
        }

        return results
