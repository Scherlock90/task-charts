import React from 'react';
import axios from 'axios';
import { BarChart, LineChart, Line, Tooltip, Legend, XAxis, YAxis, Bar, Label } from 'recharts';
import Button from 'react-bootstrap/Button';
import './Styles/main.css';
import * as d3 from "d3";

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

export default class DataCharst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      population: [],
      minor: [],
      cities: [],
      countryInWorld: 0,
      countryWithEuro: 0,
      textInfo: ''
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
        console.log(res);
      })
      axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
      .then(res => {
        this.setState({
          cities: res.data,
        })
        console.log(res);
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
  handleClickInfo = (e) => {
    e.preventDefault();
    this.setState({
      textInfo: textInfo
    })
  }

  render() {
    const { population, minor, countryWithEuro, countryInWorld, cities } = this.state;

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
      );

let expenseMetrics2 = d3.nest()
      .key(function (d) { return d.country; })
      .rollup(function(v) { return {
    count_cities: v.length,
  }; })
      .entries(cities);
    console.log((expenseMetrics2));

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
            <div className="chartsContainer">
              <BarCharts2 data={expenseMetrics} />
            </div>
            <div className="containerInfoMain">
              <div className="containerInfo">
                <div>Countries with the euro currency: {countryWithEuro} </div>
                <div>The number of countries in the world: {countryInWorld} </div>
                <Button variant="outline-primary" onClick={this.handleClickInfo}>Info</Button>
                <div> {this.state.textInfo} </div>
              </div>
            </div>
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

function LineCharts(props) {
  return (
    <LineChart width={900} height={400} data={props.data}
      margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
      <countrytesianGrid strokeDasharray="3 3" />
      <XAxis tick={<CustomizedAxisTick />} type="category" interval="preserveStartEnd" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} dataKey="Year" />
      <YAxis interval="preserveStartEnd" type="number" domain={['auto', 'auto']} label={{ value: 'Population', angle: -90, position: 'insideLeft', offset: -40 }} />
      <Tooltip content={<CustomTooltip />} />
      <Legend verticalAlign="top" payload={[{ value: 'Population trend in Poland', type: 'line', color: 'rgb(136, 132, 216)' }]} />
      <Line type="monotone" dataKey="Value" stroke="#8884d8" />
      <Line type="monotone" dataKey="Value" stroke="#82ca9d" />
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
      <YAxis>
        <Label value="Currency distribution" offset={0} angle={-90} position="insideLeft" />
      </YAxis>
      <Tooltip content={<CustomTooltip />} />
      <Legend verticalAlign="top" payload={[{ value: 'Currency distribution', type: 'square', color: 'rgb(130, 202, 157)' }]} />
      <Bar dataKey="value.ISO4217-currency_minor_unit" fill="#82ca9d" />
    </BarChart>
  )
}

function BarCharts2(props) {
  const style={
    padding: '0.2em'
  }
  return (
    <BarChart width={900} height={400} data={props.data}>
      <countrytesianGrid strokeDasharray="3 3" />
      <XAxis tick={<CustomizedAxisTick />} dataKey="key" >
        <Label value="Minor" offset={-5} position="insideBottomRight" />
      </XAxis>
      <YAxis>
          <Label value="Countries using currency" offset={0} angle={-90} position="insideLeft" />     
      </YAxis>
      <Tooltip content={<CustomTooltip />} />
      <Legend verticalAlign="top" payload={[{ value: 'Number of countries using the currency', type: 'square', color: 'rgb(130, 202, 157)' }]} />
      <Bar dataKey="value.count" fill="#82ca9d" />
    </BarChart>
  )
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