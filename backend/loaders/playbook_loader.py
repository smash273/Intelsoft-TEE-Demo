import json
from pathlib import Path

class PlaybookLoader:

    def __init__(self, folder: str = None):
        # Default folder is 'data'
        if folder is None:
            folder = "data"

        self.folder = folder
        base_dir = Path(__file__).resolve().parent.parent
        self.path = base_dir / folder / "playbooks.json"

        with open(self.path) as f:
            self.playbooks = json.load(f)

    def get_all(self):
        return self.playbooks

    def find_playbook(self, user_message):
        user_message = user_message.lower()
        for playbook in self.playbooks:
            keywords = playbook["intent_detection"]["keywords"]
            for keyword in keywords:
                if keyword in user_message:
                    return playbook
        return None