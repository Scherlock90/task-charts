import React from 'react';
import { BarChart, Tooltip, Legend, XAxis, YAxis, Bar, Label } from 'recharts';

export class CustomTooltip extends React.Component {

  render() {
    const { active, payload, label } = this.props;

    if (active) {
      if (payload) {
        return (
          <div
            className="custom-tooltip"
          >
            <p
              className="label"
            >
              {`${label}: ${payload[0].value}`}
            </p>
          </div>
        );
      }
    }
    return null;
  }
};

export class CustomizedAxisTick extends React.Component {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g
        transform={`translate(${x},${y})`}
      >
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
    );
  }
}

export function CustomBarCharts(props) {
  return (
    <BarChart
      width={900}
      height={400}
      data={props.data}
    >
      <countrytesianGrid
        strokeDasharray="3 3"
      />
      <XAxis
        tick={<CustomizedAxisTick />}
        dataKey="key"
      >
        <Label
          value="Countries"
          offset={-5}
          position="insideBottomRight"
        />
      </XAxis>
      <YAxis>
        <Label
          value="Number of cities"
          offset={0}
          angle={-90}
          position="insideLeft"
        />
      </YAxis>
      <Tooltip
        content={<CustomTooltip />}
      />
      <Legend
        verticalAlign="top"
        payload={
          [
            {
              value: 'Number of cities in Countries',
              type: 'square',
              color: 'rgb(130, 202, 157)'
            }
          ]
        }
      />
      <Bar
        dataKey="value.count_cities"
        fill="#82ca9d"
      />
    </BarChart>
  )
}  