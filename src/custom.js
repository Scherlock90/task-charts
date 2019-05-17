const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Label, Bar} = Recharts;
const data = [
  {
    "value": 0.09,
    "key": 0
  },
  {
    "value": 0.54,
    "key": 0.5
  },
  {
    "value": 0.36,
    "key": 1
  },
  {
    "value": 1.08,
    "key": 1.5
  },
  {
    "value": 1.16,
    "key": 2
  },
  {
    "value": 2.69,
    "key": 2.5
  },
  {
    "value": 5.56,
    "key": 3
  },
  {
    "value": 3.32,
    "key": 3.5
  },
  {
    "value": 4.21,
    "key": 4
  },
  {
    "value": 4.12,
    "key": 4.5
  },
  {
    "value": 7.8,
    "key": 5
  },
  {
    "value": 5.11,
    "key": 5.5
  },
  {
    "value": 5.73,
    "key": 6
  },
  {
    "value": 7.89,
    "key": 6.5
  },
  {
    "value": 5.73,
    "key": 7
  },
  {
    "value": 7.17,
    "key": 7.5
  },
  {
    "value": 6.54,
    "key": 8
  },
  {
    "value": 4.84,
    "key": 8.5
  },
  {
    "value": 6.72,
    "key": 9
  },
  {
    "value": 6,
    "key": 9.5
  },
  {
    "value": 6,
    "key": 10
  },
  {
    "value": 3.41,
    "key": 10.5
  },
  {
    "value": 2.15,
    "key": 11
  },
  {
    "value": 0.99,
    "key": 11.5
  },
  {
    "value": 0.54,
    "key": 12
  },
  {
    "value": 0.09,
    "key": 12.5
  },
  {
    "value": 0.18,
    "key": 13
  },
  {
    "value": 0,
    "key": 13.5
  },
  {
    "value": 0,
    "key": 14
  },
  {
    "value": 0,
    "key": 14.5
  },
  {
    "value": 0,
    "key": 15
  },
  {
    "value": 0,
    "key": 15.5
  },
  {
    "value": 0,
    "key": 16
  },
  {
    "value": 0,
    "key": 16.5
  },
  {
    "value": 0,
    "key": 17
  },
  {
    "value": 0,
    "key": 17.5
  },
  {
    "value": 0,
    "key": 18
  },
  {
    "value": 0,
    "key": 18.5
  },
  {
    "value": 0,
    "key": 19
  },
  {
    "value": 0,
    "key": 19.5
  },
  {
    "value": 0,
    "key": 20
  },
  {
    "value": 0,
    "key": 20.5
  }
];
const SimpleLineChart = React.createClass({
    render () {
    return (
        <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data} barCategoryGap="25%" margin={{top: 20, right: 0, left: 20, bottom: 20}}>
          <CartesianGrid strokeDasharray="6" vertical={false} />
          <XAxis dataKey="key" tick={<CustomizedAxisTick/>} interval={1}>
              <Label value="Y Label" offset={-10} position="insideBottom" style={{"fontSize":11}}/>
          </XAxis>
          <YAxis  yAxisId="left" orientation="left" tick={{fontSize :10}}
              label={<AxisLabel axisType="yAxis" x={0} y={150} width={0} height={0}>{{
                  content: 'X Label',
                  props: { fontSize: 11 },
              }}</AxisLabel>}>
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomToolTip/>}/>
          <Bar yAxisId="left" dataKey="value" fill="#5db487">
          </Bar>
      </ComposedChart>
    </ResponsiveContainer>
    );
  }
})

function renderText(child, x, y, rotate, stroke, key) {
  if (child && child.content) {
    return (<text
      key={key}
      x={x}
      y={y}
      transform={`rotate(${rotate})`}
      textAnchor="middle"
      stroke={stroke}
      {...child.props}>
      {child.content}
    </text>);
  }

  return (<text
    key={key}
    x={x}
    y={y}
    transform={`rotate(${rotate})`}
    textAnchor="middle"
    stroke={stroke}>{child}</text>);
}

function AxisLabel({ axisType, x, y, width, height, stroke, children }) {
  const isVert = axisType === 'yAxis';
  const cx = isVert ? x - 50 : x + (width / 2);
  const cy = isVert ? (height / 2) + y : y + height;
  const rot = isVert ? `270 ${0} ${cy-30}` : 0;
  const lineHeight = 20;

  if (children.length > 1 && children.map) {
    return (<g>
      {children.map((child, index) =>
        renderText(
          child,
          cx,
          cy + index * lineHeight,
          rot,
          stroke,
          index)
      )}
    </g>);
  }

  return renderText(children, cx, cy, rot, stroke);
}

const CustomizedAxisTick = React.createClass({
    render () {
    const {x, y, stroke, payload} = this.props;
        
    return (
        <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={4} textAnchor="end" fill="#666" fontSize="8px" transform="rotate(-45)">{payload.value}</text>
      </g>
    );
  }
})

const CustomToolTip = React.createClass({

    render() {
        const { active } = this.props;
        var value = null
        if (active) {
            const { payload, label} = this.props;
            var value = ""
            if(payload){
                value = <div className="custom-tooltip" style={{"height" : "40px"}}>
                            <p className="label">{`${label} m/s : ${payload[0].value}%`}</p>
                        </div>
            }
        }
        return value;
    }
})


ReactDOM.render(
  <SimpleLineChart />,
  document.getElementById('container')
);
