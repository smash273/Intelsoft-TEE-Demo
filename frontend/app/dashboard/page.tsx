'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import IncidentPanel from '@/components/IncidentPanel';
import { Incident } from '@/types';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('chat');
  const [currentIncident, setCurrentIncident] = useState<Incident | null>(null);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleIncidentCreated = (incident: Incident) => {
    setCurrentIncident(incident);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {activeTab === 'chat' && (
              <ChatInterface onIncidentCreated={handleIncidentCreated} />
            )}
            {activeTab === 'incidents' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Incident History</h2>
                {/* Add incident history component here */}
              </div>
            )}
            {activeTab === 'status' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">System Status</h2>
                {/* Add system status component here */}
              </div>
            )}
          </div>

          {/* Right Panel - Incidents */}
          <div className="w-80 border-l">
            <IncidentPanel />
          </div>
        </div>
      </div>
    </div>
  );
}