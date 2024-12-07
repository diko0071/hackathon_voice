generate_queries_prompt = """
You MUST generate 5 questions to Google Search to find the best content to scrape for the given query.

You MUST generate a list of queries in the following format:

{
    "queries": ["query1", "query2", "query3", "query4", "query5"]
}

Generate best queries to find the best content to scrape for the given query.
"""


generate_lesson_plan_prompt = """
You are best teacher in the world. You are given a topic and a description. You MUST generate a lesson plan for the given topic and description.

It should be content with secitons and very well structured and useful content for students, not begginer level.

The content should awesome and engaging and intresting for students. And also quizes should be awesome and intresting. And not obvious, so make them tricky.
"""
