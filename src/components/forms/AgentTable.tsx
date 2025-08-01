import { useEffect, useState } from 'react';
import axios from 'axios';

interface Agent {
    id: string;
    hostname: string;
    ip: string;
    status: 'online' | 'offline';
    os: string;
    version: string;
}

export default function AgentTable() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const res = await axios.get('/api/agents');
                setAgents(res.data);
            } catch (err) {
                console.error('Gagal mengambil data agent:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);

    if (loading) return <div>Memuat data agent...</div>;

    return (
        <table className="min-w-full border">
            <thead>
            <tr className="bg-gray-200">
                <th className="px-4 py-2">Hostname</th>
                <th className="px-4 py-2">IP</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">OS</th>
                <th className="px-4 py-2">Versi</th>
            </tr>
            </thead>
            <tbody>
            {agents.map((agent) => (
                <tr key={agent.id} className="border-t">
                    <td className="px-4 py-2">{agent.hostname}</td>
                    <td className="px-4 py-2">{agent.ip}</td>
                    <td className="px-4 py-2">
              <span className={
                  agent.status === 'online' ? 'text-green-600' : 'text-red-600'
              }>
                {agent.status}
              </span>
                    </td>
                    <td className="px-4 py-2">{agent.os}</td>
                    <td className="px-4 py-2">{agent.version}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
