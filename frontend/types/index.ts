export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Incident {
  incident_id: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  resolver_group: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  description: string;
  created_at: string;
}

export interface Playbook {
  scenario_id: string;
  scenario_name: string;
  category: string;
  user_intent_examples: string[];
  classification_keywords: string[];
  troubleshooting_steps: string[];
  ticketing: {
    create_on_escalation: boolean;
    default_priority: string;
    resolver_group: string;
  };
  automation: {
    can_auto_resolve: boolean;
    requires_restart: boolean;
  };
  escalation: {
    threshold: number;
    escalate_to: string;
    auto_create_incident: boolean;
  };
}

export interface ChatResponse {
  response: string;
  incident?: Incident;
  playbook_used?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}