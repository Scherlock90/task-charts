import React from 'react';
import axios from 'axios';
import { BarChart, LineChart, Line, CartesianGrid, Tooltip, Legend, XAxis, YAxis, Bar } from 'recharts';
import './Styles/main.css'

let tableCash = "CLDR display name";
let conutrCode = "Country Code";
let countryName = "Country Name";
let currencyName = "ISO4217-currency_name";
let currencyMinor = "ISO4217-currency_minor_unit";
let year = "Year";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      population: [],
      minor: []      
    }
  }
  
  counter = (e) => {
    var  count = {};
    this.state.minor.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    console.log(count);
  }
  componentDidMount() {
    axios.get('https://pkgstore.datahub.io/core/population/population_json/data/43d34c2353cbd16a0aa8cadfb193af05/population_json.json')
      .then(res => {
        console.log(res.data.slice(11449, 11505));
        this.setState({
          population: res.data,
        })
      })
      axios.get('https://pkgstore.datahub.io/core/country-codes/country-codes_json/data/471a2e653140ecdd7243cdcacfd66608/country-codes_json.json')
      .then(res => {
        // console.log(res.data.map(eee => eee.Capital));
        console.log(res.data.map(eee => eee[currencyMinor]));
        this.setState({
          minor: res.data,
        })
      })
      // this.counter();
    }
  render() {
    const { population, minor } = this.state;    
    const dataList = population.length ? (population.slice(11449, 11506).filter((album, i) => {
      return (
        <ul>
          {album.Year}
          {album.Value}
        </ul>
      );
    }).map(ee => ee)
    ) : (
        <div className="center">No data yet! </div>
    )
    const dataList2 = minor.length ? (minor.filter((album, i) => {
      return (
        <ul>
          {album.currencyMinor}
          {album.currencyName}
        </ul>
      );
    }).map(ee => ee)
    ) : (
        <div className="center">No data yet! </div>
    )
    return (
      <div className="containerLoader" style={containerLoader}>
        <div className="card z-depth-0 project-summary thumb">
          <div className="card-content grey-text text-darken-3 containerPost">
            <DataThumb data={dataList} />
            {/* {this.counter()} */}
            <BarCharts  data={dataList2} />
          </div>          
        </div>
      </div>
    )
  }
}

function DataThumb(props) {
  return (
    <LineChart width={900} height={250} data={props.data}
      margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} dataKey="Year" />
      <YAxis label={{ value: 'Population', angle: -90, position: 'insideLeft', offset: -20 }} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Value" stroke="#8884d8" />
    </LineChart>
  )
}

function BarCharts(props) {
  return (
    <BarChart width={730} height={250} data={props.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="ISO4217-currency_name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* <Bar dataKey="ISO4217-currency_name" fill="#8884d8" /> */}
      <Bar dataKey="ISO4217-currency_minor_unit" fill="#82ca9d" />
    </BarChart>
  )
}

const containerLoader = {
  display: 'flex',
  justifyContent: 'center',
}
