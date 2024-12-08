from temporalio import activity
from lesson.prompts import generate_queries_prompt
from lesson.serializers import QueriesListSerializerOpenAI
from lesson.services import search_content, openai_call

@activity.defn(name="generate_queries")
async def generate_queries(title: str, description: str):
    user_message = f'Title: {title}\nDescription: {description}'
    response = await openai_call(
        system_message=generate_queries_prompt, 
        user_message=user_message, 
        serializer=QueriesListSerializerOpenAI
    )
    return response["queries"]

@activity.defn(name="scrape_content")
async def scrape_content(queries: list[str]):
    results = []
    for query in queries:
        raw_results = await search_content(query)
        formatted_result = {
            "query": query,
            "pages": [
                {
                    "title": result["title"],
                    "content": result["content"]
                }
                for result in raw_results
            ]
        }
        results.append(formatted_result)
    return results

