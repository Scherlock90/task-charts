import React from 'react';
import axios from 'axios';
import * as d3 from "d3";

import { ViewCurrencyDistribution } from '../../view-components/index';
import { LinkBackToHome } from '../../common/link-back-to-home/LinkBackToHome'
import { Loader, CustomBarCharts } from '../../common/index'
import { currencyMinor, currencyName, continent, textInfo } from '../../../static/Variables';

import { Services } from '../../../services/Services'

export class CurrencyDistribution extends React.Component {
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

  async componentDidMount () {
    const response = await Services.getCurrencyDistribution()
      .catch(function (error) {
        if (error) {
          console.log(error);
        }
      });

    if (response) {
      const { data } = response;

      let countryWithEuro = data
        .map(function (country) {
          return country[currencyName] === "Euro"
        })
        .reduce(function (previousValue, currentValue) {
          return previousValue + currentValue
        });

      let countryInTheWorld = data;

      this.setState({
        minor: data,
        countryWithEuro: countryWithEuro,
        countryInWorld: countryInTheWorld.length,
      });

      this.sortBy(currencyName);
    }
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
                dataOne={
                  <CustomBarCharts
                    data={expenseMetrics}
                    YAxisLabelName={"Currency distribution"}
                    XAxisLabelName={"Minor"}
                    payloadValue={"Currency distribution"}
                    dataKey={"value.ISO4217-currency_minor_unit"}
                  />
                }
                dataTwo={
                  <CustomBarCharts
                    data={expenseMetrics}
                    YAxisLabelName={"Currency distribution"}
                    XAxisLabelName={"Minor"}
                    payloadValue={"Number of countries using the currency"}
                    dataKey={"value.count"}
                  />
                }
                countryWithEuro={countryWithEuro}
                countryInTheWorld={countryInWorld}
                handleClickInfo={this.handleClickInfo}
                textInfo={this.state.textInfo}
                backToHome={LinkBackToHome}
              />
            :
              <Loader />
        }
      </>
    )
  }
}