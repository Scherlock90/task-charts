import React from 'react';
import axios from 'axios';
import * as d3 from "d3";

import { ViewData } from '../../view-components/index';
import { LinkBackToHome } from '../../common/link-back-to-home/LinkBackToHome'
import { Loader, CustomBarCharts } from '../../common/index'

export default class CountCities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    }
  }

  componentDidMount() {
    axios
      .get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
      .then(res => {
        this.setState({
          cities: res.data,
        })
      })
  }

  render() {
    const { cities } = this.state;

    let expenseMetrics = d3.nest()
      .key(function (d) { return d.country; })
      .rollup(function (v) {
        return {
          count_cities: v.length,
        };
      })
      .entries(cities);

    return (
      <>
        {
          expenseMetrics.length > 0
            ?
              <ViewData
                backTohome={LinkBackToHome}
                title={"Count Cities"}
                data={
                  <CustomBarCharts
                    data={expenseMetrics}
                    YAxisLabelName={"Number of cities"}
                    XAxisLabelName={"Countries"}
                    payloadValue={"Number of cities in Countries"}
                    dataKey={"value.count_cities"}
                  />
                }
              />
            :
              <Loader />
        }
      </>
    )
  }
}