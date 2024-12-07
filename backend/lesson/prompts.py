generate_queries_prompt = """
You MUST generate 5 questions to Google Search to find the best content to scrape for the given query.

You MUST generate a list of queries in the following format:

{
    "queries": ["query1", "query2", "query3", "query4", "query5"]
}

Generate best queries to find the best content to scrape for the given query.
"""