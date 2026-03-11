import React from 'react';

const StatsCard = ({ iconBg, iconSvg, value, title, change, changeType }) => {
    return (
        <div className="stats-card">
            <div className="stats-icon" style={{ background: iconBg }}>
                {iconSvg}
            </div>
            <div className="stats-value">{value}</div>
            <div className="stats-title">{title}</div>
            <div className={`stats-change ${changeType}`}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                {change}
            </div>
        </div>
    );
};

export default StatsCard;