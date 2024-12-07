import os
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_openai import ChatOpenAI
from tavily import TavilyClient


def openai_call(system_message, user_message, model_name="gpt-4o-mini"):
    llm = ChatOpenAI(model_name=model_name, temperature=0, api_key=os.getenv("OPENAI_API_KEY"))

    messages = [
        SystemMessage(content=system_message),
        HumanMessage(content=user_message)
    ]

    response = llm.invoke(messages)

    return response.content 


def search_content(query):
    tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
    return tavily_client.search(query)