import React from 'react';
import axios from 'axios';
import { LineChart, Line, Tooltip, Legend, XAxis, YAxis} from 'recharts';
import { Link } from 'react-router-dom';
import BackArrow from '../../assets/back_arrow.jpg';
import ViewData from '../ViewComponents/ViewData';

Array.prototype.sum = function (prop) {
  var total = 0
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i][prop]
  }
  return total
}

const backToHome = (
  <Link
    to='/'
    className="linkTo"
  >
    <img
      src={BackArrow}
      width={50}
    />
    Back
  </Link>
)

export default class PopulationTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      population: []
    }
    this.compareBy.bind(this);
    this.sortBy.bind(this);
  }

  componentDidMount() {
    axios.get('https://pkgstore.datahub.io/core/population/population_json/data/43d34c2353cbd16a0aa8cadfb193af05/population_json.json')
      .then(res => {
        this.setState({
          population: res.data,
        })
      })
  }

  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

  sortBy(key) {
    let arrayCopy = [...this.state.minor];
    arrayCopy
      .sort(this.compareBy(key));
    this.setState({ 
      minor: arrayCopy 
    });
  }

  render() {
    const { population } = this.state;

    const dataList = population
      .slice(11449, 11506)
      .filter((populationData, i) => {
        return (
          <ul key={i}>
            {populationData.Year}
            {populationData.Value}
          </ul>
        );
      })

    const loader = <div style={styleLoader}>Data is loading...</div>;

    return (
      <>
        {
          dataList.length > 0
            ?
              <ViewData
                backTohome={backToHome}
                title={"Population Trend"}
                data={<LineCharts data={dataList} />}
              />
            :
              loader
        }
      </>
    )
  }
}

class CustomTooltip extends React.Component {

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

class CustomizedAxisTick extends React.Component {
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

function LineCharts(props) {
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

const styleLoader = {
  fontSize: '42px',
  padding: '3rem'
}