from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferWindowMemory, InMemoryChatMessageHistory

store = {}  # memory is maintained outside the chain


def get_session_history(session_id: str) -> InMemoryChatMessageHistory:
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
        return store[session_id]

    memory = ConversationBufferWindowMemory(
        chat_memory=store[session_id],
        k=10,
        return_messages=True,
    )
    assert len(memory.memory_variables) == 1
    key = memory.memory_variables[0]
    messages = memory.load_memory_variables({})[key]
    store[session_id] = InMemoryChatMessageHistory(messages=messages)
    return store[session_id]


llm = ChatOpenAI(temperature=0.9, model="gpt-4o-mini")

chain = RunnableWithMessageHistory(
    llm,
    get_session_history,
)


@csrf_exempt
def chat_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            session_id = data.get("session_id", 1)
            user_message = data.get("message", "").strip()
            input_message = [HumanMessage(content=user_message)]

            if not user_message:
                return JsonResponse({"error": "No message provided."}, status=400)

            # Get the response from the chain
            response = chain.invoke(
                input_message, config={"configurable": {"session_id": session_id}}
            )

            return JsonResponse(
                {"user_message": user_message, "assistant_response": response},
                status=200,
            )

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON."}, status=400)
    else:
        return JsonResponse({"error": "POST request required."}, status=405)
