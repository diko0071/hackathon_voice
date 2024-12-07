from autogen import UserProxyAgent
import dotenv
import asyncio
from typing import Tuple, Dict

from autogen.agentchat.contrib.captainagent import CaptainAgent
import autogen

dotenv.load_dotenv()

config_path = "OAI_CONFIG_LIST"

config_list = autogen.config_list_from_json(
    config_path
)  # You can modify the filter_dict to select your model

llm_config = {"temperature": 0, "config_list": config_list}

def setup_agents() -> Tuple[CaptainAgent, UserProxyAgent]:
    """Setup and return the agents"""
    captain_agent = CaptainAgent(
        name="captain_agent",
        llm_config=llm_config,
        code_execution_config={"use_docker": False, "work_dir": "groupchat"},
        agent_lib="captainagent_expert_library.json",
        agent_config_save_path=None,
    )
    captain_user_proxy = UserProxyAgent(name="captain_user_proxy", human_input_mode="NEVER")
    
    # Register MongoDB function
    captain_agent.register_for_llm(name="mongodb", description="mongodb")(mongodb)
    
    return captain_agent, captain_user_proxy

async def generate_lesson_content(
    captain_agent: CaptainAgent,
    captain_user_proxy: UserProxyAgent,
    topic: str,
    timeframe: str
) -> Dict:
    """Generate lesson content using the agents"""
    query = f"Based on topic and description you MUST generate content for a lesson based on the stcutrued"
    
    captain_user_proxy.reset()
    result = await captain_user_proxy.initiate_chat(captain_agent, message=query)
    return {"lesson_plan": result}

# Modified run function for local testing
async def run(topic: str = "Machine Learning", timeframe: str = "2020-2022"):
    captain_agent, captain_user_proxy = setup_agents()
    return await generate_lesson_content(captain_agent, captain_user_proxy, topic, timeframe)

def mongodb(paper_id: str):
    from pymongo import MongoClient

    client = MongoClient("mongodb://localhost:27017/")
    db = client["arxiv"]
    collection = db["papers"]
    return collection

if __name__ == "__main__":
    result = asyncio.run(run())
    print(result)
