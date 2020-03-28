import React from 'react';
import * as d3 from "d3";
import { Services } from '../../../services/Services'

import { ViewData } from '../../view-components/index';
import { LinkBackToHome } from '../../common/link-back-to-home/LinkBackToHome'
import { Loader, CustomBarCharts } from '../../common/index'

export class CountCities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    }
  }

  async componentDidMount() {
      const response = await Services.getCountCities()
        .catch(function (error) {
          if (error) {
            console.log(error);
          }
        });

      if(response) this.setState({ cities: response.data });
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