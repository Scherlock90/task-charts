import React from 'react';
import { BarChart, Tooltip, Legend, XAxis, YAxis, Bar, Label } from 'recharts';

import { CustomTooltip, CustomAxisTick } from '../index'

export function CustomBarCharts ({ data, YAxisLabelName, XAxisLabelName, payloadValue, dataKey }) {
  return (
    <BarChart width={900} height={400} data={data}>
      <countrytesianGrid strokeDasharray="3 3" />
      <XAxis tick={<CustomAxisTick />} dataKey="key">
        <Label value={XAxisLabelName} offset={-5} position="insideBottomRight"/>
      </XAxis>
      <YAxis>
        <Label value={YAxisLabelName} offset={0} angle={-90} position="insideLeft" />
      </YAxis>
      <Tooltip content={<CustomTooltip />} />
      <Legend
        verticalAlign="top"
        payload={
          [
            {
              value: payloadValue,
              type: 'square',
              color: 'rgb(130, 202, 157)'
            }
          ]
        }
      />
      <Bar {...{ dataKey }} fill="#82ca9d" />
    </BarChart>
  )
}
