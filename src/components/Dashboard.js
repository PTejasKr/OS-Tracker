
import React, { useState, useEffect } from 'react';
import { fetchMetrics } from '../api';

export default function Dashboard() {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        // Now polling every 5 seconds instead of loading once
        const interval = setInterval(async () => {
            const data = await fetchMetrics();
            setMetrics(data);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!metrics) return <div>Loading...</div>;

    return (
        <div className="dashboard-container">
            <h2>System Overview</h2>
            <div className="metric-card">
                <h3>CPU Usage</h3>
                <p>{metrics.cpu}%</p>
            </div>
            <div className="metric-card">
                <h3>Memory Usage</h3>
                <p>{metrics.memory}%</p>
            </div>
        </div>
    );
}
