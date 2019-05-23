import React from 'react';
import axios from 'axios';
import { BarChart, LineChart, Line, Tooltip, Legend, XAxis, YAxis, Bar, Label } from 'recharts';
import Button from 'react-bootstrap/Button';
import * as d3 from "d3";

let countryCode = "Country Code";
let currencyName = "ISO4217-currency_name";
let currencyMinor = "ISO4217-currency_minor_unit";
let continent = "Continent";
let textInfo = 'Because it was not entirely clear what data should apply to the "quantitative distribution of currencies in use in the world" or the number of countries using the currency or currency multiplied by its value -> ISO4217-currency_minor_unit, therefore there are two versions of the data.'

Array.prototype.sum = function (prop) {
  var total = 0
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i][prop]
  }
  return total
}

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
      axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
      .then(res => {
        this.setState({
          cities: res.data,
        })
        console.log(res);
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
    arrayCopy.sort(this.compareBy(key));
    this.setState({ minor: arrayCopy });
  }

  render() {
    const { cities } = this.state;
    
    let expenseMetrics2 = d3.nest()
        .key(function (d) { return d.country; })
        .rollup(function(v) { return {
      count_cities: v.length,
    }; })
      .entries(cities);
    console.log((expenseMetrics2));

    return (
      <div className="containerLoader" style={containerLoader}>
        <div className="countryd z-depth-0 project-summary thumb">
          <div className="countryd-content grey-text text-darken-3 containerPost">
            <div className="chartsContainer">
              <BarCharts3 data={expenseMetrics2} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class CustomTooltip extends React.Component {

  render() {
    const { active, payload, label } = this.props;

    if (active) {  
      if(payload) {   
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}: ${payload[0].value}`}</p>
        </div>
      );}
    }

    return null;
  }
};

class CustomizedAxisTick extends React.Component {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={4} textAnchor="end" fill="#666" fontSize="12px" transform="rotate(-25)">{payload.value}</text>
      </g>
    );
  }
}

function BarCharts3(props) {
  const style={
    padding: '0.2em'
  }
  return (
    <BarChart width={900} height={400} data={props.data}>
      <countrytesianGrid strokeDasharray="3 3" />
      <XAxis tick={<CustomizedAxisTick />} dataKey="key" >
        <Label value="Countries" offset={-5} position="insideBottomRight" />
      </XAxis>
      <YAxis>
          <Label value="Number of cities" offset={0} angle={-90} position="insideLeft" />     
      </YAxis>
      <Tooltip content={<CustomTooltip />} />
      <Legend verticalAlign="top" payload={[{ value: 'Number of cities in Countries', type: 'square', color: 'rgb(130, 202, 157)' }]} />
      <Bar dataKey="value.count_cities" fill="#82ca9d" />
    </BarChart>
  )
}

const containerLoader = {
  display: 'flex',
  justifyContent: 'center',
}