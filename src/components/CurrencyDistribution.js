import React from 'react';
import axios from 'axios';
import { BarChart, Tooltip, Legend, XAxis, YAxis, Bar, Label } from 'recharts';
import Button from 'react-bootstrap/Button';
import * as d3 from "d3";
import { Link } from 'react-router-dom';
import BackArrow from '../Assets/back_arrow.jpg';

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

export default class CurrencyDistribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    axios.get('https://pkgstore.datahub.io/core/country-codes/country-codes_json/data/471a2e653140ecdd7243cdcacfd66608/country-codes_json.json')
      .then(res => {
        let countryWithEuro = res.data
          .map(function (country) {
            return country[currencyName] === "Euro"
          })
          .reduce(function (previousValue, currentValue) {
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
    arrayCopy
      .sort(this.compareBy(key));
    this.setState({ minor: arrayCopy });
  }
  handleClickInfo = (e) => {
    e.preventDefault();
    this.setState({
      textInfo: textInfo
    })
  }

  render() {
    const { minor, countryWithEuro, countryInWorld } = this.state;

    const dataList = minor.length ? (minor
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

    let expenseMetrics = d3.nest()
      .key(function (d) { return d[currencyName]; })
      .rollup(function (v) {
        return {
          count: v.length,
          [currencyMinor]: d3.sum(v, function (d) { return d[currencyMinor]; })
        };
      })
      .entries(dataList);

    const loader = <div style={styleLoader}>Data is loading...</div>;

    return (
      <div className="containerLoader">
        <div className="countryd z-depth-0 project-summary thumb">
          <div className="countryd-content grey-text text-darken-3 containerPost">
            <div className="title"> Currency distribution</div>
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
            <div className="leftSide">
              <Link to='/' className="linkTo"><img src={BackArrow} width={50} /> Back </Link>
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


function BarCharts(props) {
  return (
    <BarChart 
      width={900} 
      height={400} 
      data={props.data}
    >
      <countrytesianGrid strokeDasharray="3 3" />
      <XAxis 
        tick={<CustomizedAxisTick />} 
        dataKey="key" 
      >
        <Label 
          value="Minor" 
          offset={-5} 
          position="insideBottomRight" 
        />
      </XAxis>
      <YAxis>
        <Label 
          value="Currency distribution" 
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
              value: 'Currency distribution', 
              type: 'square', 
              color: 'rgb(130, 202, 157)' 
              }
          ]
        } 
      />
      <Bar 
        dataKey="value.ISO4217-currency_minor_unit" 
        fill="#82ca9d" 
      />
    </BarChart>
  )
}

function BarCharts2(props) {
  return (
    <BarChart 
      width={900} 
      height={400} 
      data={props.data}
    >
      <countrytesianGrid strokeDasharray="3 3" />
      <XAxis 
        tick={<CustomizedAxisTick />} 
        dataKey="key" 
      >
        <Label 
          value="Minor" 
          offset={-5} 
          position="insideBottomRight" 
        />
      </XAxis>
      <YAxis>
        <Label 
          value="Countries using currency" 
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
              value: 'Number of countries using the currency',
              type: 'square',
              color: 'rgb(130, 202, 157)'
            }
          ]
        }
      />
      <Bar
        dataKey="value.count"
        fill="#82ca9d"
      />
    </BarChart>
  )
}

const styleLoader = {
  fontSize: '42px',
  padding: '3rem'
}