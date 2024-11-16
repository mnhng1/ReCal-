from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.messages import BaseMessage

class InMemoryChatMessageHistory(BaseChatMessageHistory):
    def __init__(self):
        self._messages = []
    
    def add_message(self, message: BaseMessage) -> None:
        self._messages.append(message)
    
    def clear(self) -> None:
        self._messages = []
    
    @property
    def messages(self) -> list[BaseMessage]:
        return self._messages
