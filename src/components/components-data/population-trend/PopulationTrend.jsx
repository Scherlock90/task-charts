import React from 'react';

import { ViewData } from '../../view-components/index';
import { LinkBackToHome } from '../../common/link-back-to-home/LinkBackToHome'
import { LineCharts } from './custom-bar-charts/CustomBarCharts';
import { Loader } from '../../common/index'

import { Services } from '../../../services/Services'

export class PopulationTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      population: []
    }
  }

  async componentDidMount() {
    const response = await Services.getPopulationTrend()
      .catch(error => {
        if (error) {
          console.log(error);
        }
      });

    if (response) this.setState({ population: response.data });
  }

  render() {
    const { population } = this.state;

    const dataList = population
      .slice(11449, 11506)
      .filter((populationData, idx) => {
        return (
          <ul key={idx}>
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