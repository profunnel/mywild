import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * Timeline Component - Seasonal tick activity visualization
 * 
 * Purpose: Display tick activity levels across months using a stacked area chart
 * Design: Smooth curves with brand colors
 */
export function Timeline({ data }) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Transform data to ensure month names are used if needed, though XAxis can handle numbers
    const chartData = data.map(d => ({
        ...d,
        name: months[d.month - 1]
    }));

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorLarva" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorNymph" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorAdult" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        hide={true}
                        domain={[0, 'dataMax + 20']}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value) => [`${value}%`, undefined]}
                    />
                    <Legend
                        verticalAlign="top"
                        height={36}
                        iconType="circle"
                    />
                    <Area
                        type="monotone"
                        dataKey="larva"
                        name="Larva (Aug-Sep)"
                        stroke="#fbbf24"
                        fillOpacity={1}
                        fill="url(#colorLarva)"
                        stackId="1"
                    />
                    <Area
                        type="monotone"
                        dataKey="nymph"
                        name="Nymph (May-Jul)"
                        stroke="#f97316"
                        fillOpacity={1}
                        fill="url(#colorNymph)"
                        stackId="1"
                    />
                    <Area
                        type="monotone"
                        dataKey="adult"
                        name="Adult (Oct-Nov)"
                        stroke="#ef4444"
                        fillOpacity={1}
                        fill="url(#colorAdult)"
                        stackId="1"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Timeline;
