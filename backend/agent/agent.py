
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

import os

load_dotenv()  

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')




model = ChatOpenAI(model="gpt-3.5-turbo")



print(model.invoke([HumanMessage(content="Hi! I'm Bob")]))