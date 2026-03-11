'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Clock, Users } from 'lucide-react';
import { Incident } from '@/types';
import { incidents } from '@/services/api';

const priorityColors = {
  Critical: 'bg-destructive text-destructive-foreground',
  High: 'bg-orange-500 text-white',
  Medium: 'bg-yellow-500 text-white',
  Low: 'bg-green-500 text-white',
};

export default function IncidentPanel() {
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentIncidents();
  }, []);

  const loadRecentIncidents = async () => {
    try {
      const data = await incidents.getRecent(5);
      // FIX: extract array from backend response
      const mappedIncidents = (data.incidents || []).map((incident: any) => ({
        incident_id: incident.id, // backend 'id' → frontend 'incident_id'
        description: incident.issue, // backend 'issue' → frontend 'description'
        status: incident.status,
        created_at: incident.created_at,
        priority: incident.priority || 'Low', // default value if backend doesn't have it
        resolver_group: incident.resolver_group || 'N/A', // default value
      }));
      setRecentIncidents(mappedIncidents);
    } catch (error) {
      console.error('Failed to load incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  const addIncident = (incident: Incident) => {
    setRecentIncidents((prev) => [incident, ...prev].slice(0, 5));
  };

  return (
    <div className="h-full bg-card border-l">
      <div className="p-4 border-b">
        <h3 className="font-semibold flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-primary" />
          Active Incidents
        </h3>
      </div>

      <div className="p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : recentIncidents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No active incidents</p>
            <p className="text-sm">All systems operational</p>
          </div>
        ) : (
          recentIncidents.map((incident) => (
            <div
              key={incident.incident_id}
              className="glass-panel rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">
                  {incident.incident_id}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    priorityColors[incident.priority]
                  }`}
                >
                  {incident.priority}
                </span>
              </div>

              <p className="text-sm line-clamp-2">{incident.description}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {incident.resolver_group}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(incident.created_at).toLocaleTimeString()}
                </div>
              </div>

              <div className="pt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    incident.status === 'Open'
                      ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
                      : incident.status === 'In Progress'
                      ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'
                      : incident.status === 'Resolved'
                      ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                      : 'bg-gray-500/20 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {incident.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}