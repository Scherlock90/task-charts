import React from 'react';
import axios from 'axios';
import { BarChart, LineChart, Line, Tooltip, Legend, XAxis, YAxis, Bar, Label } from 'recharts';
import './Styles/main.css';
import * as d3 from "d3";

let currencyName = "ISO4217-currency_name";
let currencyMinor = "ISO4217-currency_minor_unit";
let continent = "Continent";

Array.prototype.sum = function (prop) {
  var total = 0
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i][prop]
  }
  return total
}

class CustomTooltip extends React.Component {

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
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


function LineCharts(props) {
  return (
    <LineChart width={900} height={400} data={props.data}
      margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
      <countrytesianGrid strokeDasharray="3 3" />
      <XAxis tick={<CustomizedAxisTick />} type="category" interval="preserveStartEnd" label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} dataKey="Year" />
      <YAxis interval="preserveStartEnd" type="number" domain={['auto', 'auto']} label={{ value: 'Population', angle: -90, position: 'insideLeft', offset: -40 }} />
      <Tooltip content={<CustomTooltip />} />
      <Legend payload={[{ value: 'Population trend in Poland', type: 'line', color: 'rgb(136, 132, 216)' }]} />
      <Line type="monotone" dataKey="Value" stroke="#8884d8" />
    </LineChart>
  )
}

function BarCharts(props) {
  return (
    <BarChart width={900} height={400} data={props.data}>
      <countrytesianGrid strokeDasharray="3 3" />
      <XAxis tick={<CustomizedAxisTick />} dataKey="key" >
        <Label value="Minor" offset={-5} position="insideBottomRight" />
      </XAxis>
      <YAxis >
        <Label value="Currency distribution" offset={0} angle={-90} position="insideLeft" />
      </YAxis>
      <Tooltip content={<CustomTooltip />} />
      <Legend payload={[{ value: 'Currency distribution', type: 'square', color: 'rgb(130, 202, 157)' }]} />
      <Bar dataKey="value.ISO4217-currency_minor_unit" fill="#82ca9d" />
    </BarChart>
  )
}
const containerLoader = {
  display: 'flex',
  justifyContent: 'center',
}

export default class DataCharst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      population: [],
      minor: [],
      countryInWorld: 0,
      countryWithEuro: 0,
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
    axios.get('https://pkgstore.datahub.io/core/country-codes/country-codes_json/data/471a2e653140ecdd7243cdcacfd66608/country-codes_json.json')
      .then(res => {
        let countryWithEuro = res.data.map(function (country) {
          return country[currencyName] === "Euro"
        }).reduce(function (previousValue, currentValue) {
          return previousValue + currentValue
        });
        let countryInTheWorld = res.data;
        this.setState({
          minor: res.data,
          countryWithEuro: countryWithEuro,
          countryInWorld: countryInTheWorld.length,
        });
        this.sortBy(currencyName);
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
    const { population, minor, countryWithEuro, countryInWorld } = this.state;

    const dataList = population.length ? (population.slice(11449, 11506)
      .filter((populationData, i) => {
        return (
          <ul key={i}>
            {populationData.Year}
            {populationData.Value}
          </ul>
        );
      })
      .map(ee => ee)
    ) : (
        <div className="center">No data yet! </div>
      )
    const dataList2 = minor.length ? (minor
      .filter((album, i) => {
        return (
          <ul key={i}>
            {album[currencyMinor]}
            {album[currencyName]}
            {album[continent]}
          </ul>
        );
      })
      .map(ee => ee)
    )
      : (
        <div className="center">No data yet! </div>
      )
    console.log(dataList2);

    let expenseMetrics = d3.nest()
      .key(function (d) { return d[currencyName]; })
      .rollup(function (v) {
        return {
          count: v.length,
          [currencyMinor]: d3.sum(v, function (d) { return d[currencyMinor]; })
        };
      })
      .entries(dataList2);
    console.log((expenseMetrics));

    return (
      <div className="containerLoader" style={containerLoader}>
        <div className="countryd z-depth-0 project-summary thumb">
          <div className="countryd-content grey-text text-darken-3 containerPost">
            <div className="title"> Task charts with data API</div>
            <div className="chartsContainer">
              <LineCharts data={dataList} />
            </div>
            <div className="chartsContainer">
              <BarCharts data={expenseMetrics} />
            </div>
            <div>Countries with the euro currency: {countryWithEuro} </div>
            <div>The number of countries in the world: {countryInWorld} </div>
          </div>
        </div>
      </div>
    )
  }
}