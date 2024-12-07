from autogen import UserProxyAgent

from autogen.agentchat.contrib.captainagent import CaptainAgent
import autogen

config_path = "OAI_CONFIG_LIST"

config_list = autogen.config_list_from_json(
    config_path, filter_dict={"model": ["gpt-4o"]}
)  # You can modify the filter_dict to select your model

llm_config = {"temperature": 0, "config_list": config_list}

# build agents
captain_agent = CaptainAgent(
    name="captain_agent",
    llm_config=llm_config,
    code_execution_config={"use_docker": False, "work_dir": "groupchat"},
    agent_lib="captainagent_expert_library.json",
    agent_config_save_path=None,  # If you'd like to save the created agents in nested chat for further use, specify the save directory here
)
captain_user_proxy = UserProxyAgent(name="captain_user_proxy", human_input_mode="NEVER")

query = "find papers on LLM applications from arxiv in the last week, create a markdown table of different domains. After collecting the data, point out future research directions in light of the collected data."

result = captain_user_proxy.initiate_chat(captain_agent, message=query)
