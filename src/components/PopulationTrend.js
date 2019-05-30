import React from 'react';
import axios from 'axios';
import { BarChart, LineChart, Line, Tooltip, Legend, XAxis, YAxis, Bar, Label } from 'recharts';
import {Link} from 'react-router-dom';
import BackArrow from '../images/back_arrow.jpg';
import * as d3 from "d3";

let countryCode = 'Country Code';

Array.prototype.sum = function (prop) {
  var total = 0
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i][prop]
  }
  return total
}

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
    const { population } = this.state;

    const dataList = population.length ? (population.slice(11449, 11506)
      .filter((populationData, i) => {
        return (
          <ul key={i}>
            {populationData.Year}
            {populationData.Value}
          </ul>
        );
      })
    ) : (
        <div className="center">No data yet! </div>
      )  

    let expenseMetrics4 = d3.nest()
      // .key(function (d) { return d[countryCode]; })
      .rollup(function (v) {
        return {
          line1: v.filter(ee => ee[countryCode] === "POL")   
        ,
        
          line2: v.filter(ee => ee[countryCode] === "USA")
        ,
        
          line3: v.filter(ee => ee[countryCode] === "EUU")
        }
      ;
      })
      .entries(population);
    console.log( expenseMetrics4);

    return (
      <div className="containerLoader" >
        <div className="countryd z-depth-0 project-summary thumb">
          <div className="countryd-content grey-text text-darken-3 containerPost">
            <div className="inlineClass">              
              <div className="title">Population trend</div>
            </div>          
            <div className="chartsContainer">
              <LineCharts data={dataList} />              
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
    </LineChart>
  )
}

const containerLoader = {
  display: 'flex',
  justifyContent: 'center',
}