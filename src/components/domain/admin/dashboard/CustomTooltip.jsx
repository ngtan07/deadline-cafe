import React from 'react'

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white rounded-3 shadow px-3 py-2 border-0" style={{ fontSize: '0.82rem' }}>
                <p className="fw-bold mb-1 text-dark">{payload[0]?.payload?.fullName || label}</p>
                {payload.map((p, i) => (
                    <p key={i} className="mb-0" style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
                ))}
            </div>
        );
    }
    return null;
};

export default CustomTooltip
