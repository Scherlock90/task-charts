import React from 'react';

export const CustomAxisTick = ({ x, y, payload }) => (
    <g transform={`translate(${x},${y})`}>
        <text
            x={0}
            y={0}
            dy={4}
            textAnchor="end"
            fill="#666"
            fontSize="12px"
            transform="rotate(-25)">
            {payload.value}
        </text>
    </g>
)
