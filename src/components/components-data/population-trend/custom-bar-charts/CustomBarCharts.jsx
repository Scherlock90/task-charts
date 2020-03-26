import React from 'react';
import { LineChart, Line, Tooltip, Legend, XAxis, YAxis} from 'recharts';

import { CustomTooltip, CustomAxisTick } from '../../../common/index'

export function LineCharts({ data }) {
    return (
      <LineChart
        width={900}
        height={400}
        data={data}
        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
      >
        <countrytesianGrid strokeDasharray="3 3" />
        <XAxis
          tick={<CustomAxisTick />}
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
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          payload={[{ value: 'Population trend in Poland', type: 'line', color: 'rgb(136, 132, 216)' }]}
        />
        <Line type="monotone" dataKey="Value" stroke="#8884d8" />
      </LineChart>
    )
  }