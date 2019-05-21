import React from 'react';
import axios from 'axios';
import { BarChart, LineChart, Line, CartesianGrid, Tooltip, Legend, XAxis, YAxis, Bar } from 'recharts';
import './Styles/main.css'

let displayName = "CLDR display name";
let conutrCode = "Country Code";
let countryName = "Country Name";
let currencyName = "ISO4217-currency_name";
let currencyMinor = "ISO4217-currency_minor_unit";
let year = "Year";

Array.prototype.sum = function (prop) {
  var total = 0
  for ( var i = 0, _len = this.length; i < _len; i++ ) {
      total += this[i][prop]
  }
  return total
}

function sumProperty(arr, type) {
  return arr.reduce((total, obj) => {
    if (typeof obj[type] === 'string') {
      return total + Number(obj[type]);
    }
    return total + obj[type];
  }, 0);
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      population: [],
      minor: [],
      filterMinor: 'Euro',
      counts: [],
      selectedAlbum: null, 
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
        this.setState({
          minor: res.data,
        });
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
      this.setState({minor: arrayCopy});
    }

  render() {
    const { population, minor, counts } = this.state;  
    const { selectedAlbum } = this.state;  
    const dataList = population.length ? (population.slice(11449, 11506).filter((populationData, i) => {
      return (
        <ul key={i}>
          {populationData.Year}
          {populationData.Value}
        </ul>
      );
    }).map(ee => ee)
    ) : (
        <div className="center">No data yet! </div>
    )
    const dataList2 = minor.filter((album, i) => {
      return (
        <ul key={i}>
          {album[currencyMinor]}
          {album[currencyName]}
        </ul>
      );
    }).map(ee => ee).filter(function(hero) {
      return hero[currencyName] === "Euro";
    });
    console.log(dataList2);
    console.log(dataList2.sum(currencyMinor));
    let totalAmount = ( sumProperty(dataList2, currencyMinor) ); 
console.log(  totalAmount  );
    return (
      <div className="containerLoader" style={containerLoader}>
        <div className="card z-depth-0 project-summary thumb">
          <div className="card-content grey-text text-darken-3 containerPost">
            <LineCharts data={dataList} />
            <BarCharts  data={dataList2} />
            <div onClick={() => this.sortBy(currencyMinor)}>Sort</div>
            {/* <button onClick={e => this.sumEuro(e)}> Sum Euro</button> */}
          </div>          
        </div>
      </div>
    )
  }
}

function LineCharts(props) {
  let min = [parseInt(1958)];
  let max = [parseInt(2018)];
  return (
    <LineChart width={900} height={250} data={props.data}
      margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis tick={<CustomizedAxisTick/>}   type="category" interval="preserveStartEnd"   label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} dataKey="Year" />
      <YAxis interval="preserveStartEnd" type="number"  domain={['auto', 'auto']}  label={{ value: 'Population', angle: -90, position: 'insideLeft', offset: -20 }}  />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Value" stroke="#8884d8" />
    </LineChart>
  )
}

function BarCharts(props) {
  return (
    <BarChart width={900} height={250} data={props.data}>
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

class CustomizedAxisTick extends React.Component{
  render () {
  const {x, y, stroke, payload} = this.props;
      
  return (
      <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={4} textAnchor="end" fill="#666" fontSize="12px" transform="rotate(-25)">{payload.value}</text>
    </g>
  );
}
}


const containerLoader = {
  display: 'flex',
  justifyContent: 'center',
}
