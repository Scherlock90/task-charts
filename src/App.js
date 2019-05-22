import React from 'react';
import axios from 'axios';
import { BarChart, LineChart, Line, countrytesianGrid, Tooltip, Legend, XAxis, YAxis, Bar } from 'recharts';
import './Styles/main.css'

let displayName = "CLDR display name";
let conutrCode = "Country Code";
let countryName = "Country Name";
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

// function groupBy(list, keyGetter) {
//   const map = new Map();
//   list.forEach((item) => {
//     const key = keyGetter(item);
//     const collection = map.get(key);
//     if (!collection) {
//       map.set(key, [item]);
//     } else {
//       collection.push(item);
//     }
//   });
//   return map;
// }

function sumProperty(arr, type) {
  return arr.reduce((total, obj) => {
    if (typeof obj[type] === 'string') {
      return total + Number(obj[type]);
    }
    return total + obj[type];
  }, 0);
}
const count = function (ary, classifier) {
  classifier = classifier || String;
  return ary.reduce(function (counter, item) {
      var p = classifier(item);
      counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
      return counter;
  }, {})
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      population: [],
      minor: [],
      counts: [],
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
        console.log(countryWithEuro);
        console.log(countryInTheWorld);
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
    const { population, minor, counts, countryWithEuro, countryInWorld } = this.state;

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
    // const dataList2 = minor
    //   .filter((album, i) => {
    //     return (
    //       <ul key={album.id}>
    //         {album[currencyMinor]}
    //         {album[currencyName]}
    //         {album[continent]}
    //       </ul>
    //     );
    //   })
    //   .map(ee => ee)
      // .filter(function (hero) {
      //   if (hero[currencyName] === hero[currencyName]) {
      //     return hero[currencyName]
      //   }
      // });

    // const dataList3 = minor
    // .filter(function(hero) {
    //   if(hero[currencyName] === "Euro"){
    //     return hero[currencyName]
    //   }
    // });
    // const dataList4 = minor
    //   .filter(function(hero) {
    //     if (hero[continent] === "EU"){
    //     return hero[continent]
    //   }
    // });
    let result = [];
    minor.reduce(function (res, value) {
      if (!res[value[currencyName]]) {
        res[value[currencyName]] = { [currencyName]: value[currencyName], [currencyMinor]: value[currencyMinor] };
        result.push(res[value[currencyName]])
      }
      res[value[currencyName]][currencyMinor] += value[currencyMinor];
      return res;
    }, {});
    console.log(result);
   const countUnitsNameOfCountry = count(minor, function (item) {
      return item[currencyName]
  });
  console.log(countUnitsNameOfCountry);
    // let sumThisSameCurrency = minor.map(function (country) {
    //   return country[currencyName] === "Euro"
    // }).reduce(function (previousValue, currentValue) {
    //   return previousValue + currentValue
    // }, 0);
    // console.log(sumThisSameCurrency);

    // const grouped = groupBy(dataList4, pet => pet[currencyName]);
    // const grouped2 = groupBy(dataList4, pet => pet[continent]);
    // let totalAmount = ( sumProperty(dataList3, currencyMinor) ); 
    // // let totalCountry = (sumProperty(dataList2, currencyName ))
    // let totEuro = dataList3.sum(currencyName).length;
    // const group = dataList2.groupBy(currencyName);
    // console.log(minor);
    // console.log(minor.length);
    // console.log(totEuro.length);
    // console.log("Value euro coin: " + totalAmount );
    // console.log("Country with euro: " + totEuro);
    // console.log("Total number of country in the world: " + minor.length);
    // console.log('Grouped by? ' +group);
    // console.log(grouped.get("Euro"));
    // console.log(grouped2.get("EU"));
    return (
      <div className="containerLoader" style={containerLoader}>
        <div className="countryd z-depth-0 project-summary thumb">
          <div className="countryd-content grey-text text-darken-3 containerPost">
            <div className="chartsContainer">
              <LineCharts data={dataList} />
            </div>
            <div className="chartsContainer">
              <BarCharts data={result} />
            </div>
            <div>Countries with the euro currency: {countryWithEuro} </div>
            <div>The number of countries in the world: {countryInWorld} </div>
          </div>
        </div>
      </div>
    )
  }
}

function LineCharts(props) {
  return (
    <LineChart width={900} height={250} data={props.data}
      margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
      <countrytesianGrid strokeDasharray="3 3" />
      <XAxis tick={<CustomizedAxisTick />} type="category" interval="preserveStartEnd" label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} dataKey="Year" />
      <YAxis interval="preserveStartEnd" type="number" domain={['auto', 'auto']} label={{ value: 'Population', angle: -90, position: 'insideLeft', offset: -20 }} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Value" stroke="#8884d8" />
    </LineChart>
  )
}

function BarCharts(props) {
  return (
    <BarChart width={900} height={250} data={props.data}>
      <countrytesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="ISO4217-currency_name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* <Bar dataKey="ISO4217-currency_name" fill="#8884d8" /> */}
      <Bar dataKey="ISO4217-currency_minor_unit" fill="#82ca9d" />
    </BarChart>
  )
}

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

const containerLoader = {
  display: 'flex',
  justifyContent: 'center',
}