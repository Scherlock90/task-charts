import React from 'react';
import { LineChart, Line, Tooltip, Legend, XAxis, YAxis} from 'recharts';

export class CustomTooltip extends React.Component {

    render() {
      const { active, payload, label } = this.props;
  
      if (active) {
        if (payload) {
          return (
            <div className="custom-tooltip">
              <p className="label">
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
        <g transform={`translate(${x},${y})`}>
          <text
            x={0}
            y={0}
            dy={4}
            textAnchor="end"
            fill="#666"
            fontSize="12px"
            transform="rotate(-25)"
          >
            {payload.value}
          </text>
        </g>
      );
    }
  }
  
export function LineCharts(props) {
    return (
      <LineChart
        width={900}
        height={400}
        data={props.data}
        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
      >
        <countrytesianGrid
          strokeDasharray="3 3"
        />
        <XAxis
          tick={<CustomizedAxisTick />}
          type="category"
          interval="preserveStartEnd"
          label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }}
          dataKey="Year"
        />
        <YAxis
          interval="preserveStartEnd"
          type="number"
          domain={['auto', 'auto']}
          label={{
            value: 'Population',
            angle: -90,
            position: 'insideLeft',
            offset: -40
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
        />
        <Legend
          verticalAlign="top"
          payload={[{ value: 'Population trend in Poland', type: 'line', color: 'rgb(136, 132, 216)' }]}
        />
        <Line
          type="monotone"
          dataKey="Value"
          stroke="#8884d8"
        />
      </LineChart>
    )
  }