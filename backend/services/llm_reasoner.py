# services/llm_reasoner.py
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env
load_dotenv()

# Read the OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError(
        "OPENAI_API_KEY not found in environment. Please set it in your .env file."
    )

# Initialize OpenAI client
client = OpenAI(api_key=api_key)


class LLMReasoner:
    """
    This class handles reasoning for the AI agent.
    Uses OpenAI to determine next action based on user messages.
    """

    def __init__(self):
        self.client = client

    def decide_action(self, user_message: str, current_step: dict, playbook: dict) -> dict:
        """
        Decide the next action for a user message in a conversation flow.

        Args:
            user_message (str): Message from the user
            current_step (dict): Current step of the playbook conversation
            playbook (dict): Full playbook data

        Returns:
            dict: Decision dict, e.g., {"next_step": True} or {"resolve_issue": True}
        """

        # Placeholder logic — integrate OpenAI API call here if needed
        # Example structure for demonstration:
        # response = self.client.chat.completions.create(
        #     model="gpt-4",
        #     messages=[{"role": "user", "content": user_message}]
        # )
        # decision = parse_response(response)

        # For now, simple stub: always go to next step
        return {"next_step": True}