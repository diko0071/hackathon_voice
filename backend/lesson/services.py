import os
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_openai import ChatOpenAI
from tavily import TavilyClient
from functools import partial
import asyncio


async def openai_call(system_message, user_message, model_name="gpt-4o-mini", serializer=None):
    llm = ChatOpenAI(model_name=model_name, temperature=0, api_key=os.getenv("OPENAI_API_KEY"))
    if serializer:
        llm = llm.with_structured_output(serializer) 


    messages = [
        SystemMessage(content=system_message),
        HumanMessage(content=user_message)
    ]

    response = await llm.ainvoke(messages)

    return response


async def search_content(query):
    tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
    response = await asyncio.get_event_loop().run_in_executor(
        None,
        partial(tavily_client.search, query)
    )
    return response.get("results")

