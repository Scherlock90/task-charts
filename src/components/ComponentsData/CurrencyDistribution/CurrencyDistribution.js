import React from 'react';
import axios from 'axios';
import * as d3 from "d3";
import ViewCurrencyDistribution from '../../ViewComponents/ViewCurrencyDistribution';
import { backToHome, loader, currencyMinor, currencyName, continent, textInfo } from '../Elements';
import { BarCharts, BarCharts2} from './CustomCharts';

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
    axios
      .get('https://pkgstore.datahub.io/core/country-codes/country-codes_json/data/471a2e653140ecdd7243cdcacfd66608/country-codes_json.json')
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

    const dataList = minor
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

    let expenseMetrics = d3.nest()
      .key(function (d) { return d[currencyName]; })
      .rollup(function (v) {
        return {
          count: v.length,
          [currencyMinor]: d3.sum(v, function (d) { return d[currencyMinor]; })
        };
      })
      .entries(dataList);

    return (
      <>
        {
          expenseMetrics.length 
            ?
              <ViewCurrencyDistribution 
                title={"Currency distribution"}
                dataOne={<BarCharts data={expenseMetrics} />}
                dataTwo={<BarCharts2 data={expenseMetrics} />}
                countryWithEuro={countryWithEuro}
                countryInTheWorld={countryInWorld}
                handleClickInfo={this.handleClickInfo}
                textInfo={this.state.textInfo}
                backToHome={backToHome}
              />
            :
              loader
        }
      </>
    )
  }
}