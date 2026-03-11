from services.llm_reasoner import LLMReasoner

class AIAgent:
    def __init__(self, playbook_loader, incident_service):
        self.loader = playbook_loader
        self.incidents = incident_service
        self.reasoner = LLMReasoner()
        self.sessions = {}

    async def get_response(self, user_id: str, message: str):
        """
        Main async entry point for processing messages
        """
        if user_id not in self.sessions:
            playbook = self.loader.find_playbook(message)
            if not playbook:
                return {"response": "Please describe your issue in more detail."}

            self.sessions[user_id] = {"playbook": playbook, "step_index": 0}

        session = self.sessions[user_id]
        playbook = session["playbook"]
        step_index = session["step_index"]
        steps = playbook["conversation_flow"]
        step = steps[step_index]

        decision = self.reasoner.decide_action(message, step, playbook)

        # Issue resolved
        if "resolve_issue" in decision:
            del self.sessions[user_id]
            return {"response": "✅ Issue resolved. Glad I could help!"}

        # Move to next step
        if "next_step" in decision:
            session["step_index"] += 1

        # Escalate if at end
        if session["step_index"] >= len(steps):
            incident = await self.incidents.create_incident(
                user_id=user_id,
                scenario=playbook["scenario_name"],
                description=message,
                priority=playbook["ticketing"]["priority"],
                resolver_group=playbook["ticketing"]["resolver_group"]
            )
            del self.sessions[user_id]
            return {
                "response": f"🚨 Issue escalated.\n\nIncident ID: {incident.id}\nPriority: {incident.priority}\nOur support team will contact you shortly."
            }

        next_step = steps[session["step_index"]]
        return {"response": next_step["bot_prompt"]}