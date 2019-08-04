import React from 'react';
import axios from 'axios';
import { BarChart, Tooltip, Legend, XAxis, YAxis, Bar, Label } from 'recharts';
import * as d3 from "d3";
import { Link } from 'react-router-dom';
import BackArrow from '../Assets/back_arrow.jpg';
import ViewData from './ViewComponents/ViewData';

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

export default class CountCities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    }
    this.compareBy.bind(this);
    this.sortBy.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
      .then(res => {
        this.setState({
          cities: res.data,
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
    this.setState({ minor: arrayCopy });
  }

  render() {
    const { cities } = this.state;

    let expenseMetrics2 = d3.nest()
      .key(function (d) { return d.country; })
      .rollup(function (v) {
        return {
          count_cities: v.length,
        };
      })
      .entries(cities);

    const loader = <div style={styleLoader}>Data is loading...</div>;

    return (
      <>
        {
          expenseMetrics2.length > 0 
            ?
              <ViewData 
                backTohome={backToHome} 
                title={"Count Cities"} 
                data={<BarCharts3 data={expenseMetrics2} /> }
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

class CustomizedAxisTick extends React.Component {
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

function BarCharts3(props) {
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

const styleLoader = {
  fontSize: '42px',
  padding: '3rem'
}