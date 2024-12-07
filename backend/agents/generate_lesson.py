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

topic = "Machine Learning"
timeframe = "2020-2022"

#from arxiv

query = f"find papers on {topic} in the timeframe {timeframe}, create a markdown table of different domains. After collecting the data, organize it into 4 markdown tables. Each table represents a lecture which is composed of sections, each section should have a lesson material and quiz section. Make sure to clearly annotate correct answers for the quizzes."


def run():
    return captain_user_proxy.initiate_chat(captain_agent, message=query)


if __name__ == "__main__":
    print(run())

