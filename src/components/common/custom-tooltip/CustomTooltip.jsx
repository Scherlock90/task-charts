import React from 'react';

export const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        if (payload) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label}: ${payload[0].value}`}</p>
                </div>
            );
        }
    }
    return null;
}
