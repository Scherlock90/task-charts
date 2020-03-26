import React from 'react';
import axios from 'axios';

import { ViewData } from '../../view-components/index';
import { LinkBackToHome } from '../../common/link-back-to-home/LinkBackToHome'
import { LineCharts } from './custom-bar-charts/CustomBarCharts';
import { Loader } from '../../common/index'

export default class PopulationTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      population: []
    }
  }

  componentDidMount() {
    axios
      .get('https://pkgstore.datahub.io/core/population/population_json/data/43d34c2353cbd16a0aa8cadfb193af05/population_json.json')
      .then(res => {
        this.setState({
          population: res.data,
        })
      })
  }

  render() {
    const { population } = this.state;

    const dataList = population
      .slice(11449, 11506)
      .filter((populationData, i) => {
        return (
          <ul key={i}>
            {populationData.Year}
            {populationData.Value}
          </ul>
        );
      })

    return (
      <>
        {
          dataList.length > 0
            ?
              <ViewData
                backTohome={LinkBackToHome}
                title={"Population Trend"}
                data={<LineCharts data={dataList} />}
              />
            :
              <Loader />
        }
      </>
    )
  }
}